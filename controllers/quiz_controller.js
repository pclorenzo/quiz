// Ignorar estos comentarios.
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />

var models = require('../models/models.js');

//Autoload - filtra cualquier ruta que incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz
		.find({
			where: {id: Number(quizId)},
			include: [{model:models.Comment}]
		})
		.then(
		function(quiz) {
			if(quiz) {
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe quizId=' + quizId));
			}
		})
		.catch(
		function(error){ 
			next(error); 
		}
	);	
};

//GET /quizes
exports.index = function(req, res) {
	//¿El filtro de preguntas viene vacio?
	if(req.query.search === undefined) {
		
		//Está vacio => Se recuperan TODAS las preguntas ordenadas en forma ascendente
		models.Quiz.findAll({order: 'pregunta ASC'}).then(
			function(quizes) {
				res.render('quizes/index', {quizes: quizes, errors: []});
			}
		);
	} else {
		//No está vacio => Se recupera y procesa dicho filtro de búsqueda
		var search = req.query.search;
		
		//Se convierte la cadena a %text%text%.....
		var condition = ('%' + search + '%').replace(/ /g,'%');  //remplazo TODO(/g) blankspace por '%'
		
		//Se realiza la query pasando la condition y ordenando en forma ascendente.	
		models.Quiz.findAll({where: ["pregunta like ?", condition], order: 'pregunta ASC'}).then(
			function(quizes) {
				res.render('quizes/index', {quizes: quizes, errors: []});
			}
		);	 
	}
};

//GET /quizes/:id
exports.show = function(req, res) {
	models.Quiz.findById(req.params.quizId).then(
		function(quiz){
			res.render("quizes/show", {quiz: req.quiz, errors: []});	
		}
	);
};

//GET /quizes/:id/answer
exports.answer = function(req, res) {
	models.Quiz.findById(req.params.quizId).then(
		function(quiz){
			var respuesta = (req.quiz.respuesta || '');
			
			var resultado = 'Incorrecto';
			if (req.query.respuesta.toUpperCase() === respuesta.toUpperCase()) {
				resultado = "Correcto";
			}
			res.render("quizes/answer", {quiz: req.quiz, respuesta: resultado, errors: []});
		}
	); 
}; 

//GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build({pregunta:"", respuesta:"", tema:"otro"});
	res.render('quizes/new', {quiz: quiz, errors: []});
};

//POST /quizes/create
exports.create = function(req, res) {	
	var quiz = models.Quiz.build(req.body.quiz);
	
	quiz.validate().then(
		function(err){
			if (err) {
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
			} else {
				quiz.save({fields: ["pregunta","respuesta","tema"]}).then(
					function() {
						res.redirect('/quizes');
					}
				);
			}
		}
	);
};

//GET /quizes/:id/edit
exports.edit = function(req, res) {
	//Autoload ya cargo en req la instancia de quiz identificada por :id
	var quiz = req.quiz;
	res.render('quizes/edit', {quiz: quiz, errors:[]});
};

//PUT /quizes/:id
exports.update = function(req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;
	
	req.quiz.validate().then(
		function(err) {
			if (err) {
				res.render('quizes/new', {quiz: req.quiz, errors: err.errors});
			} else {
				req.quiz.save({fields: ["pregunta","respuesta","tema"]}).then(
					function() {
						res.redirect('/quizes');
					}
				);
			}
		}
	);
};

//DELETE /quizes/:id
exports.destroy = function(req, res, next) {
	req.quiz.destroy().then(
		function() {
			res.redirect('/quizes');
		}
	).catch(
		function(error){ 
			next(error);
		}
	);
};

//GET /author
exports.author = function(req, res) {
	res.render("author", {errors: []});
};