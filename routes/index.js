var express = require('express');
var router = express.Router();

//Controllers
var quizController = require('../controllers/quiz_controller');

// Rura HomePage
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Rutas de Quizes
router.get('/quizes',                       quizController.index);
router.get('/quizes/:quizId(\\d+)',         quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);

// Ruta de Créditos
router.get('/author',                       quizController.author);

module.exports = router;
