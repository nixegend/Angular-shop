define(['app', 'RCMservice', 'APIservice'], function (app) {
	app.controller('ProductsCtrl', ['$scope', '$filter', 'rcm', 'api',
		function ($scope, $filter, rcm, api) {

//==============================================================
	   	$scope.productsFilters = function (obj) {
			var newObj = {};
			var filterCriteria = ['manufacturer', 'memory'];

			for (var i = 0; i < filterCriteria.length; i++) {
				var arrCriteria = obj.map(function (m) {
						for (var p in m) {
							return m[filterCriteria[i]];
						}
					}).filter(function (m, idx, arr) {
						return arr.indexOf(m) == idx;
					});

				if(isNaN(arrCriteria[0])){
					newObj[filterCriteria[i]] = arrCriteria.sort();
				} else {
					newObj[filterCriteria[i]] = arrCriteria.sort(function(a, b){return a-b});
				}
			}
			$scope.filterCriteria = newObj;
		};
//==============================================================

		var sortDescAsc = api.getDomElement('#sortDescAsc');

		$scope.sortChanged = function() {
			$scope.sortoptions = ['memory', 'model', 'price'];
		var predicateSort = ($scope.sortCriteria == undefined) ? $scope.sortoptions[0] : $scope.sortCriteria;
			$scope.predicate = predicateSort;
			$scope.sortCriteria = predicateSort;
		}

			$scope.sortChanged();

		$scope.sortDescAscBtn = function() {
			api.ngElement(sortDescAsc).toggleClass('fa-sort-amount-asc fa-sort-amount-desc');
			$scope.reverse = !$scope.reverse;
		}

			$scope.sortDescAscBtn();
  			$scope.layouts = ['partials/layout-list.html', 'partials/layout-box.html'];

		$scope.boxListLayout = function(layout) {
  			$scope.layout = (layout == 'list') ? $scope.layouts[0] : $scope.layouts[1];

  			$scope.radioModel = layout;
			$scope.box = !$scope.box;
			$scope.list = !$scope.list;
		}

  			$scope.boxListLayout('list');

//==============================================================
		$scope.count = function (value, prop) {
			return function (obj) {
			  return obj[prop] == value;
			}
		}
//==============================================================

		api.getJSONresponse('phones').then(function (data) {
			$scope.productsFilters(data);
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

		$scope.selectArr = [8, 16, 32, 64, 128, 'All'];
		$scope.itemsPerPage = 8;
		$scope.currentPage = 1;
		$scope.maxSize = 3;

		$scope.productsPagenation = function(obj) {

			$scope.totalItems = obj;

			$scope.pageChanged = function() {
			var items = $scope.itemsPerPage;
				items = (items == 'All') ? obj.length : +items;

				var begin = (($scope.currentPage - 1) * items);
				var end = items + begin;
				$scope.displayProducts = obj.slice(begin, end);
			}

			$scope.pageChanged();
		}

    $scope.$watch('searchInList', function () {
       var obj = $filter('filter')($scope.productsData, $scope.searchInList);
	if (obj != undefined) $scope.productsPagenation(obj);
    });

		$scope.boxesInRow = 4;
//==============================================================

    api.getJSONresponse('categories').then(function (data) {
       $scope.categories = rcm.reConstructor(data);
    });

    $scope.categoriesMenu = 'partials/categories-menu.html';

//==============================================================

// todo : use nativ script and angular
	$scope.toggleShowHideMenu = function (event) {
		// $(event.target).next('ul').slideToggle()
	}

	$scope.collapseAll = function() {
		// $('#categoriesMenu span.head').each(function() {
		// 	$(this).next('ul').slideUp();
		// });
	}

	$scope.expandAll = function() {
		// $('#categoriesMenu span.head').each(function() {
		// 	$(this).next('ul').slideDown();
		// });
	}

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