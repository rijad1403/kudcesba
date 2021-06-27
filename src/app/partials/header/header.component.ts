import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(private menu: MenuController) {}
  ngOnInit() {}

  openMainMenu() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.menu.enable(true, 'main-menu-auth');
      this.menu.open('main-menu-auth');
    } else {
      this.menu.enable(true, 'main-menu');
      this.menu.open('main-menu');
    }
  }

  closeMainMenu() {
    this.menu.close();
  }
}
