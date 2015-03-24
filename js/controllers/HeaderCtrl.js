define(['app', 'directHeader', 'isActiveLink', 'bootstrap', 'RCMservice', 'APIservice'],
    function (app, RCMservice, APIservice) {
	app.controller('HeaderCtrl', ['$scope', '$rootScope', 'RCMservice', 'APIservice',
        function ($scope, $rootScope, RCMservice, APIservice) {

        $scope.langModel = 'en';
        $scope.navMenu = 'partials/nav-menu.html';
        $scope.logoBasket = 'svg/basket.svg';
        $rootScope.siteName = 'Ng-Shop';
        $scope.basket = {};

        $scope.addToCart = function(id, price, name) {
            var j = ($scope.basket.hasOwnProperty(id)) ? $scope.basket[id].quantity : 0;
            $scope.basket[id] = {
                'id' : id,
                'name' : name,
                'price' : price,
                'quantity' : j+1
            }
        };

        $scope.minusQuantity = function(id) {
            if ($scope.basket[id].quantity > 0) {
              $scope.basket[id].quantity--;
            }
        };

        $scope.plusQuantity = function(id) {
          $scope.basket[id].quantity++;
        };

        $scope.totalQuantity = function() {
          var total = 0;
         angular.forEach($scope.basket, function(item) {
            total += item.quantity * item.price;
         });
         return total;
        };

        $scope.removeProduct = function(id) {
          delete $scope.basket[id];
        };

        APIservice.getJSONresponse('menu').then(function (response) {
            $scope.menu = RCMservice.reConstructor(response);
        });

	}]);
});