import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Properties } from 'src/app/Properties';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient,private firestore: AngularFirestore) { }

  obtenerCocteles():Observable<any>{
    return this.firestore.collection("cocteles").snapshotChanges()
  }
  obtenerReprductor():Observable<any>{
    return this.firestore.collection("bar").doc("hoa").collection("reproductor").snapshotChanges()
  }

  obtenerInfoUsuario(id):Observable<any>{
    return this.firestore.collection("bar").doc("hoa").collection("users").doc(id).get()
  }
  

  obtenerHistorico():Observable<any>{
   return this.http.get(Properties.URL+"/historico",{})
  }

  
  

}
