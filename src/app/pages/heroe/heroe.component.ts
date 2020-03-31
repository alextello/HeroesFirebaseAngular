import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


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

    Swal.fire({
      icon: 'info',
      title: 'Espere por favor...',
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    Swal.showLoading();
  
    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.HereosService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.HereosService.crearHeroe(this.heroe);
    }

    peticion.subscribe( resp => {
      Swal.close();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Héroe actualizado',
        showConfirmButton: false,
        timer: 1500,
        toast: true
      });
    });

  }

 

}
