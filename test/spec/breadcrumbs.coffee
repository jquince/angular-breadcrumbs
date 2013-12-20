'use strict'

describe 'Directive: breadcrumbs', ->

  beforeEach module 'breadcrumbs'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<breadcrumbs></breadcrumbs>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the breadcrumbs directive'
