import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {
  coctel
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.coctel=data.coctel
    console.log(this.coctel)
  }

  ngOnInit(): void {
  }

}
