import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PersonalInfoModalComponent } from '../partials/personal-info-modal/personal-info-modal.component';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

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
