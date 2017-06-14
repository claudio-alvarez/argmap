(function () {
    'use strict';

    angular.module('argmap.controllers', ['ui.tree','ui.bootstrap'])
    .controller('argmapCtrl', function($rootScope, $scope, $uibModal, $log, default_messages, $document) {
        // Argument map initial - hardcoded - ideas
        let ideas = [{'title': "Idea fuerza 1", 'summary': "Premise", 'id': 1, 'x': 100, 'y': 100},
            {'title': "Idea fuerza 2", 'summary': "Conclusion", 'id': 2, 'x': 100, 'y': 100 + 200}];

        // TODO: edge should have an Id
        let edges = [{'source' : ideas[0], 'target' : ideas[1], 'comment' : 'Es muy importante la asociación'}];

        $scope.argmapChart = {};
        $scope.ideas = ideas;
        $scope.edges = edges;

        $scope.deleteEdges = false;
        $scope.createEdges = false;
        $scope.commentVisible = false;
        $scope.helpVisible = false;

        $scope.currentComment = { text: '', edge: {}, x: 0, y: 0};
        $scope.prevNodeClicked = null;

        $scope.onSetChart = (data) => {
            $scope.argmapChart = data;
        }

        $scope.onEdgeClicked = (args) => {
            // If edge elimination mode is active:
            if ($scope.deleteEdges) {
                console.log("[onEdgeClicked] Delete mode on!");
                let edge = args.edge;

                let index = -1;

                // Search for the edge and delete it
                let found = $scope.edges.some((e, i) => {
                   if (e.source == edge.source && e.target == edge.target) {
                       index = i;
                       console.log("[onEdgeClicked] Found edge %d!", index);

                       return true;
                   }
                   else {
                       return false;
                   }
                });

                if (index >= 0 && found) {
                    console.log("[onEdgeClicked] Deleting edge %d!", index);
                    $scope.edges.splice(index, 1);
                }

                $scope.deleteEdges = false;

                $scope.$apply();

                // Update graph
                $scope.argmapChart.updateGraph();
            }
        }

        $scope.onCommentClicked = (args) => {
            $scope.currentComment = args;
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
            console.log("[onNodeClicked] begin");

            // Dismiss if edge creation mode is off
            if (!$scope.createEdges) {
                return;
            }

            let prevNode = $scope.prevNodeClicked;
            let currNode = args.node;

            if (prevNode != null) {
                console.log("[onNodeClicked] Previous node clicked id: '%d'", prevNode.id);
                console.log("[onNodeClicked] Current node clicked id: '%d'", currNode.id);

                // If previous node and current node are different, process the event, otherwise,
                // simply dismiss
                if (prevNode.id != currNode.id) {

                    let edgeDirectionToggle = false;
                    let foundSameEdge = false;

                    // Detect whether (1) there is an edge direction toggle, (2) an already existing edge
                    // has been specified, or (3) it is necessary to add a new edge.
                    $scope.edges.forEach((e, i, a) => {
                        // Detect edge direction toggle
                        if (e.source.id == currNode.id && e.target.id == prevNode.id) {
                            let aux = e.target;
                            $scope.edges[i].target = e.source;
                            $scope.edges[i].source = aux;

                            console.log("[onNodeClicked] swapping edge direction!");
                            edgeDirectionToggle = true;

                            // Reset node selection
                            $scope.prevNodeClicked = null;

                            // Switch off edge creation mode
                            $scope.createEdges = false;

                            $scope.$apply();

                            // Update graph
                            $scope.argmapChart.updateGraph();
                        }
                        else if (e.source.id == prevNode.id && e.target.id == currNode.id) {
                            console.log("[onNodeClicked] attempted to join nodes with already-existing edge");

                            foundSameEdge = true;
                            $scope.prevNodeClicked = currNode;
                        }
                    });

                    if (!edgeDirectionToggle && !foundSameEdge) {
                        console.log("[onNodeClicked] adding new edge");

                        // Add new edge
                        edges.push({'source' : prevNode, 'target' : currNode, comment: default_messages.blank_comment});

                        // Reset node selection
                        $scope.prevNodeClicked = null;

                        // Switch off edge creation mode
                        $scope.createEdges = false;

                        $scope.$apply();

                        // Update graph
                        $scope.argmapChart.updateGraph();
                    }
                }

            }
            else {
                // Update node previously clicked
                $scope.prevNodeClicked = args.node;
            }
        }

        $scope.onEdgeDeleteModeStart = () => {
            if ($scope.createEdges) {
                $scope.createEdges = false;
            }

            // activate help
            $scope.helpVisible = true;
        }

        $scope.onEdgeCreateModeStart = () => {

            if ($scope.deleteEdges) {
                $scope.deleteEdges = false;
            }

            // activate help
            $scope.helpVisible = true;
        }

        $scope.onIdeaTextUpdate = (data) => {
            $scope.argmapChart.updateGraph();
        }

        $scope.onCommentUpdate = () => {

        }

        $scope.closeHelp = () => {
            $scope.helpVisible = false;
        }

        $scope.treeValueOptions = {
            removed: (args) => {
                // traverse the edge list in search for edges that connect to-from
                // the deleted node
                let delEdges = [];

                $scope.edges.forEach((d,i,a) => {
                    if (d.source.id == args.node.id || d.dest.id == args.node.id) {
                        delEdges.push(i);
                    }
                });

                // remove the edges
                delEdges.forEach((d) => {
                   $scope.edges.splice(d);
                });

                // update the graph
                $scope.argmapChart.updateGraph();

                // regresh the scope
                $scope.$apply();

                console.log("Node removed: '%s'", args.node.id);
            }
        }
    });

}());

