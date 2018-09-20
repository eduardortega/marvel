import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { Hero } from '../models/Hero';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  credentials = {
    publicApiKey: '07206c75f9d96e7d362e9b43bfcc4823',
    privateApikey: 'f0c28ef1e3989da8316e454df59fe6d7b19b162c'
  }

  constructor(private httpClient: HttpClient) { 

  }

  /**
   * get new md5 hash
   * @param date 
   */
  getMd5(date) {    
    return Md5.hashStr(date + this.credentials.privateApikey + this.credentials.publicApiKey).toString();
  }
  

  /**
   * generate common params
   */
  generateCommonParams() {
    let _date: string = new Date().getTime().toString();
    let p = new HttpParams().set('ts', _date)
                            .set('apikey', this.credentials.publicApiKey)
                            .set('hash', this.getMd5(_date));
    return p;
  }


  /**
   * get list of heroes
   * @param limit 
   * @param offset 
   * @param nameStartsWith
   */
  getHeroes(limit, offset, nameStartsWith): Observable<Hero[]> {
    let p = this.generateCommonParams();
    p = p.set('limit', limit)
    p = p.set('offset', offset);

    if(nameStartsWith) {
      p = p.set('nameStartsWith', nameStartsWith);
    }                        
    
    return this.httpClient.get<Hero[]>('http://gateway.marvel.com/v1/public/characters', { params: p } );
  }

  
  /**
   * ger list of heroes from an entity
   * @param entity 
   * @param id 
   */
  getHeroesFromEntity(entity: string, id: string) : Observable<Hero[]> {
    return this.httpClient.get<Hero[]>('http://gateway.marvel.com/v1/public/'+entity+'/'+id+'/characters', { params: this.generateCommonParams() } );
  }

}
