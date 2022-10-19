import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  obtenerTokenUrl() {
    try {
      let urlAux = []
      let url = window.location.href
      urlAux = url.split("#", 2)
      url = urlAux[1]
      urlAux = url.split("=", 2)
      url = urlAux[1]
      urlAux = url.split("&", 2)
      let token = urlAux[0]
      localStorage.setItem("tokenHoaSpotify", token)
      
      return token;
    } catch {
      return null
    }
  }
}
