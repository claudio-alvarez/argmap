/**
 * Created by calvarezg on 5/30/17.
 */
(function () {
    'use strict';

    // create the angular app
    var app = angular.module('argmap', [
        'xeditable',
        'argmap.controllers',
        'argmap.directives'
    ]);

    // setup dependency injection
    angular.module('d3', []);
    angular.module('argmap.controllers', []);
    angular.module('argmap.directives', ['d3']);

    app.run((editableOptions) => {
        editableOptions.theme = 'bs3';
    });


}());