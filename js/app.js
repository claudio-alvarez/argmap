/**
 * Created by calvarezg on 5/30/17.
 */
(function () {
    'use strict';

    angular.module('argmap.defaults', [])
        .service('argmap.defaults', function () { /* ... */ })
        .constant('default_messages', {
            'blank_comment' : '(Sin comentario)'
        });

    // create the angular app
    var app = angular.module('argmap', [
        'ui.bootstrap',
        'xeditable',
        'argmap.controllers',
        'argmap.directives',
        'argmap.defaults'
    ]);

    // setup dependency injection
    angular.module('d3', []);
    angular.module('argmap.controllers', ['ui.bootstrap']);
    angular.module('argmap.directives', ['argmap.defaults','d3']);

    app.run((editableOptions) => {
        editableOptions.theme = 'bs3';
    });
}());