import { ClienteService } from '../../services/cliente/cliente.service';
import { UtilsService } from '../../utils/utils.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { AngularFireDatabase } from '@angular/fire/database';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material/dialog';
import { DetalleProductoComponent } from 'src/app/components/detalle-producto/detalle-producto.component';

@Component({
  selector: "app-lista",
  templateUrl: "carta.component.html"
})
export class CartaComponent implements OnInit {

  name = 'Angular ';
  src = "https://jmesapa1.github.io/hoa-bar.github.io/assets/carta.pdf";


  cocteles
  closeResult: string;
  coctelSeleccionado
  animar = true
  animarModal = false

  reproductor = []

  constructor(private toastr: ToastrService, private clienteService: ClienteService, public dialog: MatDialog, private ngxUiLoaderService: NgxUiLoaderService
    , private modalService: NgbModal, private router: Router
  ) {
    setTimeout(resp => {
      this.ngxUiLoaderService.stop()

    }, 2000)

    //this.crearMensaje()
    this.obtenerReproductor()

    this.obtenerCocteles()
  }

  ngOnInit(): void {
  }

  obtenerCocteles() {
    this.clienteService.obtenerCocteles().subscribe(resp => {
      this.cocteles = [];
      resp.forEach((catData: any) => {
        this.cocteles.push({
          id: catData.payload.doc.id,
          data: catData.payload.doc.data()
        });
      })
      // this.animar=true
      console.log(this.cocteles)
    })
  }
  open(content, coctel) {
    this.coctelSeleccionado = coctel
    this.animarModal = true
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.animarModal = false

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  crearMensaje() {

    Swal.fire({
      imageUrl: 'https://hoabar-doc.s3.us-east-2.amazonaws.com/imagen.png',
      imageAlt: 'ERROR DE IMAGEN',
      backdrop: `
      rgba(0,0,123,0.4)
      url("/images/nyan-cat.gif")
      left top
      no-repeat
    `,
      background: 'rgb(24 18 18 / 2%) url(/images/shots.png)',
      confirmButtonText: 'Continuar',

    }).then(isConfirm => {

    })

  }
  obtenerReproductor() {
    this.clienteService.obtenerReprductor().subscribe(resp => {

      this.reproductor = [];
      resp.forEach((catData: any) => {

        this.reproductor.push(catData.payload.doc.data());
        console.log("REPRODUCTOR", this.reproductor[0])

      })

      this.animarModal = true
      console.log(this.reproductor)
    })
  }

  solicitarMusica() {
    this.router.navigateByUrl("landing/mi-musica")
  }

  openDialog(coctel) {
    const dialogRef = this.dialog.open(DetalleProductoComponent, {
      data: { coctel: coctel },
      height: '500px',
      width: '600px',



    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
