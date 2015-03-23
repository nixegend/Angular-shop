define(['app', 'directHeader', 'isActiveLink', 'bootstrap', 'RCMservice', 'APIservice'],
    function (app, RCMservice, APIservice) {
	app.controller('HeaderCtrl', ['$scope', '$rootScope', 'RCMservice', 'APIservice',
        function ($scope, $rootScope, RCMservice, APIservice) {

        $scope.langModel = 'en';
        $scope.navMenu = 'partials/nav-menu.html';
        $scope.logoBasket = 'svg/basket.svg';
        $rootScope.siteName = 'Ng-Shop';
        $scope.basket = [];

        $scope.addToCart = function(id, price, name) {

            var templatePorduct = {
                'id' : id,
                'name' : name,
                'price' : price,
                'quantity' : 1
            };

            $scope.basket.push(templatePorduct);
        };

        $scope.minusQuantity = function(index) {
            if ($scope.basket[index].quantity > 0) {
              $scope.basket[index].quantity--;
            }
        };

        $scope.plusQuantity = function(index) {
          $scope.basket[index].quantity++;
        };

        $scope.totalQuantity = function() {
          var total = 0;
         angular.forEach($scope.basket, function(item) {
            total += item.quantity * item.price;
         });
         return total;
        };


        APIservice.getJSONresponse('menu').then(function (response) {
            $scope.menu = RCMservice.reConstructor(response);
        });

	}]);
});