import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { APP_BASE_HREF, DatePipe, DecimalPipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
  NgxUiLoaderRouterModule,
  NgxUiLoaderHttpModule
} from 'ngx-ui-loader';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginClienteComponent } from './pages/login-cliente/login-cliente.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from "@angular/fire";
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DeviceDetectorService } from "ngx-device-detector";
import { DragScrollModule } from 'ngx-drag-scroll';
import { NgxAnimationsModule } from "ngx-animations";
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { InicioComponent } from './pages/inicio/inicio.component'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { LettersOnlyDirective } from "./directives/letters-only.directive";
import { NumbersOnlyDirective } from "./directives/numbers-only.directive";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import {Ng2TelInputModule} from 'ng2-tel-input';

import {
  DateAdapter,

} from '@angular/material/core';
import { DetalleProductoComponent } from "./components/detalle-producto/detalle-producto.component";

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
const ngxUiLoaderConfig: NgxUiLoaderConfig =
{
  "bgsColor": "#70c9c0",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#b050df",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "ball-scale-multiple",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 650,
  "logoUrl": "assets/halloween2.jpeg",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgb(0,0,0)",
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
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    DragScrollModule,
    TranslateModule.forRoot(),
    NgxAnimationsModule,
    MatDialogModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule, // import this module for showing loader automatically when navigating between app routes
    NgxUiLoaderHttpModule,
    NgxMaskModule.forRoot(),
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    Ng2TelInputModule 

  ],
  entryComponents: [DetalleProductoComponent],
  declarations: [AppComponent, DetalleProductoComponent, AdminLayoutComponent, LoginClienteComponent, InicioComponent, NumbersOnlyDirective, LettersOnlyDirective],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }, DatePipe, {
    provide: DeviceDetectorService,
  },
    DecimalPipe,

  { provide: MAT_DATE_LOCALE, useValue: 'es' },
  { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },


  { provide: LocationStrategy, useClass: HashLocationStrategy },

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [NgxUiLoaderModule,
    NgxUiLoaderRouterModule, // import this module for showing loader automatically when navigating between app routes
    NgxUiLoaderHttpModule],


  bootstrap: [AppComponent]
})
export class AppModule { }
