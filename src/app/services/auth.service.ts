import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // for authentication

  isLoggined(){
   return !!localStorage.getItem("token")
  }
}
