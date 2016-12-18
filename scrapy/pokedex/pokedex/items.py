# -*- coding: utf-8 -*-

import scrapy
from scrapy.item import Item, Field

#definition of the fields of the pokedex
class PokedexItem(scrapy.Item):

    nationalNumber = scrapy.Field()
    pokemonName = scrapy.Field()
    japaneseName  = scrapy.Field()
    imagePokemon = scrapy.Field()
    typePokemon  = scrapy.Field()
    species = scrapy.Field()
    height  = scrapy.Field()
    weight  = scrapy.Field()
    abilities  = scrapy.Field()
    hp  = scrapy.Field()
    attack  = scrapy.Field()
    defense  = scrapy.Field()
    spAtk  = scrapy.Field()
    spDef  = scrapy.Field()
    speed  = scrapy.Field()
    total  = scrapy.Field()
    imageEvo1  = scrapy.Field()
    nivEvo1  = scrapy.Field()
    imageEvo2  = scrapy.Field()
    nivEvo2  = scrapy.Field()
    imageEvo3  = scrapy.Field()

    #order the exported fields
    #overide
    def keys(self):
        return ['nationalNumber','pokemonName', 'japaneseName',
        'imagePokemon', 'typePokemon', 'species', 'height', 'weight',
        'abilities','hp','attack', 'defense', 'spAtk', 'spDef', 'speed',
        'total', 'imageEvo1', 'nivEvo1', 'imageEvo2', 'nivEvo2', 'imageEvo3']


class PokedexImages(scrapy.Item):
    file_urls = scrapy.Field()
    files = scrapy.Field()
