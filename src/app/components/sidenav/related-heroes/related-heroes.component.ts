import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-related-heroes',
  templateUrl: './related-heroes.component.html',
  styleUrls: ['../../heroes/heroes.component.css','./related-heroes.component.css']
})
export class RelatedHeroesComponent implements OnInit, OnChanges {

  @Input() selectedHero;

  related = [];
  entities : Array<string> = ['comics', 'events', 'series', 'stories'];

  /**
   * constructor
   * @param dataService 
   */
  constructor( private dataService: DataService) { 

  }

  ngOnInit() {
    
  }

  /**
   * listen changes on selectedHero
   * init related heroes calls
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges) {
    const _selectedHero: SimpleChange = changes.selectedHero;
    this.initRelatedHeroes(_selectedHero.currentValue);
  }


  /**
   * init related heroes
   * @param hero 
   */
  initRelatedHeroes(hero)
  {
    this.related = [];
    this.selectedHero = hero;

    const entities : Array<string> = ['comics, events, series, stories'];

    for (let entity of this.entities) {      
      if(hero[entity].available) {
        let entityId = this.getEntityId(hero[entity]);
        this.getRelatedHeroes(entity, entityId);
      }
    }
  }


  /**
   * get entityId from url
   * @param entity 
   */
  getEntityId(entity) {
    let splitted = entity.items[0].resourceURI.split('/'); 
    return splitted[splitted.length-1];
  }


  /**
   * get related heroes
   * @param entity
   * @param entityId 
   */
  getRelatedHeroes(entity, entityId) {
    this.dataService.getHeroesFromEntity(entity, entityId)
      .subscribe(
        (info) => {
          this.checkAndAppend(info['data'].results);
        },
        (error) => {
          console.log('Error: ', error);
        },
        () => {
          
        }
      );
  }


  /**
   * check and append related heroes
   * - checks not to push same hero
   * - checks not to push repetitions
   * @param items 
   */
  checkAndAppend(items) {
    const itemsToPush = [];

    for (let item of items) {      

      if(item.id != this.selectedHero.id) {
        let toPush = true;
        for (let rel of this.related) {
          if(rel.id === item.id) {
            toPush = false;  
          } 
        }

        if(toPush) {
          this.related.push(item);
        }
      }

    }

  }

}
