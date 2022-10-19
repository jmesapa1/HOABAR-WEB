import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SolicitarMusicaComponent } from 'src/app/pages/solicitar-musica/solicitar-musica.component';
import { CartaComponent } from 'src/app/pages/carta/carta.component';
import { DragScrollModule } from "ngx-drag-scroll";
import { NgxAnimationsModule } from "ngx-animations";
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from "ngx-ui-loader";
const ngxUiLoaderConfig : NgxUiLoaderConfig=
{
  "bgsColor": "#0b0a0a",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 5,
  "delay": 0,
  "fgsColor": "#b050df",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "ball-scale-multiple",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 130,
  "logoUrl": "assets/halloween.png",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(0,0,0,0.88)",
  "pbColor": "red",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": false,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    DragScrollModule,
    NgxAnimationsModule,
    PdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),

  ],
  declarations: [
    SolicitarMusicaComponent,
    CartaComponent,
    
  ]
})
export class AdminLayoutModule {}
