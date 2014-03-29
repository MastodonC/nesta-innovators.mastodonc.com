var innovators = function() {
  var current;
  var graph = function(jsonFile, container) {
    sigma.parsers.json(jsonFile,
            {container: container},
            function(obj) {

              obj.bind('clickNode', function(e) {
                  console.log(e.data.node.label);
                  var github = e.data.node.label;
                  $("#follower .twitter").html('<a href="http://github.com/' + github + '"><i class="icon-github"/> ' + github + '</a>');
              });

              current = obj.graph;

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
     innovators.clear();
     $(this).find("option:selected").each(function() {
       var github = $(this).val();
       var jsonFile = "data/innovators/" + github + ".json";
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
