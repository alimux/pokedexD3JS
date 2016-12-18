# -*- coding: utf-8 -*-
import scrapy
from scrapy.contrib.linkextractors import LinkExtractor
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor

from pokedex.items import PokedexItem

class PokemonSpider(CrawlSpider):
    name = "pokemon"
    allowed_domains = ["pokemondb.net"]
    start_urls = [
        "http://pokemondb.net/pokedex/bulbasaur",       
    ]

    def parse(self, response):

        #scraping of pokedex database
        item = PokedexItem()
        
        item['imagePokemon'] = response.xpath('//*[contains(@id, "svtabs_basic_")]/div[1]/div[1]/img/@src').extract_first()
        item['pokemonName'] = response.xpath('/html/body/article/h1/text()').extract_first()  
        item['nationalNumber'] = response.xpath('//*[contains(@id, "svtabs_basic_")]/div[1]/div[2]/table/tbody/tr[1]/td/strong/text()').extract_first()
        item['typePokemon'] = response.xpath('//*[contains(@id, "svtabs_basic_")]/div[1]/div[2]/table/tbody/tr[2]/td/a/text()').extract_first()
        item['species'] = response.xpath('//*[contains(@id, "svtabs_basic_")]/div[1]/div[2]/table/tbody/tr[3]/td/text()').extract_first()
        item['height'] = response.xpath('//*[contains(@id, "svtabs_basic_")]/div[1]/div[2]/table/tbody/tr[4]/td/text()').extract_first()
        item['weight'] = response.xpath('//*[contains(@id, "svtabs_basic_")]/div[1]/div[2]/table/tbody/tr[5]/td/text()').extract_first()
        item['abilities'] = response.xpath('//*[contains(@id, "svtabs_basic_")]/div[1]/div[2]/table/tbody/tr[6]/td/a/text()').extract_first()
        item['japaneseName'] = response.xpath('//*[contains(@id, "svtabs_basic_")]/div[1]/div[2]/table/tbody/tr[8]/td/text()').extract_first()
        item['hp'] = response.xpath('//*[contains(@id, "svtabs_basic_")]/div[2]/div[1]/table/tbody/tr[1]/td[1]/text()').extract_first()
        item['attack'] = response.xpath('//*[contains(@id, "svtabs_basic_")]/div[2]/div[1]/table/tbody/tr[2]/td[1]/text()').extract_first()
        item['defense'] = response.xpath('//*[contains(@id, "svtabs_basic_")]/div[2]/div[1]/table/tbody/tr[3]/td[1]/text()').extract_first()
        item['spAtk'] = response.xpath('//*[contains(@id, "svtabs_basic_")]/div[2]/div[1]/table/tbody/tr[4]/td[1]/text()').extract_first()
        item['spDef'] = response.xpath('//*[contains(@id, "svtabs_basic_")]/div[2]/div[1]/table/tbody/tr[5]/td[1]/text()').extract_first()
        item['speed'] = response.xpath('//*[contains(@id, "svtabs_basic_")]/div[2]/div[1]/table/tbody/tr[6]/td[1]/text()').extract_first()
        item['total'] = response.xpath('//*[contains(@id, "svtabs_basic_")]/div[2]/div[1]/table/tfoot/tr/td/b/text()').extract_first()
        item['imageEvo1'] = response.xpath('/html/body/article/div[5]/div[2]/div/span[1]/a[1]/img/@src').extract_first()
        item['nivEvo1'] = response.xpath('/html/body/article/div[5]/div[2]/div/span[2]/text()').extract()
        item['imageEvo2'] = response.xpath('/html/body/article/div[5]/div[2]/div/span[3]/a[1]/img/@src').extract_first()
        item['nivEvo2'] = response.xpath('/html/body/article/div[5]/div[2]/div/span[4]/text()').extract()
        item['imageEvo3'] = response.xpath('/html/body/article/div[5]/div[2]/div/span[5]/a[1]/img/@src').extract_first()
        yield item

        #i=0

        next_page = response.xpath('//*[contains(@class,"entity-nav-next")]/@href').extract_first()
        #response.xpath('/html/body/article/nav[1]/a/@href').extract_first()  
        #while next_page != '':
        #    i+=1
        if next_page is not None:
            
            yield scrapy.Request(response.urljoin(next_page))
