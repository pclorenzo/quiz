// Ignorar estos comentarios.
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/sqlite3/sqlite3.d.ts" />
/// <reference path="../typings/sequelize/sequelize.d.ts" />

//Se incluye el modelo
var models = require('../models/models.js');

//GET /quizes/statistics
exports.statistics = function (req, res) {
	//Objeto respuesta
	var stats = {};
	
	//Count de Quizes	
	models.Quiz.count().then(
		function(count) {
			stats.preguntas = count;
			
			//Count de Comentarios
			models.Comment.count().then(
				function(count) {
					stats.comentarios = count;
					
					//Preguntas CON comentario
					models.Quiz.findAll({include:[{model: models.Comment, required: true}]}).then(
						function(result) {
							var count = result.length;
							stats.conComentarios = count;
							
							//Preguntas SIN comentario (todas - con comentario)
							stats.sinComentarios = stats.preguntas - count;
						
							//Ahora que el objeto statics esta completo renderizamos la página
							res.render('statistics/show', {stats: stats, errors: []});
						}
					);
				}
			);
		}
	);	
};