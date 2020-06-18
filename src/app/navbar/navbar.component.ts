import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  sidebarActive = false;
  user: boolean;
  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.auth.authState.subscribe(res => {
      if (res && res.uid) {
        this.user = true;
      } else {
        this.user = false;
      }
    });
  }

  onLogout() {
    this.auth.signOut();
  }

  toggleSidenav() {
    this.sidebarActive = !this.sidebarActive;
  }
}
