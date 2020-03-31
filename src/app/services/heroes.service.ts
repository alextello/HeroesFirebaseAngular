import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crudheroe-6f757.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearHeroe(heroe: HeroeModel) {
  return this.http.post(`${this.url}/heroes.json`, heroe)
  .pipe(
    map( (resp: any) => {
      heroe.id = resp.name;
      return heroe;
    })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {
    const hereoTemp = {
      ...heroe
    };
    delete hereoTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, hereoTemp);
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
    .pipe(
      map( this.crearArreglo )
    );
  }

  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  private crearArreglo(heroesObj: object) {
    const heroes: HeroeModel[]  = [];
    if ( heroesObj === null) {
      return [];
    }
    
    Object.keys(heroesObj).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });

    return heroes;
  }
}
