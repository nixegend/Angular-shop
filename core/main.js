require(['config'], function() {
	require([
		'angular',
		'./app',
		'./common/controllers/AuthenticationCtrl',
		'./user/controllers/HeaderCtrl',
		'./user/controllers/FooterCtrl',
		'./user/controllers/ProductDetailCtrl',
		'./user/controllers/ProductsCategoryCtrl',
		'./user/controllers/ProductsCtrl',
		'./admin/controllers/DashboardCtrl'
	], function(angular, app) {
		app.config(['$routeProvider', function($routeProvider) {
			$routeProvider
			.when('/', {
				templateUrl: '/user/partials/home-page.html'
			})
			.when('/contacts', {
				templateUrl: '/user/partials/contacts.html'
			})
			.when('/products', {
				templateUrl: '/user/partials/products.html',
				controller: 'ProductsCtrl'
			})
			.when('/admin', {
				templateUrl: '/admin/partials/dashboard.html',
				controller: 'DashboardCtrl'
			})
			.when('/products/:category', {
				templateUrl: '/user/partials/products-category.html',
				controller: 'ProductsCategoryCtrl'
			})
			.when('/products/:category/:productId', {
				templateUrl: '/user/partials/product-detail.html',
				controller: 'ProductDetailCtrl'
			})
			.when('/404', {
				templateUrl: '/user/partials/error-page.html'
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