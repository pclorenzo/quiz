var express = require('express');
var router = express.Router();

//Controllers
var quizController = require('../controllers/quiz_controller');

//Home Page
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//Autoload de llamadas con :quizId
router.param('quizId',                      quizController.load);
 
//Rutas de Quizes
router.get('/quizes',                       quizController.index);
router.get('/quizes/:quizId(\\d+)',         quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);
router.get('/quizes/new',                   quizController.new);
router.post('/quizes/create',               quizController.create);

//Ruta de Créditos
router.get('/author',                       quizController.author);

module.exports = router;
