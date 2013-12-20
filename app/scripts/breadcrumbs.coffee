'use strict'

angular.module 'breadcrumbs', []

angular.module('breadcrumbs')
  .directive 'breadcrumbs', ->
    template: '<div></div>'
    restrict: 'E'
    link: (scope, element, attrs) ->
      element.text 'this is the breadcrumbs directive'