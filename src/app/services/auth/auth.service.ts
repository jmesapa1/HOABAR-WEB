import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public DOCS=[]
  
  constructor(private firestore: AngularFirestore,private router:Router,  public afAuth: AngularFireAuth
    ) { 

  }

  
  buscarCliente( celular) :Observable<QuerySnapshot<unknown>>{
    return this.firestore.collection("bar").doc("hoa").collection("users", ref => ref.where('celular', '==', celular)).get()
  }
  buscarClientePorId(){
   return  this.firestore.collection("bar").doc("hoa").collection("users").get()
  }

  guardarUsuario(nombre,correo, celular,nacimiento, genero,id) {
    return this.firestore.collection("bar").doc("hoa").collection("users").doc(id).set({celular:celular,nombre:nombre,correo:correo,genero:genero,nacimiento:nacimiento}).then(function(docRef) {
      
    })
  }
  guardarUsuarioFacebook(data){
    return this.firestore.collection("bar").doc("hoa").collection("users").doc(localStorage.getItem("idUserHoa")).collection("facebook").add(data).then(function(docRef) {
      
    })
  }

}
