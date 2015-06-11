// Ignorar estos comentarios.
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/sqlite3/sqlite3.d.ts" />
/// <reference path="../typings/sequelize/sequelize.d.ts" />

var path = require('path');

//Postgres 	DATABASE_URL = postgres://user:passwd@host:port/database
//SQLite	DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user 	 = (url[2]||null);
var pwd 	 = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port 	 = (url[5]||null);
var host 	 = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar bbdd SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
	{
		dialect: protocol, 
		protocol: protocol, 
		port: port,
		host: host,
		storage: storage,	//solo SQLite (.env)
		omitNull: true 		//solo Postgress
	}
);

//Importar la definición de la tabla Quiz desde quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz; //Exportar la definición de la tabla Quiz

sequelize.sync().then(function(){
	Quiz.count().then(function(count){
		if(count === 0){
			Quiz.create({pregunta:'Capital de Italia', respuesta:'Roma', tema:'ocio'});
			Quiz.create({pregunta:'Modelo del primer chip de Intel', respuesta:'4004', tema:'tecnologia'});
			Quiz.create({pregunta:'Ciudad mas poblada de Uruguay', respuesta:'Montevideo', tema:'ocio'});
			Quiz.create({pregunta:'Taipei es la capital de ...', respuesta:'Taiwan', tema:'ocio'});
			Quiz.create({pregunta:'Número atómico del Hidrógeno', respuesta:'1', tema:'ciencia'});
			Quiz.create({pregunta:'Peor que programar en COBOL es programar en ...', respuesta:'Genexus', tema:'tecnologia'});
			Quiz.create({pregunta:'Nombre de pila del creador del lenguaje C', respuesta:'Dennis', tema:'tecnologia'});
			Quiz.create({pregunta:'Nombre de pila del creador del lenguaje C++', respuesta:'Bjarne', tema:'tecnologia'});
			Quiz.create({pregunta:'La primer "Vuelta Olímpica" fue realizada por ...', respuesta:'Uruguay', tema:'ocio'});
			Quiz.create({pregunta:'Club de futbol mas glorioso de Uruguay', respuesta:'Club Atlético Peñarol', tema:'ocio'});
			Quiz.create({pregunta:'Qué está primero, el huevo o la gallina', respuesta:'STACK OVERFLOW', tema:'ocio'});
			Quiz.create({pregunta:'Capital de Mongolia', respuesta:'Ulán Bator', tema:'ocio'}).then(function(){
				console.log('Base de datos inicializada');
			});
		}
	});
});