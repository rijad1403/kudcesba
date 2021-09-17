import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PersonalInfoModalComponent } from '../partials/personal-info-modal/personal-info-modal.component';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {
  currentUser: any;
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  async presentModal(input: string) {
    const modal = await this.modalController.create({
      component: PersonalInfoModalComponent,
      componentProps: {
        input,
      },
    });
    await modal.present();
  }
}
