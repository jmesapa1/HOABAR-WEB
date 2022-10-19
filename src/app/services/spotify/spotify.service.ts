import { Properties } from './../../Properties';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  Client_ID: '171747e2cc4049caa4d96cb5b1e23d3c'
  Client_Secret: '6d5c53f83187435d9b9e5a2453e511fd'
  Base_url: "https://accounts.spotify.com/api/"
  constructor(private http: HttpClient,private db: AngularFireDatabase) {

  }

refrescarTokenSesion(token){
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("grant_type", "refresh_token");
urlencoded.append("code", token);
urlencoded.append("redirect_uri", "http://hoabar.s3-website.us-east-2.amazonaws.com/landing/admin");
urlencoded.append("client_secret", "6d5c53f83187435d9b9e5a2453e511fd");
urlencoded.append("client_id", "171747e2cc4049caa4d96cb5b1e23d3c");
urlencoded.append("refresh_token", "AQDXSmVopFQdOTsBkkOgwimrMHQjkNpml83j7t4jayrnVF8Ly_OUz-E339_-yPYmp0dISmIo3kzjk-73u6b-zhCUs4rkYpL9QnK5rUuYlfEd_FsrwmO5Ms_n07OgqRTv_IE");
urlencoded.append("response_type", "code");

return fetch("https://accounts.spotify.com/api/token", {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
})
  
  }

  obtenerToken(): Observable<any>{
    return this.db.list("object").snapshotChanges()
  }

  obtenerListaReproduccion():Observable<any>{
    let  headers = new HttpHeaders(
      {
        'Authorization': "Bearer "+localStorage.getItem("tokenHoaSpotify"),
      });
    return this.http.get("https://api.spotify.com/v1/playlists/4YrG525IHlwhhIh4JKZo7L/tracks?market=ES&limit=100&offset=5",{headers:headers})
  }

  
  obtenerListaReproduccionClientes():Observable<any>{
    let  headers = new HttpHeaders(
      {
        'Authorization': "Bearer "+localStorage.getItem("tokenHoa"),
      });
    return this.http.get("https://api.spotify.com/v1/playlists/1pO8YjPyei2mZZhycshOFN/tracks?market=ES",{headers:headers})
  }
  obtenerInformacionReproductor():Observable<any>{
    let token="Bearer "+localStorage.getItem("tokenHoaSpotify")

    let  headers = new HttpHeaders(
      {

        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": token,
      });
    
    
    
  return   this.http.get("https://api.spotify.com/v1/me/player?market=ES", {headers: headers })
}
obtenerInformacionReproductorClientes():Observable<any>{
  let token="Bearer "+localStorage.getItem("tokenHoa")

  let  headers = new HttpHeaders(
    {

      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": token,
    });
  
  
  
return   this.http.get("https://api.spotify.com/v1/me/player?market=ES", {headers: headers })
}

obtenerInformacionCancion(id):Observable<any>{
  let token="Bearer "+localStorage.getItem("tokenHoaSpotify")

  let  headers = new HttpHeaders(
    {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": token,
    });
  
  
  
return   this.http.get("	https://api.spotify.com/v1/tracks/"+id, {headers: headers })
}
guardarToken(token){
  this.db.object("/object").set({token:token})
}

obtenerDatosFirebase() :Observable<any>{
 return this.db.object("/mesas").valueChanges()

}

ingresarAcola(cancion){
  let token="Bearer "+localStorage.getItem("tokenHoaSpotify")
/*
  let  headers = new HttpHeaders(
    {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": token,
    });
  
  
  
return   this.http.post("	https://api.spotify.com//v1/me/player/queue?uri=spotify%3Atrack%"+cancion, {headers: headers })
*/
var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", token);


fetch("https://api.spotify.com/v1/me/player/queue?uri=spotify%3Atrack%3A"+cancion+"", {
  method: 'POST',
  headers: myHeaders,
  redirect: 'follow'
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
}