'use strict'

angular.module 'breadcrumbs', []

angular.module('breadcrumbs')
  .directive 'breadcrumbs', ($rootScope, $location) ->
    replace:    true
    transclude: true
    restrict:   'E'
    scope:      {}
    template:   '<div>
                  <ul class="breadcrumb">
                    <li>
                      <ng-switch on="breadcrumbs.length === 0">
                        <span ng-switch-when="true">Home</span>
                        <span ng-switch-default><a href="/">Home</a></span>
                      </ng-switch>
                    </li>
                    <li ng-repeat="breadcrumb in breadcrumbs">
                      <span class="divider">/</span>
                      <ng-switch on="$last">
                        <span ng-switch-when="true">{{breadcrumb.path}}</span>
                        <span ng-switch-default><a href="{{breadcrumb.url}}">{{breadcrumb.path}}</a></span>
                      </ng-switch>
                    </li>
                  </ul>
                  <div ng-transclude></div>
                </div>'
    link: (scope, element, attrs) ->
      $rootScope.$on '$routeChangeSuccess', ->
        if $location.path() == '/'
          scope.breadcrumbs = [] 
        else
          paths = $location.path().split('/')[1..]
          scope.breadcrumbs = paths.map (path) -> 
            index = paths.indexOf path
            path: path
            url:  "/#{paths[0..index].join('/')}"