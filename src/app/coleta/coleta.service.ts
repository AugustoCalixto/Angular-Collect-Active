import { Injectable } from '@angular/core';
import { Coleta } from './coleta';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { SuccessModalComponent } from '../success-modal/success-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ColetaService {
  dialogRef = this.dialog;
  constructor(private db: AngularFireDatabase, private HttpClient: HttpClient, public dialog: MatDialog) { }

  insert(coleta: Coleta) {
    this.db.list('coleta').push(coleta)
      .then((result: any) => {
        this.dialog.open(SuccessModalComponent, {
          width: '250px',
          data: {titulo: "Coleta", texto: "Muito obrigado por contribuir com o meio ambiente, o planeta agradece!"}
        });
      })
  }

  update(coleta: Coleta, key: string) {
    this.db.list('coleta').update(key, coleta)
      .then((result: any) => {
        console.log(result.key);
      }).catch((error: any) => {
        console.log(error);
      })
  }

  getAll() {

  }

  delete(key: string) {
    this.db.object(`contato/${key}`).remove();
  }

  async getGeolocation() {
    const uri = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Rua+Coronel+Calhau+362&key=${(environment.firebase.apiKey)}`
    let geocode: any;
    await this.HttpClient.get(uri).toPromise().then((data: any) => {
      geocode = data.results[0].geometry.location;
    })
    return geocode;
  }
}
