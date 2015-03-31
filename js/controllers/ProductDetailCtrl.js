define(['app'], function (app) {

	app.controller('ProductDetailCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
        $scope.productId = $routeParams.productId;
		$scope.category = $routeParams.category;
	}]);

});