define(['app', 'directHeader', 'isActiveLink', 'RCMservice', 'APIservice'], function (app) {
	app.controller('HeaderCtrl', ['$scope', '$location', '$window', '$rootScope', '$modal', 'rcm', 'api',
        function ($scope, $location, $window, $rootScope, $modal, rcm, api) {

        $scope.langModel = 'en';
        $scope.navMenu = '/user/partials/nav-menu.html';
        $scope.logoBasket = '/common/svg/basket.svg';
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

        $scope.userInfo = function() {
          var authorizedUser = $window.sessionStorage.authorizedUser,
              userObj = {};

          if (authorizedUser == undefined) {
            userObj.name = '';
            userObj.email = '';
            userObj.state = false;
          } else {
            userObj.name = authorizedUser.split('/')[1];
            userObj.email = authorizedUser.split('/')[0];
            userObj.state = true;
          }

          return userObj;
        };

        $scope.logOut = function() {
          delete $window.sessionStorage['authorizedUser'];
          $location.path('/');
        };

        $scope.openProductsBasketModal = function(size) {
          $modal.open({
            size: size,
            templateUrl: '/user/partials/product-basket.html',
            controller: function($scope) {
              $scope.closeModal = function() {
                $scope.$close();
              }
            }
          });
        };

        $rootScope.openLoginFormModal = function() {
          $modal.open({
            templateUrl: '/user/partials/login-form.html',
            controller: function($scope, $timeout, $filter, $window, $http, $location) {
              $scope.closeModal = function() {
                $scope.$close();
              };

              $scope.logIn = function(userEmail, userPassword) {
                $http.get('/core/user/json/users.json').success(function (data) {

                  var userObj = $filter('filter')(data, {email : userEmail, password : userPassword})[0];

                  if (angular.isObject(userObj)) {
                      $window.sessionStorage.authorizedUser = userObj.email +'/'+ userObj.name +'/'+ userObj.password;
                      $location.path('/admin');
                      $scope.$close();
                  } else {
                      $scope.wrongCredentials = true;
                      $timeout(function () {
                          $scope.wrongCredentials = false;
                      }, 3700);
                  }

                }).error(function (data) {
                  alert('Can not get users.json');
                  console.log(data);
                });

              };

            }
          });
        };

  }]);

});