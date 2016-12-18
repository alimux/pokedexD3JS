/* script force layout d3.js v0.1 */
var file ="json/pokemonDatas.json";

//definition of the size of "window"
var height = 1000;
var width = 1450;
//append the div tag
var svg = d3.select("#pokedex")
			.append("svg")
			.attr("width", width)
			.attr("height",height);
//init of d3 force
var force;

//init color
var colScale = d3.scale.category20();

function update(nodes, links)
	{
		force = d3.layout.force()
		.nodes(d3.values(nodes))
		//.nodes(nodes)
		.links(d3.values(links))
		.size([width, height])
		.linkDistance(50)
		.charge(-150)
		.on("tick",tick)
		.start();

		var path = svg.append("svg:g").selectAll("path")
    	 .data(force.links())
 		 .enter().append("svg:path")
   		 .attr("class", function(d) { return "link " ; })
   		 ;

		//draw circle
		var circle = svg.append("svg:g").selectAll("circle")
   		.data(force.nodes())
		.enter().append("svg:circle")
		.style("fill", function(d) { return colScale(d.cluster);})
    	.attr("r", 8)
    	.call(force.drag);

    	//settings text
    	var text = svg.append("svg:g").selectAll("g")
    	.data(force.nodes())
  		.enter().append("svg:g");

		// A copy of the text with a thick white stroke for legibility.
		text.append("svg:text")
    	.attr("x", 12)
    	.attr("y", ".31em")
   		.attr("class", "shadow")
    	.text(function(d) { return d.pokemonName; });

		text.append("svg:text")
   		 .attr("x", 12)
   		 .attr("y", ".31em")
   		 .text(function(d) { return d.pokemonName; });

   		 

    	//translation points
    	function tick(e)
    		{
    			path.attr("d", function(d)
    			 {
   				 	var dx = d.target.x - d.source.x,
       				 dy = d.target.y - d.source.y,
       			 dr = Math.sqrt(dx * dx + dy * dy);
   				 return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
 				 });

    			circle.attr("transform", function(d) 
    				{
    					return "translate(" + d.x + "," + d.y + ")";
 					 });
    			//text translation
   		 		text.attr("transform", function(d)
   		 		 {
   					 return "translate(" + d.x + "," + d.y + ")";
 				 });
    		}

	}

d3.json(file, function(error, data){
	
	console.log(data);
	netClustering.cluster(data.nodes, data.links);
	update(data.nodes, data.links);

});