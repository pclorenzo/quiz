// Ignorar estos comentarios.
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/sqlite3/sqlite3.d.ts" />
/// <reference path="../typings/sequelize/sequelize.d.ts" />

module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
		'Comment', 
		{
			texto: { 
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "-> Falta Comentario"}}
			},
			publicado: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			}
		}
	);
};