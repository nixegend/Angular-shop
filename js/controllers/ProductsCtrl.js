define(['app', 'RCMservice', 'APIservice'], function (app) {
	app.controller('ProductsCtrl', ['$scope', '$filter', 'rcm', 'api',
		function ($scope, $filter, rcm, api) {

$scope.categoryTreeBox = 'partials/categories-menu.html';
$scope.boxesInRow = 2;

    api.getJSONresponse('categories').then(function (data) {

$scope.productCategories = rcm.reConstructor(data);

console.log();
    });









	}]);


    app.filter('rows', function() {
        return function(arrLength) {
            var numRows = Math.ceil(arrLength);
            var arrRows = [];
            for (var i = 0; i < numRows; i++) {
                arrRows[i] = i;
            }
            return arrRows;
        };
    });

});