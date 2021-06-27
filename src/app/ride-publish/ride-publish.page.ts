import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PlacesSearchModalComponent } from '../partials/places-search-modal/places-search-modal.component';

@Component({
  selector: 'app-ride-publish',
  templateUrl: './ride-publish.page.html',
  styleUrls: ['./ride-publish.page.scss'],
})
export class RidePublishPage implements OnInit {
  start = '';
  destination = '';
  newRideForm: FormGroup;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async presentModal(placeType: string) {
    const modal = await this.modalController.create({
      component: PlacesSearchModalComponent,
      componentProps: {
        type: placeType,
      },
    });
    await modal.present();
    const data = (await modal.onDidDismiss()).data;
    if (data.type === 'start' && data.place) {
      this.start = data.place;
    } else if (data.type === 'dest' && data.place) {
      this.destination = data.place;
    }
  }
}
