import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/Hero';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  /**
   * init variables
   */
  heroes : Hero[] = [];
  limit : number = 50;
  loadingLayer : boolean = false;
  nameStartsWith : string = '';
  offset : number = 0;
  posts = [];
  relatedHeroes : Hero[] = [];
  selectedHero : Hero;
  toggleSidenav : boolean = false;

  /**
   * constructor
   * @param dataService 
   */
  constructor ( private dataService: DataService ) {

  }

  /**
   * inif function
   */
  ngOnInit() {
    this.getHeroes();
  }


  /**
   * get heroes call
   */
  getHeroes() {
    this.loadingLayer = true;

    this.dataService.getHeroes(this.limit, this.offset, this.nameStartsWith)
      .subscribe(
        (info) => {
          this.heroes = this.heroes.concat(info['data'].results);
        },
        (error) => {
          console.error('Error: ', error)
        },
        () => {
          this.loadingLayer = false;
        }
      );
  }


  /**
   * View more function
   * call for more heroes
   */
  viewMore () {
    this.offset += this.limit;
    this.getHeroes();
  }


  /**
   * get heroes with filter
   */
  getFilterHeroes()
  {
    this.offset = 0;
    this.heroes = [];
    this.getHeroes();
  }


  /**
   * show hero in sidebar
   * @param hero 
   */
  showHero(hero: Hero)
  {
    this.toggleSidenav = true;
    this.selectedHero = hero;
    document.getElementsByTagName('html')[0].className += ' toggled';
    document.getElementsByTagName('body')[0].className += ' toggled';
  }


  /**
   * listen from sidenav event
   * @param $event 
   */
  listenSidenav($event) {
    this.toggleSidenav = $event;    

    let htmlObj = document.getElementsByTagName('html')[0];
    let bodyObj = document.getElementsByTagName('body')[0];
    htmlObj.className = htmlObj.className.replace(/(?:^|\s)toggled(?!\S)/g,'');
    bodyObj.className = bodyObj.className.replace(/(?:^|\s)toggled(?!\S)/g,'');
  }
}
