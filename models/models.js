// Ignorar estos comentarios.
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/sqlite3/sqlite3.d.ts" />
/// <reference path="../typings/sequelize/sequelize.d.ts" />

var path = require('path');

//Cargar Modelo y usar SQLite
var Sequelize = require('sequelize');
var sequelize = new Sequelize(null, null, null,{dialect:"sqlite",storage:"quiz.sqlite" });

//Importar la definición de la tabla Quiz desde quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//Exportar la definición de la tabla Quiz
exports.Quiz = Quiz;

sequelize.sync().then(function(){
	Quiz.count().then(function(count){
		if(count === 0){
			Quiz.create({pregunta:'Capital de Italia', respuesta:'Roma'}).then(function(){
				console.log('Base de datos inicializada');
			});
		}
	});
});