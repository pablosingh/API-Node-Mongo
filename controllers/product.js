'use strict'

const Product = require('../models/product');

function getProduct (req,res) {
	let productId = req.params.productId;
	
	Product.findById(productId, (err, product) => {
		if (err) return res.status(500).send({message: `Error en la peticion: ${err}`});
		if (!product) return res.status(404).send({message: 'El producto no existe'});

		res.status(200).send({ product: product });
	});
	//console.log(productId);
}

function getProducts (req,res) {
	Product.find( {}, (err,products) => {
		if (err) return res.status(500).send({message: `Error en la peticion: ${err}`});
		if (!products) return res.status(404).send({message: 'No hay productos'});

		res.status(200).send( {products: products} );
	});
}

function saveProduct (req,res) {
	//console.log(req.body);
	/*
	console.log(req.query);
	res.status(200).send({message: 'El producto se ha recibido'});
	*/

	console.log('POST /api/product');
	console.log(req.query);
	
	let product = new Product();
	product.name = req.query.name;
	product.picture = req.query.picture;
	product.price = req.query.price;
	product.category = req.query.category;
	product.description = req.query.description;


	product.save( (err,productStored) => {
		if (err){
			console.log('Error al salvar');
			res.status(500).send({message: `Error al salvar en la base de datos: ${err}`});
		}
		res.status(200).send({product: productStored});
		console.log(product);
		console.log('Exito al salvar');

	} );
}

function updateProduct (req,res) {
	let productId = req.params.productId;
	let update = req.query;

	Product.findByIdAndUpdate( productId, update, (err,productUpdated) => {
		if (err) res.status(500).send({message: `Error al Actualizar: ${err}`});

		/*
		res.status(200).send({product: productUpdated});
		El de arriba da el objeto anterior por eso se actualiza mas abajo......
		//*/
		/*
		//Verificando los datos al enviar (abajo)
		console.log('Update -');
		console.log(update);
		console.log('---------');
		console.log('Producto Actualizado');
		console.log(productUpdated);
		console.log('---------');
		console.log('body - ');
		console.log(req.body);
		console.log('---------');
		console.log(req.query);
		//*/
		//console.log(productUpdated);
	} );
	Product.findById(productId, (err, product) => {
		if (err) res.status(500).send({message: `Error: ${err}`});
		res.status(200).send({product: product});
	});
}

function deleteProduct (req,res) {
	let productId = req.params.productId;
	
	Product.findById(productId, (err, product) => {
		if (err) res.status(500).send({message: `Error al borrar: ${err}`});

		product.remove(err => {
			if (err) res.status(500).send({message: `Error al borrar: ${err}`});
			res.status(200).send({message: 'Producto Eliminado'});
		});
	});
}

module.exports = {
	getProduct,
	getProducts,
	saveProduct,
	updateProduct,
	deleteProduct
}