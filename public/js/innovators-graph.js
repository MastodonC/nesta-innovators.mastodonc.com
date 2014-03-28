var innovators = function() {
  var current;
  var graph = function(jsonFile, container) {
    sigma.parsers.json(jsonFile,
            {container: container},
            function(obj) { current = obj.graph });
   
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
  innovators.graph("data/innovators/addyosmani.json", "sigma-container");
  $('form select').change(function() {
     $("#sigma-container").empty();
     innovators.clear();
     $(this).find("option:selected").each(function() {
       var jsonFile = "data/innovators/" + $(this).val() + ".json";
       innovators.graph(jsonFile, "sigma-container");
     });
  });


});
