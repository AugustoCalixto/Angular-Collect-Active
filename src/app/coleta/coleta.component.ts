import { Component, OnInit, Inject } from '@angular/core';
import { Coleta } from './coleta';
import { ColetaService } from './coleta.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
@Component({
  selector: 'app-coleta',
  templateUrl: './coleta.component.html',
  styleUrls: ['./coleta.component.scss']
})
export class ColetaComponent implements OnInit {
  coleta: Coleta;
  key: string = '';
  
  coletaGroup: FormGroup;

  zoom: number = 14;
  city = {
    lat: -19.801765, lon: -41.714467
  }
  addressGeocode:any = {
    latitude: 19.801765,
    longitude: 19.801765
  };


  constructor(private coletaService: ColetaService, private auth: AngularFireAuth, private route: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.auth.onAuthStateChanged(user => {
      if (!user) {
        this.route.navigate(['login']);
      }
    })

    this.coletaGroup = this.fb.group({
      bairro: new FormControl('', Validators.required ),
      rua: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),

      papel: new FormControl('', ),
      plastico: new FormControl('', ),
      organico: new FormControl('', ),
      pilha: new FormControl('',),
    })

    this.coleta = new Coleta();
  }


  onSubmit() {
    this.coleta = this.coletaGroup.value;
    console.log(this.coleta)
    if (this.key) {

    } else {
      this.coletaService.insert(this.coleta);

      
    }

    this.coleta = new Coleta();
  }

}
