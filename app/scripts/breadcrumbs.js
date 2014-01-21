(function () {
    'use strict';
    angular.module('breadcrumbs', []);

    angular.module('breadcrumbs').directive('breadcrumbs', function ($rootScope, $location) {
        return {
            replace: true,
            transclude: true,
            restrict: 'E',
            scope: { 'labelMap':'=' },
            template: '<div>' +
                    '<ul class="breadcrumb">' +
                    '<li>' +
                    '<ng-switch on="breadcrumbs.length === 0">' +
                    '<span ng-switch-when="true">Home</span>' +
                    '<span ng-switch-default><a href="/">Home</a></span>' +
                    '</ng-switch>' +
                    '</li>' +
                    '<li ng-repeat="breadcrumb in breadcrumbs">' +
                    '<span class="divider">/</span>' +
                    '<ng-switch on="$last">' +
                    '<span ng-switch-when="true">{{breadcrumb.path}}</span>' +
                    '<span ng-switch-default><a href="{{breadcrumb.url}}">{{breadcrumb.path}}</a></span>' +
                    '</ng-switch>' +
                    '</li>' +
                    '</ul>' +
                    '<span ng-transclude class="breadcrumb"></span></div>',
            link: function (scope) {
                scope.updateBreadcrumbs = function () {
                    var paths;
                    if ($location.path() === '/') {
                        scope.breadcrumbs = [];
                    } else {
                        paths = $location.path().split('/').slice(1);
                        scope.breadcrumbs = paths.map(function (path) {
                            var index;
                            index = paths.indexOf(path);
                            if(scope.labelMap && scope.labelMap[path]){
                                path = scope.labelMap[path];
                            }
                            return {
                                path: path,
                                url: "/" + (paths.slice(0, +index + 1 || 9e9).join('/'))
                            };
                        });
                    }
                };
                scope.$watch('labelMap',function(){
                    if(scope.labelMap && Object.keys(scope.labelMap).length){
                        scope.updateBreadcrumbs();
                    }
                },true);
                var removeRouteChange = $rootScope.$on('$routeChangeSuccess', scope.updateBreadcrumbs);
                scope.$on('$destroy', function () {
                    removeRouteChange();
                });
                scope.updateBreadcrumbs();
            }
        };
    });

}).call(this);