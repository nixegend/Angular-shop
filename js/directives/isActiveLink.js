define(['app'], function (app) {

    app.directive('isActive', [ '$location', 'pageTitle', function ($location, pageTitle) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                scope.location = $location;
                scope.$watch('location.path()', function (path) {
                    if('#' + path == element[0].hash) {
                        pageTitle.setTitle(element[0].innerHTML);
                        element.addClass('active');
                    } else {
                        element.removeClass('active');
                    }
                });
            }
        };
    }]);

    app.factory('pageTitle', function() {
      var title = 'Home';
      return {
        title: function() {
            return title;
        },
        setTitle: function(newTitle) {
            title = newTitle;
        }
      };
    });

});