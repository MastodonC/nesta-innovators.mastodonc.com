// Add a method to the graph model that returns an
// object with every neighbors of a node inside:
sigma.classes.graph.addMethod('neighbors', function(nodeId) {
    var k,
        neighbors = {},
        index = this.allNeighborsIndex[nodeId] || {};

    for (k in index) {
      neighbors[k] = this.nodesIndex[k];
    }

    return neighbors;
});

var innovators = function() {
    var current;
    var graph = function(jsonFile, container) {
        sigma.parsers.json(jsonFile,
                           {container: container},
                           function(obj) {
                               current = obj.graph;
                               
                               obj.bind('clickNode', function(e) {
                                   console.log(e.data.node.label);
                                   var github = e.data.node.label;
                                   var attr = attributes[github];
                                   if (attr) {
                                       $("#follower .avatar").html('<img src="' + attr.avatar + '"/>');
                                       $("#follower .twitter").html('<a href="http://twitter.com/' + github + '"><i class="icon-twitter"/> ' + github + '</a>');
                                       $("#follower .github").html('<a href="http://github.com/' + github + '"><i class="icon-github"/> ' + github + '</a>');
                                       $("#follower .name").text(attr.name);
                                       $("#follower .company").text(attr.company);
                                   }

                               });
                               
                               
                               // sub-graph colouring
                               
                               // We first need to save the original colors of our
                               // nodes and edges, like this:
                               obj.graph.nodes().forEach(function(n) {
                                   n.originalColor = n.color;
                               });
                               obj.graph.edges().forEach(function(e) {
                                   e.originalColor = e.color;
                               });
                               
                               // When a node is clicked, we check for each node
                               // if it is a neighbor of the clicked one. If not,
                               // we set its color as grey, and else, it takes its
                               // original color.
                               // We do the same for the edges, and we only keep
                               // edges that have both extremities colored.
                               obj.bind('clickNode', function(e) {
                                   var nodeId = e.data.node.id,
                                       toKeep = obj.graph.neighbors(nodeId);
                                   toKeep[nodeId] = e.data.node;
                                   
                                   obj.graph.nodes().forEach(function(n) {
                                       if (toKeep[n.id]) {
                                           n.color = n.originalColor;
                                       } else {
                                           n.color = '#eee';
                                       }
                                   });
                                   
                                   obj.graph.edges().forEach(function(e) {
                                       if (toKeep[e.source] && toKeep[e.target]) {
                                           e.color = e.originalColor;
                                       } else {
                                           e.color = '#eee';
                                       }
                                   });
                                   
                                   // Since the data has been modified, we need to
                                   // call the refresh method to make the colors
                                   // update effective.
                                   obj.refresh();
                               });
                               
                               // When the stage is clicked, we just color each
                               // node and edge with its original color.
                               obj.bind('clickStage', function(e) {
                                   obj.graph.nodes().forEach(function(n) {
                                       n.color = n.originalColor;
                                   });
                                   
                                   obj.graph.edges().forEach(function(e) {
                                       e.color = e.originalColor;
                                   });
                                   
                                   // Same as in the previous event:
                                   obj.refresh();
                               });
                           });
    }

  var clear = function() {
    if (current) {
      
      current.clear();
      current.kill();
    }
  }

  return {
    graph: graph,
    clear: clear
  }

}();
jQuery(document).ready(function($) {

  $('form select').change(function() {
     $("#sigma-container").empty();
     $("#follower .twitter").empty();
     innovators.clear();
     $(this).find("option:selected").each(function() {
       var github = $(this).val();
       var jsonFile = "/data/innovators/" + github + ".json";
       innovators.graph(jsonFile, "sigma-container");
       var attr = attributes[github];
       if (attr) {
        $("#innovator .avatar").html('<img src="' + attr.avatar + '"/>');
        $("#innovator .twitter").html('<a href="http://twitter.com/' + github + '"><i class="icon-twitter"/> ' + github + '</a>');
        $("#innovator .github").html('<a href="http://github.com/' + github + '"><i class="icon-github"/> ' + github + '</a>');
        $("#innovator .name").text(attr.name);
        $("#innovator .company").text(attr.company);
       }
     });
  });


});
