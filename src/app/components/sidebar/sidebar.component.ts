import { Component, OnInit, ViewChild } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "carta",
    title: "CARTA",
    rtlTitle: "لوحة القيادة",
    icon: "icon-paper",
    class: ""
  },
  {
    path: "tu-musica",
    title: "SOLICITA TU MÚSICA",
    rtlTitle: "الرموز",
    icon: "icon-headphones",
    class: "recordartorio"
  },


];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  animar = true
  show = true;

  constructor() {


  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);



    setInterval(r => {
      this.animar = true
      setTimeout(x => {
        this.animar = false
      }, 4000)
    }, 9000);



  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
