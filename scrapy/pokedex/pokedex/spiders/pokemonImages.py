# -*- coding: utf-8 -*-
#import 
import scrapy
from pokedex.items import PokedexImages
import datetime

class pokemonImages(scrapy.Spider):
	name = "PokemonImages"
	start_urls = ["http://pokemondb.net/pokedex/bulbasaur", ]
	allowed_domains = ["http://pokemondb.net"]


	def parse(self, response):
	 	img = response.xpath('//*[contains(@id, "svtabs_basic_")]/div[1]/div[1]/img/@src')
	 	imageURL = img.extract_first()
	 	print "l'url de l'image est : "+imageURL

	 	yield PokedexImages(file_urls=[imageURL])

	 	next_page = response.xpath('//*[contains(@class,"entity-nav-next")]/@href').extract_first()
	 	#pagination auto
	 	if next_page is not None:
	 		yield scrapy.Request(response.urljoin(next_page))