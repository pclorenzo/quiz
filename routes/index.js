var express = require('express');
var router = express.Router();

//Controllers
var quizController = require('../controllers/quiz_controller');

//Home Page
router.get('/', function(req, res) {
  res.render('index', {title: 'Quiz', errors: []});
});

//Autoload de llamadas con :quizId
router.param('quizId',                      quizController.load);
 
//Rutas de Quizes
router.get('/quizes',                       quizController.index);
router.get('/quizes/:quizId(\\d+)',         quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);
router.get('/quizes/new',                   quizController.new);
router.post('/quizes/create',               quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',    quizController.edit);
router.put('/quizes/:quizId(\\d+)',         quizController.update);

//Ruta de Créditos
router.get('/author',                       quizController.author);

module.exports = router;
