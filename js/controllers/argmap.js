(function () {
    'use strict';

    angular.module('argmap.controllers', ['ui.tree','ui.bootstrap'])
    .controller('argmapCtrl', function($scope) {

        // Argument map initial - hardcoded - ideas
        let ideas = [{'title': "Mi gran if", 'summary': "Premise", 'id': 1, 'x': 100, 'y': 100},
            {'title': "Mi otra gran if", 'summary': "Conclusion", 'id': 2, 'x': 100, 'y': 100 + 200}];

        let edges = [{'source' : ideas[0], 'target' : ideas[1]}];

        $scope.argmapChart = {};
        $scope.ideas = ideas;
        $scope.edges = edges;

        $scope.chartSetCallback = (data) => {
            $scope.argmapChart = data;
        }

        $scope.ideaIdx = 3;
        $scope.addIdea = () => {
            ideas.push({'title': "Mi gran if", 'summary': "Premise", 'id': $scope.ideaIdx, 'x': $scope.ideaIdx * 50, 'y': 100});
            $scope.ideaIdx++;
            $scope.argmapChart.updateGraph();
        };
    });

}());
