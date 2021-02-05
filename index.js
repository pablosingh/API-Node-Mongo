'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('./models/product');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded( { extended: false} ));
app.use(bodyParser.json());

/*
app.get('/hola/:name', (req,res) => {
	res.send({ message: `Hola ${req.params.name}!` });
} );
*/

app.get( '/api/product', (req,res) => {
	res.status(200).send( {products:[]} );
	//res.send(200, {products:[]});
});

app.get( '/api/product/:productId', (req,res) => {

} );

app.post('/api/product', (req,res) => {
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
		console.log('Exito al salvar');
	} );
} );

app.put( '/api/product/:productId', (req,res) => {

} );

app.delete ( '/api/product/:productId', (req,res) => {

} );

mongoose.connect('mongodb://localhost:27017/shop', (err,res) => {
	if (err) {
		//throw err;
		console.log(`Error al conectar con la base de datos: ${err}`);
	}
	console.log('Conexion establecida con la base de datos...');
	app.listen(port , () => {
	console.log('API Rest corriendo en http:/localhost:'+ port);
});
});

