require(['config'], function() {
	require([
		'angular',
		'./app',
		'./common/controllers/AuthenticationCtrl',
		'./user/controllers/HeaderCtrl',
		'./user/controllers/FooterCtrl',
		'./user/controllers/ProductDetailCtrl',
		'./user/controllers/ProductsCategoryCtrl',
		'./user/controllers/ProductsCtrl'
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



/*

			.when('/login', {
			    templateUrl: 'views/login.html',
			    controller: 'LoginCtrl'
			})
			.when('/dashboard', {
			    templateUrl: 'views/dashboard.html',
			    controller: 'DashboardCtrl',
			    resolve: {
			      user: function(SessionService) {
			        return SessionService.getCurrentUser();
			      }
			    }
			})

app.factory("SessionService", function($q){
    return {
        getCurrentUser: function(){
            return $q.when("Hello World!");
        }
    };
});

app.controller("DashboardCtrl", function (user) {
    $scope.user = user;
});

odetocode.com/blogs/scott/archive/2014/05/20/using-resolve-in-angularjs-routes.aspx

*/


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