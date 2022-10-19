import { Component } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import Swal from "sweetalert2";
import { ClienteService } from "./services/cliente/cliente.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "black-dashboard-angular";
  constructor(private ngxUiLoaderService: NgxUiLoaderService,private clienteService:ClienteService){
  //  window.open("https://dqmsn4pjt5f88.cloudfront.net/","_self")
    this.ngxUiLoaderService.start()

    setTimeout(resp => {
      this.ngxUiLoaderService.stop()

    }, 5500)
    if(localStorage.getItem("idUserHoa")!=null && localStorage.getItem("idUserHoa")!=undefined ){
      this.clienteService.obtenerInfoUsuario(localStorage.getItem("idUserHoa")).subscribe(resp=>{
        let data=resp.data()

        Swal.fire(
          {
            title:data.nombre,
            text:'Bienvenido, que bueno tenerte de vuelta.',
            imageUrl:'assets/img/LOGO.png',
            imageHeight:200,
            imageWidth:200,
            confirmButtonText:'Aceptar',

             customClass: {
              title:'tituloAlerta',
              container:'containerAlerta',

              popup:'popupAlerta'
             }
            }
         /* 'Bienvenido',
          '<b>'+data.nombre+'</b> ' + '<h3 style="color:black;font-weight:800">que bueno tenerte de vuelta</h3>',
          'info',*/
          
        );
      })
    }
  }
}
