define(['app'], function (app) {
    app.service('rcm', [function () {

        this.getSortArr = function(arrId) {
            var sortArr = arrId.sort(function(a, b){return a-b});
            var j = sortArr.length;
            while (j--) {
              if (sortArr[j] == sortArr[j-1]) sortArr.splice(j, 1);
            }
        return sortArr;
        }

        this.reConstructor = function(dataMenu) {
            var newMenu = [],
                arrId = [];

            for (var i = 0; i < dataMenu.length; i++) {
                if(dataMenu[i].parentID != '0') arrId.push(+dataMenu[i].parentID);
            }

            var arrParId = this.getSortArr(arrId);

            function pusher(obj) {
                for (var i = 0; i < dataMenu.length; i++) {
                    if(dataMenu[i].parentID == obj.id) obj.subLevel.push(dataMenu[i]);
                }
            }

            for (var j = 0; j < arrParId.length; j++) {
                for (var i = 0; i < dataMenu.length; i++) {
                    if(dataMenu[i].id == arrParId[j]) {
                        dataMenu[i]['subLevel'] = [];
                        pusher(dataMenu[i]);
                    }
                }
            }

            for (var i = 0; i < dataMenu.length; i++) {
                if(dataMenu[i].parentID == '0') newMenu.push(dataMenu[i]);
            }

            return newMenu;
        }

        return this;

    }]);
});