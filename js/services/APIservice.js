define(['app'], function (app) {
    app.service('APIservice', ['$http', '$q', function ($http, $q) {

        this.getSortArr = function(arrId) {
            var sortArr = arrId.sort(function(a, b){return a-b});
            var j = sortArr.length;
            while (j--) {
              if (sortArr[j] == sortArr[j-1]) sortArr.splice(j, 1);
            }
        return sortArr;
        }

        this.getDOMelement = function(selector) {
            return angular.element(document.querySelectorAll(selector));
        }

        this.getJSONresponse = function(file) {
        var def = $q.defer();
            $http.get('/js/json/'+file+'.json').success(function (data, status, headers, config) {
                def.resolve(data);
            }).error(function (data, status, headers, config) {
                console.log(status);
                alert('Can not get '+file+'.json');
                def.reject('Failed to get '+file+'.json');
            });

        return def.promise;
        }

        return this;
    }]);
});