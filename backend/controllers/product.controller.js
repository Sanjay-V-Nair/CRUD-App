import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {

    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const postProducts = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = await Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in create product", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const putProducts = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).json({ success: false, message: 'Invalid Product ID' });
    // }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const deleteProducts = async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(404).json({ success: false, message: 'Product not found' });
    }
}