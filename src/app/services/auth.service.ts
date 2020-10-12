import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UsuarioModel } from "../models/usuario.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private api_key = 'AIzaSyB72lc9GFkA2ZVAJV8TCoJGTxBVaSk3HXY';

  userToken: string;

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logOut() {
    localStorage.removeItem('token');
  }

  logIn(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    }
    return this.http.post(`${this.url}signInWithPassword?key=${this.api_key}`, authData).pipe(
        map(respuesta => {
          this.guardarToken(respuesta['idToken']);
          return respuesta;
        })
    );
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    }
    return this.http.post(`${this.url}signUp?key=${this.api_key}`, authData).pipe(
        map(respuesta => {
          this.guardarToken(respuesta['idToken']);
          return respuesta;
        })
    );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let ahora = new Date();
    ahora.setSeconds(60);
    localStorage.setItem('expirationDate', ahora.getTime().toString());
  }

  private leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado(): boolean {
    if (this.userToken.length < 2) {
      return false;
    } else {
      const ahora = Number(new Date().getTime().toString());
      const expirationDate = Number(localStorage.getItem('expirationDate'));
      if (expirationDate > ahora) {
        return true;
      } else {
        return false;
      }
    }
  }

}
