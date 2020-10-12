import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from "../../models/usuario.model";
import { NgForm } from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme: false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
      Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Log in',
          text: 'Cargando...'
      });
      Swal.showLoading();
    this.auth.nuevoUsuario(this.usuario).subscribe(respuesta => {
        Swal.close();
        this.router.navigateByUrl('/login');
        }, (err) =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.error.message
        })
    );
  }

}
