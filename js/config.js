require.config({
	paths: {
		'ngBootstrap': 		'../common/libs/angular/angular-bootstrap.min',
		'ngResource': 		'../common/libs/angular/angular-resource.min',
		'ngCookies': 		'../common/libs/angular/angular-cookies.min',
		'ngAnimate': 		'../common/libs/angular/angular-animate.min',
		'ngRouter': 		'../common/libs/angular/angular-route.min',
		'angular':			'../common/libs/angular/angular.min',
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