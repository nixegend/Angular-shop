define(['app', 'RCMservice', 'APIservice'], function (app) {
	app.controller('ProductsCtrl', ['$scope', '$filter', 'rcm', 'api',
		function ($scope, $filter, rcm, api) {

        $scope.categoriesMenu = '/user/partials/categories-menu.html';
        $scope.boxesInRow = 2;

        api.getJSONresponse('categories').then(function (data) {
            $scope.productCategories = rcm.reConstructor(data);
        });

        function slideUpAll(elem) {
        var ul = api.ngElement(elem);
            ul.children().removeClass('fa-minus').addClass('fa-plus');
            ul.next()[0].style.display = 'none';
        };

        function slideDownAll(elem) {
        var ul = api.ngElement(elem);
            ul.next()[0].style.display = 'block';
            ul.children().removeClass('fa-plus').addClass('fa-minus');
        };

        $scope.toggleShowHideMenu = function (elem) {
        var ul = api.ngElement(elem);
            if (ul.hasClass('head')) {
            ul.children().toggleClass('fa-minus fa-plus');
            if(ul.next()[0].clientHeight)
                slideUpAll(elem);
            else
                slideDownAll(elem);
            }
        };

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