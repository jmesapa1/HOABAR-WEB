import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Properties } from 'src/app/Properties';

@Injectable({
  providedIn: 'root'
})
export class VotacionesService {

ESTADOVOTACIONES

  constructor(private firestore: AngularFirestore,private router:Router,private http:HttpClient) {  
    
}

obtenerEstadoVotacion(){
 this.firestore.collection("Servicio").doc("votaciones").valueChanges().subscribe((resp:any)=>{
  console.log(resp)
  this.ESTADOVOTACIONES=resp.activo
  
})
}

enviarCancionesElegidas(canciones):Observable<any>{
 return this.http.post(Properties.URL+"/agregarcancionescliente",canciones)
}
}
