require.config({
	paths: {
		'ngBootstrap': 		'libs/angular/angular-bootstrap.min',
		'ngResource': 		'libs/angular/angular-resource.min',
		'ngCookies': 		'libs/angular/angular-cookies.min',
		'ngAnimate': 		'libs/angular/angular-animate.min',
		'ngRouter': 		'libs/angular/angular-route.min',
		'angular':			'libs/angular/angular.min',
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
		'ngResource': {
			deps: ['angular']
		}
	}
});