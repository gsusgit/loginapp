import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UsuarioModel} from "../../models/usuario.model";
import {AuthService} from "../../services/auth.service";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme: false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  login(form: NgForm) {
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
    this.auth.logIn(this.usuario).subscribe(respuesta => {
      Swal.close();
      this.router.navigateByUrl('/home');
        }, (err) =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.error.message
        })
    );
  }

}
