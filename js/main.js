require(['config'], function() {
	require([
		'angular',
		'./app',
		'./controllers/HeaderCtrl',
		'./controllers/FooterCtrl',
		'./controllers/ProductDetailCtrl',
		'./controllers/ProductsCategoryCtrl',
		'./controllers/ProductsCtrl'
	], function(angular, app) {
		app.config(['$routeProvider', function($routeProvider) {
			$routeProvider
			.when('/', {
				templateUrl: 'partials/home-page.html'
			})
			.when('/contacts', {
				templateUrl: 'partials/contacts.html'
			})
			.when('/products', {
				templateUrl: 'partials/products.html',
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
				templateUrl: 'partials/products-category.html',
				controller: 'ProductsCategoryCtrl'
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