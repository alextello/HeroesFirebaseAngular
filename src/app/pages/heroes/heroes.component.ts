import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargando = true;
  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  this.heroesService.getHeroes().subscribe(resp => {
    this.heroes = resp;
    this.cargando = false;
  });
  }

  eliminarHeroe(heroe: HeroeModel, i: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro de querer borrar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then(resp => {
      if (resp.value) {
        this.heroesService.eliminarHeroe(heroe.id).subscribe();
        this.heroes.splice(i, 1);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Héroe eliminado',
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
      }
    });
  }

}
