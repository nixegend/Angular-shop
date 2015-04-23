define(['app', 'APIservice'], function (app) {
	app.controller('ProductDetailCtrl', ['$scope', '$filter', '$routeParams', 'api',
        function ($scope, $filter, $routeParams, api) {
        $scope.productId = $routeParams.productId;
		$scope.category = $routeParams.category;

        api.getJSONresponse('phones').then(function (data) {
            $scope.thisProduct = $filter('filter')(data, {id: $scope.productId}, true)[0];
            console.log($scope.thisProduct);
        });

	}]);
});