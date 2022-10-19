import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { SpotifyService } from '../spotify/spotify.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
 id_generate
  constructor(private http:HttpClient,private firestore: AngularFirestore) { }
  obtenerEstadoVotaciones(){
    return this.firestore.collection('Servicio').doc("votaciones").get()
  }

  obtenerEstadoReproduccionClientes(){
    return this.firestore.collection("Servicio").doc("reproduccion_clientes").get()
  }

  obtenerCancionesElegidasClientes(id){
    return this.firestore.collection("Canciones_clientes").doc(id).get()
  }

  obtenerColeccionCanciones() {
  return  this.firestore.collection("Canciones_clientes").get()
  }

  activarVotaciones(duracion,fecha_inicio){
    return  this.firestore.collection("Servicio").doc("votaciones").set({activo:true,fecha_inicio:fecha_inicio,duracion:duracion})
  }
  desactivarVotaciones(){
   return this.firestore.collection("Servicio").doc("votaciones").set({activo:false,fecha_inicio:0,duracion:0})
 }
  guardarVotaciones(array,id){
    return this.firestore.collection("Canciones_clientes").doc(id+"").set({canciones:array})
 }
 iniciarConteo(duracion,fecha_inicio){
  return this.firestore.collection("Servicio").doc("votaciones").set({activo:true,duracion:duracion,fecha_inicio:fecha_inicio})
 }

cancelarVotacion(){
  return this.firestore.collection("Servicio").doc("votaciones").set({activo:false,fecha_inicio:0,duracion:0})
}
almacenarInformacionCancionSonando(data){
  return this.firestore.collection("reproductor").doc("reproductor_principal").set(data)
}
almacenarListaReproduccion(data){
  console.log(data)
  return this.firestore.collection("lista_reproduccion").doc("principal").set(data)
}
almacenarListaCancionesVotacion(data){
  console.log(data)
  return this.firestore.collection("lista_reproduccion").doc("votaciones").set(data)
}
liberarVotacionMesa(mesa):Promise<any>{
  return this.firestore.collection("mesas").doc(mesa.mesa).collection("votacion").doc("1").set({estado_votacion:false})
}
obtenerEstadoVotacionMesa(mesa){

  return this.firestore.collection("mesas").doc(mesa).collection("votacion").doc("1").get()
}

obtenerEstadoServicio(){
  return this.firestore.collection('bar').doc("hoa").collection("modo").doc("dj").snapshotChanges()

}
}
