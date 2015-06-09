// Ignorar estos comentarios.
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />

var models = require('../models/models.js');

//Autoload - filtra cualquier ruta que incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz) {
			if(quiz) {
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe quizId=' + quizId));
			}
		}
	).catch(function(error){ next(error); });	
};

//GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index', {quizes: quizes});	
	});
};

//GET /quizes/:id
exports.show = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render("quizes/show", {quiz: req.quiz});	
	});
};

//GET /quizes/:id/answer
exports.answer = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz){
		var respuesta = (req.quiz.respuesta || '');
		
		var resultado = 'Incorrecto';
		if (req.query.respuesta.toUpperCase() === respuesta.toUpperCase()) {
			resultado = "Correcto";
		}
		res.render("quizes/answer", {quiz: req.quiz, respuesta: resultado});
	}); 
}; 

//GET /author
exports.author = function(req, res) {
	res.render("author");
};