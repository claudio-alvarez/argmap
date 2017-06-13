(function () {
    'use strict';

    angular.module('argmap.controllers', ['ui.tree','ui.bootstrap'])
    .controller('argmapCtrl', function($rootScope, $scope, $uibModal, $log, $document) {
        // Argument map initial - hardcoded - ideas
        let ideas = [{'title': "Idea fuerza 1", 'summary': "Premise", 'id': 1, 'x': 100, 'y': 100},
            {'title': "Idea fuerza 2", 'summary': "Conclusion", 'id': 2, 'x': 100, 'y': 100 + 200}];

        let edges = [{'source' : ideas[0], 'target' : ideas[1], 'comment' : 'Es muy importante la asociación'}];

        $scope.argmapChart = {};
        $scope.ideas = ideas;
        $scope.edges = edges;

        $scope.deleteEdges = false;
        $scope.createEdges = false;
        $scope.commentVisible = false;

        $scope.chart_click_args = {};
        $scope.edge_clicked = {};
        $scope.edge_comment = '';
        $scope.prev_node_clicked = null;

        $scope.chartSetCallback = (data) => {
            $scope.argmapChart = data;
        }

        $scope.edgeClickCallback = (args) => {
            $scope.chart_click_args = args;
            $scope.commentVisible = true;
            $scope.$apply();
        }

        $scope.ideaIdx = 3;
        $scope.addIdea = () => {
            ideas.push({'title': "Edítame pinchando aquí", 'summary': "Este es un resumen de la idea", 'id': $scope.ideaIdx, 'x': $scope.ideaIdx * 50, 'y': 100});
            $scope.ideaIdx++;
            $scope.argmapChart.updateGraph();
        }

        $scope.onNodeClicked = (args) => {
            let prevNode = $scope.prev_node_clicked;
            let currNode = args.node;

            if (prevNode != null) {
                console.log("[onNodeClicked] Previous node clicked id: '%d'", prevNode.id);
                console.log("[onNodeClicked] Current node clicked id: '%d'", currNode.id);
                if (prevNode.id != currNode.id) {
                    edges.forEach((e) => {
                        // TODO: it is possible to have a single directe edge
                        // between two nodes. Orientation of the edge can be
                        // changed/toggled.
                        if ((e.source.id != prevNode.id && e.target.id != currNode.id) &&
                            (e.dest.id != prevNode.id && e.source.id != currNode.id)) {
                            console.log("[onNodeClicked] adding edge to argmap!");
                            edges.push({'source' : prevNode, 'target' : currNode});
                        }
                    });
                }
            }
            else {
                $scope.prev_node_clicked = args.node;
            }

            $scope.argmapChart.updateGraph();
        }

        $scope.onIdeaTextUpdate = (data) => {
            $scope.argmapChart.updateGraph();
        }

        $scope.onCommentUpdate = () => {
            // find the edge
            $scope.edge_clicked.comment = $scope.edge_comment;
        }
    });

}());

