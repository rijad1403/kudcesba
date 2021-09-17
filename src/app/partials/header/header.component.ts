import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: any;
  loggedIn = false;

  constructor(
    private menu: MenuController,
    private router: Router,
    private loginService: LoginService
  ) {}
  ngOnInit() {
    this.loginService.onCheckLoggedIn().subscribe((data) => {
      this.loggedIn = data;
    });
  }

  async openMainMenu() {
    await this.menu.enable(true);
    await this.menu.open();
  }

  async closeMainMenu() {
    await this.menu.close();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.loginService.checkLoggedIn(false);
    this.router.navigate(['/']);
  }
}
