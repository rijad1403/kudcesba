import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  user: any;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log(this.user);
  }
}
