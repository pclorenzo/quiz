// Ignorar estos comentarios.
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />

var models = require('../models/models.js');

//GET quizes/question
exports.question = function(req, res) {
	models.Quiz.findAll().then(function(quiz){
		res.render("quizes/question", {pregunta: quiz[0].pregunta});	
	});
};

//GET quizes/answer
exports.answer = function(req, res) {
	models.Quiz.findAll().then(function(quiz){
		var respuesta = (quiz[0].respuesta || '');
		if (respuesta.toUpperCase() === "ROMA") {
			res.render("quizes/answer", {respuesta: "Correcto"});
		} else {
			res.render("quizes/answer", {respuesta: "Incorrecto"});
		}
	}); 
};

//GET /author
exports.author = function(req, res) {
	res.render("author");
};