/*-----Node js server for D3JS project------ */

//init of npm object
var MongoClient = require("mongodb").MongoClient;
var express = require("express");
var fs = require("fs");

var app = express();

//constant
const PORT = 3000;
const path = require('path');

//settings route
app.use(express.static(path.join(__dirname, '../client')));
app.get('/', function(req, res)
	{
		res.render('index.html');

	});
//setting 404
app.use(function(req, res, next)
	{
		res.setHeader('Content-Type', 'text/plain');
		res.send(404, 'Page Introuvable !');
	});
//connection
MongoClient.connect("mongodb://localhost/pokedex", function(error, db)
		{
			if(error) throw error;
			console.log("Connecté à la base de donnée 'Pokedex'");

			//display of the collection
			var collection = db.collection("Pokemons");

			/*collection.find({"pokemonName":"Bulbasaur"}).toArray(function (error,results)
				{
					if(error) throw error;

					results.forEach(function(obj, i)
						{
						console.log(
						"national ID :" + obj.nationalNumber + "\n" + 
						"nom :" + obj.pokemonName);
					
						});

				});*/

			//function : create a node and links for D3 forceLayout
			function hierachyNodes(collection)
				{
					var forceJson = { "nodes" : [], "links" : [] };

					collection.find().toArray(function (error,results2)
					{
						if(error) throw error;
						console.log("push en cours...")

						//get index for links and source
						var name_index = {};
						name_index["nodes"] = 0;
						var SEUIL_MAX = 150;
						//var tempLinksRoot = { source : name_index["nodes"], target : 0, value : "100" };
						//forceJson.links.push(tempLinksRoot);

						results2.forEach(function(d, i)
							{

								name_index[d.typePokemon] = i;
								name_index[d.pokemonName] = i;

							});

						results2.forEach(function(d, i)
						{

							var tempNode = { nationalNumber : d.nationalNumber, pokemonName : d.pokemonName, japaneseName : d.japaneseName,
       										 typePokemon : d.typePokemon, species : d.species, height : d.height, weight : d.weight,
       										 abilities : d.abilities, imagePokemon : d.imagePokemon, hp : d.hp, attack :d.attack,
       										 defense : d.defense, spAtk : d.spAtk, spDef : d.spDef, speed : d.speed, total : d.total,
       										 imageEvo1 : d.imageEvo1, nivEvo1 : d.nivEvo1, imageEvo2 : d.imageEvo2, nivEvo2 : d.nivEvo2, imageEvo3 : d.imageEvo3 
       										} ;
							//console.log(tempNode);
							forceJson.nodes.push(tempNode);

							//var tempLinksRoot = { source : name_index[d.typePokemon], target : 0, value : "100" };
							//forceJson.links.push(tempLinksRoot);
							var tempLinksType = { source : name_index[d.pokemonName], target : name_index[d.typePokemon], value : d.hp }
							
							forceJson.links.push(tempLinksType);


						});
						//console.log(forceJson);
						var jsonObject = JSON.stringify(forceJson, null, '\t');
						//console.log(jsonObject);
					return fs.writeFileSync("../client/json/pokemonDatas.json", jsonObject, "UTF-8");

					});
				}

		
		//hierachyNodes(collection);
		//console.log("affichage de la fonction hierarchy : "+hierachyNodes());

		});
console.log("Welcome on NodeJs spec Pokemons ...");
app.listen(PORT);