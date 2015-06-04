/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />

//GET quizes/question
exports.question = function(req, res) {
	res.render("quizes/question", {pregunta: "¿Cual es la capital de Italia?"});
};

//GET quizes/answer
exports.answer = function(req, res) {
	var respuesta = (req.query.respuesta || ""); 
	if (respuesta.toUpperCase() === "ROMA") {
		res.render("quizes/answer", {respuesta: "Correcto"});
	} else {
		res.render("quizes/answer", {respuesta: "Incorrecto"});
	}
};