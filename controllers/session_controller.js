//MW de autorizacion de accesos
exports.loginRequired = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
};

//GET /login	(form de login)
exports.new = function(req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};
	res.render('sessions/new',{errors: errors});
};

//POST /login  (crear la session)
exports.create = function(req, res) {
	var login = req.body.login;
	var password = req.body.password;
	
	var userController = require('./user_controller');
	userController.autenticar(login, password, 
		function(error, user) {
			if (error) {
				req.session.errors = [{'message': error.toString()}];
				res.redirect('/login');
				return;
			}
			
			//La sesion se define por la existencia de req.session.user
			req.session.user = {id:user, username:user.username};
			res.redirect(req.session.redir.toString());
		}
	);
};

//DELETE /logout	(destruir session)
exports.destroy = function(req, res) {
	delete req.session.user;
	res.redirect(req.session.redir.toString());
};

//La  artmética de tiempo se realiza en Milisegundos (2mins = 120.000ms)
var MS_PER_MINUTE = 60000;
var TWO_MINUTES = 2 * MS_PER_MINUTE;

exports.autoLogout = function (req, res, next) {
	//Si la URL no es login o logout y además existe una session
    if (!req.path.match(/\/login|\/logout/) && req.session.user) {
       
        //Control de expriacion de session (2 minutos) para cualquier URL que no tenga /login o /logout
		var now = new Date();    
		req.session.timestamp = req.session.timestamp || now.getTime();
        
		console.log('\n\n');
        console.log(req.session.timestamp);
		console.log(now.getTime());
        console.log('\n\n');
		
        if ((now.getTime() - req.session.timestamp) >= TWO_MINUTES) {
            //Expiró el tiempo           
			delete req.session.timestamp;
			delete req.session.user;
			req.session.errors = [{'message': 'Expiró el tiempo de la sesión'}];
			res.redirect('/login');
        }
    }
	
	next();
};