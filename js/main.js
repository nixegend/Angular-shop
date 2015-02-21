require(['config'], function() {
	require([
		'angular',
		'./app',
		'./controllers/HeaderCtrl',
		'./controllers/FooterCtrl',
		'./controllers/ProductDetailCtrl',
		'./controllers/ProductsCtrl'
	], function(angular, app) {
		app.config(['$routeProvider', function($routeProvider) {
			$routeProvider
			.when('/', {
				templateUrl: 'partials/home-page.html'
			})
			.when('/about', {
				templateUrl: 'partials/about.html'
			})
			.when('/contacts', {
				templateUrl: 'partials/contacts.html'
			})
			.when('/products', {
				templateUrl: 'partials/products.html',
				controller: 'ProductsCtrl'
			})
			.when('/products/:category/:productId', {
				templateUrl: 'partials/product-detail.html',
				controller: 'ProductDetailCtrl'
			})
			.when('/404', {
				templateUrl: 'partials/error-page.html'
			})
			.otherwise({
				redirectTo: '/404'
			});
		}]);
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['appNgShop']);
		});
	});
});