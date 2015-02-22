require.config({
	paths: {
		'ngBootstrap': 		'libs/angular/angular-bootstrap.min',
		'ngResource': 		'libs/angular/angular-resource.min',
		'ngCookies': 		'libs/angular/angular-cookies.min',
		'ngAnimate': 		'libs/angular/angular-animate.min',
		'ngLoader': 		'libs/angular/angular-loader.min',
		'ngRouter': 		'libs/angular/angular-route.min',
		'ngTouch':			'libs/angular/angular-touch.min',
		'ngIdle':			'libs/angular/angular-idle.min',
		'underscore':		'libs/underscore-1.7.0.min',
		'jQueryUI':			'libs/jquery-ui-1.10.3.min',
		'angular':			'libs/angular/angular.min',
		'bootstrap':		'libs/bootstrap-3.1.1.min',
		'jQuery':			'libs/jquery-2.1.0.min',
		'bindOnce': 		'libs/bindonce.min',
		'easing':			'libs/easing-1.3',
		//-------------------- services -----------------------//
		'RCMservice' : 		'services/RCMservice',
		'APIservice' : 		'services/APIservice',
		//------------------- directives ---------------------//
		'directFooter' : 	'directives/footer',
		'directHeader' : 	'directives/header',
		'isActiveLink' : 	'directives/isActiveLink'
	},
	shim: {
		'angular': {
			exports: 'angular'
		},
		'ngRouter': {
			deps: ['angular']
		},
		'ngBootstrap': {
			deps: ['angular']
		},
		'ngCookies': {
			deps: ['angular']
		},
		'ngAnimate': {
			deps: ['angular']
		},
		'ngTouch': {
			deps: ['angular']
		},
		'ngLoader': {
			deps: ['angular']
		},
		'ngIdle': {
			deps: ['angular']
		},
		'jQueryUI': {
			deps: ['jQuery']
		},
		'easing': {
			deps: ['jQuery']
		},
		'ngResource': {
			deps: ['angular']
		},
		'bindOnce': {
			deps: ['angular']
		},
		'bootstrap': {
			deps: ['jQuery']
		},
		'underscore': {
	  		exports: '_'
		}
	}
});