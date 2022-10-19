import { NgModule } from "@angular/core";
import { APP_BASE_HREF, CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginClienteComponent } from './pages/login-cliente/login-cliente.component';

import { LoggedInGuard } from "ngx-auth-firebaseui";
import { ClienteGuard } from "./guards/cliente.guard";
import { InicioComponent } from "./pages/inicio/inicio.component";

const routes: Routes = [

  {
    path: "landing",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      }
    ]
  },
  {
    path: "inicio",
    component: InicioComponent,
  },

  {
    path: "login",
    component: LoginClienteComponent,
  },
  {
    path: "",
    redirectTo: "inicio",
    pathMatch: 'full'
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
