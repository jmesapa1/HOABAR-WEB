import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  animarModal
  estadoServicio
  constructor(private ngxUiLoaderService: NgxUiLoaderService,private router:Router,private firestoreService:AdminService) {

 
  }


  ngOnInit(): void {
    this.obtenerActivarInactivarServicio()
    this.animarModal = true
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngAfterViewInit(): void {

  }

  scrollToTop() {
    let top = window.pageYOffset;
    if (top == 0) {
      let scroller = document.querySelector(".page-container");
      if (scroller)
        scroller.scrollTo(0, 0);
    }
    else {
      window.scrollTo(0, 0)
    }
  }

  irA(val){
    this.router.navigateByUrl(val)
    this.ngxUiLoaderService.start()

  }

  solicitarMusica(){
    this.router.navigateByUrl("landing/mi-musica")
  }

  obtenerActivarInactivarServicio() {
    this.firestoreService.obtenerEstadoServicio().subscribe((servicio) => {
      this. estadoServicio = servicio.payload.data().activo
    
    })
  }
}
