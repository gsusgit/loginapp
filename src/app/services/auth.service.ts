import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsuarioModel} from "../models/usuario.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private api_key = 'AIzaSyB72lc9GFkA2ZVAJV8TCoJGTxBVaSk3HXY';

  constructor(private http: HttpClient) { }

  logOut() {

  }

  logIn(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    }
    this.http.post(`${this.url}signInWithPassword?key=${this.api_key}`, authData);
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    }
    return this.http.post(`${this.url}signUp?key=${this.api_key}`, authData);
  }

}
