require.config({
	paths: {
		'ngBootstrap': 		'/common/libs/angular/angular-bootstrap.min',
		'ngResource': 		'/common/libs/angular/angular-resource.min',
		'ngCookies': 		'/common/libs/angular/angular-cookies.min',
		'ngAnimate': 		'/common/libs/angular/angular-animate.min',
		'ngRouter': 		'/common/libs/angular/angular-route.min',
		'angular':			'/common/libs/angular/angular.min',
		//-------------------- services -----------------------//
		'RCMservice' : 		'./user/services/RCMservice',
		'APIservice' : 		'./user/services/APIservice',
		//------------------- directives ---------------------//
		'directFooter' : 	'./user/directives/footer',
		'directHeader' : 	'./user/directives/header',
		'directHtml' : 		'./common/directives/nghtml',
		'isActiveLink' : 	'./user/directives/isActiveLink'
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