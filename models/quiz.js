// Ignorar estos comentarios.
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/sqlite3/sqlite3.d.ts" />
/// <reference path="../typings/sequelize/sequelize.d.ts" />

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz', 
		{
			pregunta: { 
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "-> Falta Pregunta"}}
			}, 
			respuesta: {
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "-> Falta Respuesta"}}
			}
		});
};