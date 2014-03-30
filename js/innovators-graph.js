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
                                   $("#follower .twitter").html('<a href="http://github.com/' + github + '"><i class="icon-github"/> ' + github + '</a>');
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
  var attributes = {"addyosmani":
                        {name: "Addy Osmani",
                        avatar: "https://avatars2.githubusercontent.com/u/110953?s=200",
                        company: "Google"},
                    "caolan": 
                        {name: "Caolan McMahon",
                        avatar: "https://avatars0.githubusercontent.com/u/5274?s=200",
                        company: "hoodiehq"},
                    "codepo8": 
                        {name: "Christian Heilmann",
                        avatar: "https://avatars1.githubusercontent.com/u/13508?s=200",
                        company: ""},
                    "csswizardry": 
                        {name: "Harry Roberts",
                        avatar: "https://avatars2.githubusercontent.com/u/751944?s=200",
                        company: "CSS Wizardry"},
                    "imathis": 
                        {name: "Brandon Mathis",
                        avatar: "https://avatars2.githubusercontent.com/u/12732?s=200",
                        company: "MongoHQ"},
                    "jgilfelt": 
                        {name: "Jeff Gilfelt",
                        avatar: "https://avatars0.githubusercontent.com/u/175697?s=200",
                        company: "readyState Software Ltd"},
                    "mattgemmell": 
                        {name: "Matt Gemmell",
                        avatar: "https://avatars0.githubusercontent.com/u/144873?s=200",
                        company: "Instinctive Code"},
                    "mitsuhiko": 
                        {name: "Armin Ronacher",
                        avatar: "https://avatars1.githubusercontent.com/u/7396?s=200",
                        company: "Fireteam Ltd"},
                    "nicklockwood": 
                        {name: "Nick Lockwood",
                        avatar: "https://avatars0.githubusercontent.com/u/546885?s=200",
                        company: "Charcoal Design"},
                    "remy": 
                        {name: "Remy Sharp",
                        avatar: "https://avatars2.githubusercontent.com/u/13700?s=200",
                        company: "Left Logic"},
                    "scrooloose": 
                        {name: "Martin Grenfell",
                        avatar: "https://avatars1.githubusercontent.com/u/1671?s=200",
                        company: ""},
                    "chrisbanes": 
                        {name: "Chris Banes",
                        avatar: "https://avatars3.githubusercontent.com/u/227486?s=200",
                        company: ""},
                    "daylerees": 
                        {name: "Dayle Rees",
                        avatar: "https://avatars0.githubusercontent.com/u/207870?s=200",
                        company: "Box UK Cardiff"},
                    "jcoglan": 
                        {name: "James Coglan",
                        avatar: "https://avatars0.githubusercontent.com/u/9265?s=200",
                        company: ""},
                    "kennethreitz": 
                        {name: "Kenneth Reitz",
                        avatar: "https://avatars0.githubusercontent.com/u/119893?s=200",
                        company: "Heroku"},
                    "memo": 
                        {name: "Memo Akten",
                        avatar: "https://avatars1.githubusercontent.com/u/144230?s=200",
                        company: "msavisuals"},
                    "nelstrom": 
                        {name: "Drew Neil",
                        avatar: "https://avatars1.githubusercontent.com/u/7069?s=200",
                        company: ""},
                    "padolsey": 
                        {name: "James Padolsey",
                        avatar: "https://avatars1.githubusercontent.com/u/59852?s=200",
                        company: ""},
                    "rmurphey": 
                        {name: "Rebecca Murphey",
                        avatar: "https://avatars2.githubusercontent.com/u/58987?s=200",
                        company: "Bazaarvoice"},
                    "simonw": 
                        {name: "Simon Willison",
                        avatar: "https://avatars1.githubusercontent.com/u/9599?s=200",
                        company: "Lanyrd"} };

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
        $("#innovator .twitter").html('<a href="http://github.com/' + github + '"><i class="icon-github"/> ' + github + '</a>');
        $("#innovator .name").text(attr.name);
        $("#innovator .company").text(attr.company);
       }
     });
  });


});
