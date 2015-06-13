var express = require('express');
var router = express.Router();

//Controllers
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

//Home Page
router.get('/', function(req, res) {
  res.render('index', {title: 'Quiz', errors: []});
});

//Autoload de llamadas con :quizId
router.param('quizId',                            quizController.load);
 
//Rutas de Session
router.get('/login',                              sessionController.new);
router.post('/login',                             sessionController.create);
router.get('/logout',                             sessionController.destroy);

//Rutas de Quizes
router.get('/quizes',                             quizController.index);
router.get('/quizes/:quizId(\\d+)',               quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',        quizController.answer);
router.get('/quizes/new',                         quizController.new);
router.post('/quizes/create',                     quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',          quizController.edit);
router.put('/quizes/:quizId(\\d+)',               quizController.update);
router.delete('/quizes/:quizId(\\d+)',            quizController.destroy);

//Rutas de Comments
router.get('/quizes/:quizId(\\d+)/comments/new',  commentController.newcomment);
router.post('/quizes/:quizId(\\d+)/comments',     commentController.create);

//Ruta de Créditos
router.get('/author',                             quizController.author);

module.exports = router;
