/**
 * Created by calvarezg on 5/30/17.
 */
(function () {
    'use strict';

    // create the angular app
    angular.module('argmap', [
        'argmap.controllers',
        'argmap.directives'
    ]);

    // setup dependency injection
    angular.module('d3', []);
    angular.module('argmap.controllers', []);
    angular.module('argmap.directives', ['d3']);

}());