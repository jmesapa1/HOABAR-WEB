import { AuthService } from './../../services/auth/auth.service';
import { ClienteService } from './../../services/cliente/cliente.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as Auth from "firebase/auth"
import * as Firebase from 'firebase';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
import firebase from "firebase/app";

defineLocale('de', deLocale);

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.scss']
})
export class LoginClienteComponent implements OnInit {
  @ViewChild("modalOtp", { static: false }) modalOtp;

  modalRef: BsModalRef;
  nombre = ""
  correo = ""
  celular = ""
  withCellPhoneForm: FormGroup;
  seleccionCelular = true
  seleccionFacebook = false
  otpEnviado = false
  usuarioNuevo = false
  recaptchaVerifier: Firebase.default.auth.RecaptchaVerifier
  existeCatcha = false
  i = 0
  bsConfig: Partial<BsDatepickerConfig>;
  locale = 'en';
  locales = listLocales();
  analytics: firebase.analytics.Analytics
  user
  animarModal = false

  codigoPais="+57"
  minDate=new Date()
  maxDate=new Date()
  constructor(private modalService: BsModalService, private ngxUiLoaderService: NgxUiLoaderService,
    private router: Router, private authService: AuthService, public afAuth: AngularFireAuth, private _formBuilder: FormBuilder, private alertService: AlertService,

  ) {
    this.analytics = firebase.analytics();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18)
    console.log(this.locales)
    this.bsConfig = Object.assign({}, { containerClass: "theme-dark-blue" });

    this.withCellPhoneForm = this._formBuilder.group({
      celular: ['', [Validators.required]],
      correo: ['', [Validators.email]],
      nombre: ['', []],
      nacimiento: ['', []],
      genero: ['', []],
      politica: [false, []]
    });
    setTimeout(resp => {
      this.ngxUiLoaderService.stop()

    }, 3000)

    try {
      if (localStorage.getItem("idUserHoa") != null) {
        this.navegarLista()
      }
    } catch (e) {
      console.log(e)
    }
  }
  FacebookAuth() {
    return this.AuthLogin(new Firebase.default.auth.FacebookAuthProvider());
  }



  AuthLoginCell() {
    this.ngxUiLoaderService.start()

    //window.prompt("Ingrese su código de validación");
    if (this.existeCatcha) {
      document.getElementById("sign-in-button").remove();
      let div = document.createElement('div');
      div.innerHTML = "<div id='sign-in-button'></div>";
      document.body.appendChild(div);
    } else {
      let div = document.createElement('div');
      div.innerHTML = "<div id='sign-in-button'></div>";
      document.body.appendChild(div);
    }
    setTimeout(r => {
      console.log(this.withCellPhoneForm.controls.celular.value)
      this.ngxUiLoaderService.start()
      this.afAuth.signInWithPhoneNumber(this.codigoPais + this.withCellPhoneForm.controls.celular.value, new Firebase.default.auth.RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': function (response) {
        }
      }))
        .then((confirmationResult) => {
          this.existeCatcha = true
          this.ngxUiLoaderService.stop()

          var code = window.prompt("Ingrese su código de validación");
          //this.openModal(this.modalOtp)
          return confirmationResult.confirm(code);
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          this.ngxUiLoaderService.stop()


          this.alertService.crearMensaje("error", "Código invalido, intentalo de nuevo")
          console.log(error)
        }).then((r: any) => {
          console.log(r)
          this.otpEnviado = true


          if (r != undefined) {
            this.usuarioNuevo = r.additionalUserInfo.isNewUser
            console.log(r.user.uid)
            this.user = r.user
            console.log(this.usuarioNuevo)
            if (this.usuarioNuevo) {
              this.agregarCampos()
            } else {
              let me = this
              this.ngxUiLoaderService.start()
              this.authService.buscarCliente(this.withCellPhoneForm.controls.celular.value).subscribe((resp: any) => {
                console.log(resp.docs)

                if (resp.docs.length != 0) {
                  localStorage.setItem("idUserHoa", r.user.uid)
                  this.ngxUiLoaderService.stop()

                  this.navegarLista()
                } else {
                  this.ngxUiLoaderService.stop()

                  console.log("agregara campos")
                  this.otpEnviado = true
                  this.usuarioNuevo = true
                  me.agregarCampos()
                }
              })
            }
          }


        }).catch(r => {
          console.log(r)
        });

    }, 200)

  }

  agregarCampos() {
    this.withCellPhoneForm.controls.celular.disable()

    this.withCellPhoneForm.setControl("correo", this._formBuilder.control('', [Validators.required, Validators.email]))
    this.withCellPhoneForm.setControl("nombre", this._formBuilder.control('', [Validators.required]))
    this.withCellPhoneForm.setControl("nacimiento", this._formBuilder.control('', [Validators.required]))
    this.withCellPhoneForm.setControl("politica", this._formBuilder.control('', [Validators.requiredTrue]))
  }
  eliminarCampos() {
    this.withCellPhoneForm.controls.celular.enable()

    this.withCellPhoneForm.setControl("correo", this._formBuilder.control('', [Validators.email]))
    this.withCellPhoneForm.setControl("nombre", this._formBuilder.control('', []))
    this.withCellPhoneForm.setControl("nacimiento", this._formBuilder.control('', [Validators.email]))
    this.withCellPhoneForm.setControl("genero", this._formBuilder.control('', []))
    this.withCellPhoneForm.setControl("politica", this._formBuilder.control('', [Validators.requiredTrue]))

  }


  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        console.log(result)
        this.guardarUsuarioConFacebook(result.additionalUserInfo)
        this.router.navigate(["landing/tu-musica"])

      }).catch((error) => {
        console.log(error)
      })
  }

  ngOnInit(): void {
    this.animarModal = true


  }




  navegarLista() {
    this.analytics.logEvent("Ingreso_sistema")
    this.router.navigate(["landing/tu-musica"])
  }

  printError(event) {
    console.error(event);
  }

  ingresar() {
    this.guardarUsuarioConCelular()
    this.router.navigate(["landing/tu-musica"])
  }
  guardarUsuarioConFacebook(data) {
    this.authService.guardarUsuarioFacebook(data).then(resp => {
      this.alertService.crearMensaje("success", "Usuario registrado")
    })
  }
  guardarUsuarioConCelular() {
    this.ngxUiLoaderService.start()
    var today = new Date(this.withCellPhoneForm.controls.nacimiento.value);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    let cumpleanos = dd +'/' +mm +   '/' + yyyy;
    this.authService.guardarUsuario(this.withCellPhoneForm.controls.nombre.value.toUpperCase(), this.withCellPhoneForm.controls.correo.value.toUpperCase(), this.withCellPhoneForm.controls.celular.value.toUpperCase(), cumpleanos, this.withCellPhoneForm.controls.genero.value.toUpperCase(), this.user.uid).then(resp => {
      this.ngxUiLoaderService.stop()

      this.alertService.crearMensaje("success", "Usuario registrado")
      localStorage.setItem("idUserHoa", this.user.uid)
      this.analytics.logEvent("Usuario_creado")
      this.navegarLista()
    }, error => {
      this.ngxUiLoaderService.start()
      this.alertService.crearMensaje("error", "Ocurrio un error, intentalo de nuevo")

    })

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  seleccionarCelular() {
    this.seleccionCelular = true
    this.seleccionFacebook = false
  }

  seleccionarFacebook() {
    this.seleccionCelular = false
    this.seleccionFacebook = true
  }

  cancelar() {
    this.eliminarCampos()
    this.otpEnviado = false
    this.seleccionCelular = false
    this.seleccionFacebook = false
  }
  verPolitica() {
    window.open("https://hoabar-doc.s3.us-east-2.amazonaws.com/Manual+de+Pol%C3%ADticas+de+tratamiento+de+Datos+Personales.pdf", "_blank")
  }

  onCountryChange(evt){
this.codigoPais="+"+evt.dialCode
  }
}
