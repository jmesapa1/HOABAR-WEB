import { Routes } from "@angular/router";
import { CartaComponent } from 'src/app/pages/carta/carta.component';
import { SolicitarMusicaComponent } from 'src/app/pages/solicitar-musica/solicitar-musica.component';

import { VotacionesGuard } from "src/app/guards/votaciones.guard";
import { ClienteGuard } from "src/app/guards/cliente.guard";

export const AdminLayoutRoutes: Routes = [
  {path:'carta',component:CartaComponent},
  { 
  path: "tu-musica", 
  component: SolicitarMusicaComponent ,
  canActivate: [ClienteGuard],

}

];
