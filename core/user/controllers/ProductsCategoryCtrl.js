define(['app', 'RCMservice', 'APIservice'], function (app) {
	app.controller('ProductsCategoryCtrl', ['$scope', '$filter', '$routeParams', '$location', 'rcm', 'api',
		function ($scope, $filter, $routeParams, $location, rcm, api) {

		$scope.categoriesMenu = '/user/partials/categories-menu.html';
		$scope.selectArr = [8, 16, 32, 64, 128];
		$scope.itemsPerPage = 8;
		$scope.currentPage = 1;
		$scope.boxesInRow = 4;
		$scope.maxSize = 3;

//==============================================================
	   	function productsFilters(obj, filterCriteria) {
			for (var i = 0; i < filterCriteria.length; i++) {
				var arrCriteria = obj.map(function (m) {
						for (var p in m) {
							return m[filterCriteria[i].machineName];
						}
					}).filter(function (m, idx, arr) {
						return arr.indexOf(m) == idx;
					});

				filterCriteria[i][filterCriteria[i].machineName] = (isNaN(arrCriteria[0]))
					? arrCriteria.sort()
					: arrCriteria.sort(function(a, b){return a-b});
			}
			$scope.filterCriteria = filterCriteria;
		};

//==============================================================
    api.getJSONresponse('categories').then(function (data) {
		var categoryObj = $filter('filter')(data, {path : $location.path()})[0];
      	$scope.categories = rcm.reConstructor(data);
		$scope.criteria = categoryObj.filters;
		$scope.sortCriteria = categoryObj.sortBy[0].machineName;
		$scope.sortOptions = categoryObj.sortBy;
		$scope.categoryName = categoryObj.name;
    });

//==============================================================

		$scope.sortDescAscBtn = function() {
			api.ngElement(api.getDomElement('#sortDescAsc')).
			toggleClass('fa-sort-amount-asc fa-sort-amount-desc');
			$scope.reverse = !$scope.reverse;
			$scope.$watch('sortCriteria', function () {
		     var obj = $filter('orderBy')($scope.totalItems, $scope.sortCriteria, $scope.reverse);
	 			$scope.productsPagenation(obj);
		    });
		};

		($scope.boxListLayout = function(layout) {
  			$scope.layout = (layout == 'list') ? '/user/partials/layout-list.html' : '/user/partials/layout-box.html';
  			$scope.radioModel = layout;
			$scope.box = !$scope.box;
			$scope.list = !$scope.list;
		})('list');

//==============================================================
		$scope.count = function (value, prop) {
			return function (obj) {
			  return obj[prop] == value;
			}
		}
//==============================================================

		api.getJSONresponse($routeParams.category).then(function (data) {
			productsFilters(data, $scope.criteria);
			$scope.productsData = data;
  			$scope.productsPagenation(data);
    	});

//==============================================================

  		var criteriaObj = {};
		$scope.filterProducts = function(param, prop) {
		  var arrProducts = [];

		  function getProductsObj(scopeArr) {
			arrProducts = [];
			return (scopeArr.length == 0) ? $scope.productsData : scopeArr;
		  }

		  if (criteriaObj.hasOwnProperty(prop)) {
			var x = criteriaObj[prop].indexOf(param);
			if (x > -1) {
			  criteriaObj[prop].splice(x, 1);
			  if (criteriaObj[prop].length == 0)
			  delete(criteriaObj[prop]);
			} else {
			  criteriaObj[prop].push(param);
			}
		  } else {
			criteriaObj[prop] = [param];
		  }

		  for (var p in criteriaObj) {
			getProductsObj(arrProducts).map(function(obj) {
			  if (criteriaObj[p].indexOf(obj[p]) > -1)
				arrProducts.push(obj);
			});
		  }

		  	if (param === true && prop === true) {
			  	criteriaObj = {};
					arrProducts = [];
		  	}

		  var p = (arrProducts.length == 0) ? $scope.productsData : arrProducts;
		  $scope.productsPagenation(p);
		};

//==============================================================

	$scope.productsPagenation = function(obj) {
		$scope.totalItems = obj;
		($scope.pageChanged = function() {
			var items = +$scope.itemsPerPage;
			var begin = (($scope.currentPage - 1) * items);
			var end = items + begin;
			$scope.displayProducts = obj.slice(begin, end);
		})();
	}

    $scope.$watch('searchInList', function () {
       var obj = $filter('filter')($scope.productsData, $scope.searchInList);
	if (obj != undefined) $scope.productsPagenation(obj);
    });

//==============================================================

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

	$scope.collapseAll = function() {
		var span = api.getDomElement('.categoriesMenu span.head', true);
		for (var i = 0; i < span.length; i++) {
			slideUpAll(span[i]);
		}
	};

	$scope.expandAll = function() {
		var span = api.getDomElement('.categoriesMenu span.head', true);
		for (var i = 0; i < span.length; i++) {
			slideDownAll(span[i]);
		}
	};

//==============================================================

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