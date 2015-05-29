define(['app'], function (app) {

    app.directive('isActive', [ '$location', '$rootScope', function ($location, $rootScope) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                scope.location = $location;
                scope.$watch('location.path()', function (path) {
                    if('#' + path == element[0].hash) {
                        $rootScope.pageTitle = element[0].innerText;
                        element.addClass('active');
                    } else {
                        element.removeClass('active');
                    }
                });
            }
        };
    }]);

});