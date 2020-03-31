import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  
  heroe = new HeroeModel();
  
  constructor(private HereosService: HeroesService) { }

  ngOnInit(): void {
  }
  
  guardar(form: NgForm) {
    if ( form.invalid ) {
      console.log('Formulario no valido');
      return;
    }

    if(this.heroe.id) {
      this.HereosService.actualizarHeroe(this.heroe)
      .subscribe( resp => {
        console.log(resp);
        this.Notificacion('success', 'Héroe actualizado');
      });
    } else {
      this.HereosService.crearHeroe(this.heroe)
      .subscribe( resp => {
        console.log(resp);
        this.Notificacion('success', 'Héroe creado');
      });
    }

  }

  Notificacion(tipo: any, mensaje: string) {
    Swal.fire({
      position: 'top-end',
      icon: tipo,
      title: mensaje,
      showConfirmButton: false,
      timer: 1500,
      toast: true
    });
  }

}
