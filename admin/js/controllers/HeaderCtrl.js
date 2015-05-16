define(['app', 'directHeader', 'isActiveLink', 'RCMservice', 'APIservice'], function (app) {
	app.controller('HeaderCtrl', ['$scope', '$rootScope', '$modal', 'rcm', 'api',
        function ($scope, $rootScope, $modal, rcm, api) {

        $scope.langModel = 'en';
        $scope.navMenu = 'partials/nav-menu.html';
        $scope.logoBasket = 'svg/basket.svg';
        $rootScope.siteName = 'Ng-Shop';
        $scope.isCollapsedMenu = (window.outerWidth == 768) ? true : false;

        angular.element(window).bind('resize', function() {
          $scope.isCollapsedMenu = (window.outerWidth == 768) ? true : false;
        });

        $scope.basket = {};

        $scope.addToCart = function(id, price, name) {
            var j = $scope.basket.hasOwnProperty(id) ? $scope.basket[id].quantity : 0;
            $scope.basket[id] = {
                'id' : id,
                'name' : name,
                'price' : price,
                'quantity' : j+1
            }
        };

        $scope.minusQuantity = function(id) {
          if ($scope.basket[id].quantity > 1)
          $scope.basket[id].quantity--;
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

        $scope.numberOfproducts = function() {
          var total = 0;
         angular.forEach($scope.basket, function(item) {
            total += item.quantity;
         });
         return total;
        };

        $scope.removeProduct = function(id) {
          delete $scope.basket[id];
        };

        api.getJSONresponse('menu').then(function (response) {
            $scope.menu = rcm.reConstructor(response);
        });

        $scope.openModal = function(size) {
          $modal.open({
            size: size,
            templateUrl: 'partials/product-basket.html',
            controller: function($scope) {
              $scope.closeModal = function(){
                $scope.$close();
              }
            }
          });
        };

  }]);

});