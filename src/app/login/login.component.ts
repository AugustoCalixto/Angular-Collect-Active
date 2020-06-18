import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginGroup: FormGroup;

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private route: Router) { }

  ngOnInit(): void {
    this.auth.onAuthStateChanged(user => {
      if(user != null){
        this.route.navigate(['coleta']);
      }
    })

    this.loginGroup = this.fb.group({
      email: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.minLength(6))
    })
  }

  onLogin() {
    const { email, senha } = this.loginGroup.value;
    this.auth.signInWithEmailAndPassword(email, senha).then((user: any) => {
      console.log(user);
      this.route.navigate(['/coleta'])
    }).catch(error => { console.log(error) })
  }
}
