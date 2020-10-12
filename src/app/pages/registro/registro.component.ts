import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from "../../models/usuario.model";
import { NgForm } from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.usuario.email = 'jesusfer80@gmail.com';
    this.usuario.password = '19711996';
    this.usuario.nombre = 'Jesus Fernandez';
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.auth.nuevoUsuario(this.usuario).subscribe(respuesta => {
      console.log(respuesta['id_token']);
    }, (err) => console.log(err.error.error.message));
  }

}
