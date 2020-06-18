import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { auth } from 'firebase/app';
import { Cadastro } from '../cadastro';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb:FormBuilder, private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    })
  }

  createUser() {
    const {email, password } = this.registerForm.value;
    this.auth.createUserWithEmailAndPassword(email, password).then(user => {
      console.log(user)
    })
  }

}
