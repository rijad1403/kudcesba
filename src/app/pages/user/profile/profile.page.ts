import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
}
