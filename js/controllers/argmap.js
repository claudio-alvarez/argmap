(function () {
    'use strict';

    angular.module('argmap.controllers', ['ui.tree','ui.bootstrap'])
    .controller('argmapCtrl', function($rootScope, $scope, $uibModal, $log, $document) {
        var $ctrl = this;

        // Argument map initial - hardcoded - ideas
        let ideas = [{'title': "Mi gran if", 'summary': "Premise", 'id': 1, 'x': 100, 'y': 100},
            {'title': "Mi otra gran if", 'summary': "Conclusion", 'id': 2, 'x': 100, 'y': 100 + 200}];

        let edges = [{'source' : ideas[0], 'target' : ideas[1], 'comment' : 'Es muy importante la asociación'}];

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

        $scope.edgeClickCallback = (data) => {
            $scope.edge_clicked = data;
            $scope.edge_comment = data.comment;
            $scope.$apply();
            $scope.openModal();
        }

        $scope.animationsEnabled = true;
        $scope.edge_clicked = {};
        $scope.edge_comment = '';

        $scope.openModal = () => {
            $scope.modalInstance = $uibModal.open({
                templateUrl: 'argmapModalContent.html',
                scope: $scope,
            });
        };

        $scope.pv = () => {
            console.log("pv: '%s'", $scope.edge_comment);
        }

        $scope.cancel = () => {
            $scope.modalInstance.dismiss();
            $scope.modalInstance.close();
        }

        $scope.ok = () => {
            // find the edge
            $scope.edge_clicked.comment = $scope.edge_comment;
            $scope.modalInstance.close();
        }
    });

}());

