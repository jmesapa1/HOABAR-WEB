import { VotacionesService } from "../../services/votaciones/votaciones.service";
import { Router } from "@angular/router";
import { ClienteService } from "../../services/cliente/cliente.service";
import { SpotifyService } from "../../services/spotify/spotify.service";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { HttpClient } from "@angular/common/http";
import { DeviceDetectorService } from 'ngx-device-detector';
import { AlertService } from "src/app/services/alert/alert.service";
import { Properties } from "src/app/Properties";
import Swal from "sweetalert2";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxUiLoaderService } from "ngx-ui-loader";
import firebase from "firebase/app";
import { AdminService } from "src/app/services/admin/admin.service";
import { threadId } from "worker_threads";

@Component({
  selector: "app-musica",
  templateUrl: "solicitar-musica.component.html",
})
export class SolicitarMusicaComponent implements OnInit {
  @ViewChild("modalAlerta", { static: false }) modalAlerta;
  @ViewChild("modalVotoReady", { static: false }) modalVotoReady;

  listaCanciones = [];
  listaCancionesSeleccionadas = [];
  modalRef: BsModalRef;
  contadorCanciones = 0;
  lista = []
  isMobile

  buscador
  cancion
  canciones = []
  form: FormGroup;

  cancionesElegidas = []

  reproductor
  animarModal = false
  analytics

  cancionesReciente = []
  progress = "50"
  constructor(

    private http: HttpClient,
    private deviceService: DeviceDetectorService,
    private alertService: AlertService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private ngxUiLoaderService: NgxUiLoaderService,
    private clienteService: ClienteService,
    private modalService: BsModalService,
    private firestoreService: AdminService

  ) {
    this.analytics = firebase.analytics();
    this.verHistorico()
    setTimeout(resp => {
      this.ngxUiLoaderService.stop()
    }, 3000)
    this.crearMensaje()
    //this.obtenerReproductor()
    this.obtenerActivarInactivarServicio()
    this.isMobile = this.deviceService.isMobile();
  }


  ngOnInit() {
    this.form = this._formBuilder.group({
      buscador: ['', [Validators.required]],
    });

    document.documentElement.style.setProperty('--loading-fill-from', "0%");
    
  }

  obtenerReproductor() {
    this.clienteService.obtenerReprductor().subscribe(resp => {
      console.log(resp)
      this.reproductor = [];
      resp.forEach((catData: any) => {
        this.reproductor.push({
          id: catData.payload.doc.id,
          uri: catData.payload.doc.data().uri,
          data: catData.payload.doc.data()
        });
      })
      this.reproductor[0].data.info = JSON.parse(this.reproductor[0].data.info)

      this.animarModal = true
      console.log(this.reproductor)
    })
  }

  crearMensaje() {

    Swal.fire(
      'Notificación',
      '<h3 style="font-weight:800;color:Black">Recuerda que tu selección puede ser atada a cambios</h3>',
      'info'
    );

  }

  buscarCancion() {
    this.ngxUiLoaderService.start()
    this.analytics.logEvent("buscar_cancion")
    //this.verHistorico()

    this.http.post(Properties.URL + "/obtenercancion", { texto: this.buscador }).subscribe((resp: any) => {
      this.canciones = []
      console.log(resp)
      if (resp.success) {
        resp.data.forEach(element => {
          let artistas = ""
          element.artistas.forEach(artista => {
            artistas = artistas + artista.name
            let iAux = 0
            if (element.artistas != 1 && iAux + 1 != element.artistas) {
              artistas = artistas + ", "
            }
          });
          element.artistas = artistas
          element.seleccionada = false
          this.canciones.push(element)
        });
        this.ngxUiLoaderService.stop()

        console.log(this.canciones)
      } else {
        this.ngxUiLoaderService.stop()
        this.alertService.crearMensaje("error", "Ocurro un error en el sistema")
        return
      }

    }, error => {
      this.ngxUiLoaderService.stop()

    })
  }

  seleccionarCancion(cancion) {
    console.log(cancion)

    if (!cancion.seleccionada && !this.buscarCancionSeleccionada(cancion)) {
      if (this.contadorCanciones < 5) {
        cancion.seleccionada = true
        cancion.imagen = cancion.imagen
        cancion.nombre = cancion.nombre
        cancion.uri = cancion.uri
        cancion.userId = localStorage.getItem("idUserHoa")

        this.cancionesElegidas.push(cancion)

        this.contadorCanciones++

        if (this.cancionesElegidas.length === 1) {
          console.log(this.cancionesElegidas[0])
          // window.scrollTo(0, document.body.scrollHeight);

          document.documentElement.style.setProperty('--loading-fill-from', this.cancionesElegidas[0].popularidad + "%");

        } else {
          let suma = 0
          this.cancionesElegidas.forEach(x => {
            suma = (Number(suma) + Number(x.popularidad))
          })
          console.log(suma)
          document.documentElement.style.setProperty('--loading-fill-from', (suma / this.cancionesElegidas.length) + "%");
        }

      } else {


      }

    } else {
      cancion.seleccionada = false
      let index = this.cancionesElegidas.findIndex(x => x.id === cancion.id)
      console.log(index)

      this.cancionesElegidas.splice(index, 1)

      /// this.cancionesElegidas=aux
      this.contadorCanciones--
      let suma = 0
      this.cancionesElegidas.forEach(x => {
        suma = (suma + x.popularidad)
      })
      console.log(suma)
      document.documentElement.style.setProperty('--loading-fill-from', (suma / this.cancionesElegidas.length) + "%");

    }

  }

  buscarCancionSeleccionada(cancion) {
    // console.log(cancion,this.cancionesElegidas)
    if (this.cancionesElegidas.find(x => x.id === cancion.id) != undefined) {
      return true;
    } else {
      return false
    }
  }

  medirSeleccion() {
    let suma = 0
    this.cancionesElegidas.forEach(x => {
      suma = (suma + x.popularidad)
    })
    suma = suma / this.cancionesElegidas.length
    if (suma === 0) {
      document.documentElement.style.setProperty('--fondocalculado2', "#d288d6");
      document.documentElement.style.setProperty('--fondocalculado', "rgb(190 124 186)");
      return "Sorprende a todos en HOA...🤝"
    }
    if (suma > 50 && suma <= 60) {
      document.documentElement.style.setProperty('--fondocalculado2', "rgb(190 124 186)");

      document.documentElement.style.setProperty('--fondocalculado', "#bd51fc");

      return "🤝Buena elección🤝"
    }
    if (suma > 60 && suma <= 70) {
      document.documentElement.style.setProperty('--fondocalculado2', "#ff00ce");
      document.documentElement.style.setProperty('--fondocalculado', "rgb(98 43 95)");

      return "🎵Adueñate del sonido!🎵"
    }
    if (suma > 70 && suma <= 80) {
      document.documentElement.style.setProperty('--fondocalculado2', "#fc51f5");
      document.documentElement.style.setProperty('--fondocalculado', "rgb(90 24 86)");

      return "❤️‍🔥 Ufff... envia eso ❤️‍🔥"
    }
    if (suma > 80 && suma <= 100) {
      document.documentElement.style.setProperty('--fondocalculado2', "#2dbdfa");
      document.documentElement.style.setProperty('--fondocalculado', "#f125e0");

      return "💥💥🎶Esto es un palo tras palo🎶💥💥💥"
    }
  }


  guardarCanciones() {
    this.ngxUiLoaderService.start()
    this.analytics.logEvent("solicitud_musica")

    this.http.post(Properties.URL + "/almacenarcanciones", { canciones: this.cancionesElegidas }).subscribe((resp: any) => {
      this.ngxUiLoaderService.stop()

      this.alertService.crearMensaje("success", "Su selección fue enviada exitosamente")
      this.canciones = []
      this.cancionesElegidas = []
      this.contadorCanciones = 0
      this.buscador = ""
      console.log(resp)
    }, error => {
      this.ngxUiLoaderService.stop()

    })

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  verHistorico() {
    this.clienteService.obtenerHistorico().subscribe(resp => {
      console.log("historico", resp)
      this.cancionesReciente = resp.data
    }, error => {
      this.ngxUiLoaderService.stop()

    })
  }

  cancionEnHistorico(cancion) {
    if (this.cancionesReciente.length != 0) {

      if (this.cancionesReciente.filter(x => x.data.id === cancion.id || x.data.nombre === cancion.nombre).length != 0) {
        return true

      } else {
        return false

      }

    } else {
      return false

    }
  }

  obtenerActivarInactivarServicio() {
    this.firestoreService.obtenerEstadoServicio().subscribe((servicio) => {
      let estadoServicio = servicio.payload.data().activo
      if (!estadoServicio) {
        this.alertService.crearMensaje("error","Tenemos un DJ rompiendola el día de hoy, por el momento este servicio esta deshabilitado")
        this.router.navigateByUrl("/inicio")
      }
    })
  }

}
