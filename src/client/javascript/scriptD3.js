/* script force layout d3.js v0.1 */
var file ="json/pokemonDatas.json";

//size definition of the "window"
var margin = {top: -5, right: -5, bottom: -5, left: -5},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var root;


//append the div tag -> window pokedex
var svg = d3.select("#pokedex")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
      .call(d3.behavior.zoom().on("zoom", zoom))

 function zoom() {
        svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }
//svg.style("cursor","move");

//init of d3 force
var force;
var pokemonInfoDiv = d3.select("#pokemonInfo");
//init color
var colScale = d3.scale.category20();


function update(nodes, links)
	{

		force = d3.layout.force()
		.nodes(d3.values(nodes))
		.links(d3.values(links))
		.size([width, height])
		.linkDistance(50)
		.charge(-60)
    .gravity(.10)
		.on("tick",tick)
		.start();

    var drag = d3.behavior.drag()
        .origin(function(d) { return d; })
        .on("dragstart", dragstarted)
        .on("drag", dragged)
        .on("dragend", dragended);
    

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
    	.on("click", function(d) { showPokemonPanel(d); } )
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

    var drag = d3.behavior.drag()
        .origin(function(d) { return d; })
        .on("dragstart", dragstarted)
        .on("drag", dragged)
        .on("dragend", dragended);


    //test******************************************************************************************************************
  
     
      function dragstarted(d) {
        d3.event.sourceEvent.stopPropagation();
        d3.select(this).classed("dragging", true);
       }

    function dragged(d) {
        d3.select(this).attr("x", d.x = d3.event.x).attr("y", d.y = d3.event.y);
     }

    function dragended(d) {
        d3.select(this).classed("dragging", false);
     }

   		 /*------------------------------------------------------------------------------------------------------------------------------
       | Panel setting
       |_______________________________________________________________________________________________________________________________*/
       
       	//show panel
   		function showPokemonPanel( node ) 
   			{
   				console.log(node, nodes);
   				pokemonInfoDiv
				.html( getPokemonInfo(node,nodes) )
				.attr("class","panel_on");
    		}

    		//panel information
    	function getPokemonInfo( n, nodes ) 
    		{
    			console.log( "INFO", n );
    			var info= '<div id="cover">';
    			info += '<img class="cover" height="200" width="240" src="' + n.imagePokemon + '"/>';
    			info +=  '<img src="images/close.png" class="action" style="top: 0px;" title="close panel" onClick="toggleDiv(\'pokemonInfo\');"/>' ;
    			info += '</div><div style="clear: both;">';
    			info += '<div class=f><span class=l>National # :</span>: <span class=g>' + n.nationalNumber + '</span></div>';
    			info += '<div class=f><span class=l>Pokemon name :</span>: <span class=g>' + n.pokemonName + '</span></div>';
    			info += '<div class=f><span class=l>Japanese Name :</span>: <span class=g>' + n.japaneseName + '</span></div>';
    			info += '<div class=f><span class=l>Pokemon type :</span>: <span class=g>' + n.typePokemon + '</span></div>';
    			info += '<div class=f><span class=l> Species :</span>: <span class=g>' + n.species + '</span></div>';
          info += '<div class=f><span class=l>Statistic : </span>: <span class=g> </span></div>';
          info += '<div class=f><span class=l>Health points :</span>: <span class=g> ' + n.hp + '</span></div>';
          info += '<div class=f><span class=l>Attack points :</span>: <span class=g> ' + n.attack + '</span></div>';
          info += '<div class=f><span class=l>Defense points :</span>: <span class=g> ' + n.defense + '</span></div>';
          info += '<div class=f><span class=l>Speed points :</span>: <span class=g> ' + n.speed + '</span></div>';

    			info += '</div>';
    			return info;
 

    		}

    		//panel close
    	 toggleDiv = function( id, status ) 
    	 	{
    			d = d3.select('div#'+id);
    			console.log( 'TOGGLE', id, d.attr('class'), '->', status );
    				if( status === undefined )
      				status = d.attr('class') == 'panel_on' ? 'off' : 'on';
  					  d.attr( 'class', 'panel_' + status );
    				return false;
  			}
      /*________________________________________________________________________________________________________________________________*/
   		 

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

/*________________________________________________
|
| Datas source
|_________________________________________________*/

d3.json(file, function(error, data){
	
	console.log(data);

    var linkArray = data.links;
	netClustering.cluster(data.nodes, data.links);

    update(data.nodes, linkArray);

});

