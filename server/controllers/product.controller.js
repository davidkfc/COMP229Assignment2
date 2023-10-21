	import Product from '../models/product.model.js'
	import extend from 'lodash/extend.js'
	import errorHandler from './error.controller.js'

	const create = async (req, res) => { 
		const product = new Product(req.body) 
		try {
		await product.save()
		return res.status(200).json({ 
		message: "Successfully signed up!"
		})
		} catch (err) {
		return res.status(400).json({
		error: errorHandler.getErrorMessage(err) 
		})
		} 
		}

	const list = async (req, res) => { 
	try {
	let products = await Product.find().select('name description price published category 	updated created') 
	res.json(products)
	} catch (err) {
	return res.status(400).json({
	error: errorHandler.getErrorMessage(err) 
	})
	} 
	}

	const productByID = async (req, res, next, id) => { 
		try {
		let product = await Product.findById(id) 
		if (!product)
		return res.status(400).json({ 
		error: "Product not found"
		})
		req.profile = product 
		next()
		} catch (err) {
		return res.status(400).json({ 
		error: "Could not retrieve product"
		}) 
		}
		}

	const read = (req, res) => {
	req.profile.hashed_password = undefined 
	req.profile.salt = undefined
	return res.json(req.profile) 
	}

	const update = async (req, res) => { 
		try {
		let product = req.profile
		product = extend(product, req.body) 
		product.updated = Date.now() 
		await product.save()
		product.hashed_password = undefined 
		product.salt = undefined
		res.json(product) 
		} catch (err) {
		return res.status(400).json({
		error: errorHandler.getErrorMessage(err) 
		})
		} 
		}

	const remove = async (req, res) => { 
		try {
		let product = req.profile
		let deletedProduct = await product.deleteOne() 
		deletedProduct.hashed_password = undefined 
		deletedProduct.salt = undefined
		res.json(deletedProduct) 
		} catch (err) {
		return res.status(400).json({
		error: errorHandler.getErrorMessage(err) 
		})
		} 
		}

		// const removeAll = async (req, res) => { 
		// 	try {
		// 	let product = req.profile
		// 	let deletedProduct = await product.removeAll() 
		// 		deletedProduct.hashed_password = undefined 
		// 		deletedProduct.salt = undefined
		// 		res.json(deletedProduct) 
		// 	} catch (err) {
		// 	return res.status(400).json({
		// 	error: errorHandler.getErrorMessage(err) 
		// 	})
		// 	} 
		// 	}

		const removeAll = async (req, res) => {
			try {
				// Use Mongoose to delete all product records
				await Product.deleteMany({});
		
				return res.status(200).json({ message: 'All products removed successfully' });
			} catch (error) {
				return res.status(500).json({ error: 'Internal server error' });
			}
		}
		
		
	export default { create, productByID, read, list, remove, removeAll, update }
