// Ignorar estos comentarios.
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />

var models = require('../models/models.js');

//GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index', {quizes: quizes});	
	});
};

//GET /quizes/:id
exports.show = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render("quizes/show", {quiz: quiz});	
	});
};

//GET /quizes/:id/answer
exports.answer = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz){
		var respuesta = (quiz.respuesta || '');
		if (req.query.respuesta.toUpperCase() === respuesta.toUpperCase()) {
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