import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-places-search-modal',
  templateUrl: './places-search-modal.component.html',
  styleUrls: ['./places-search-modal.component.scss'],
})
export class PlacesSearchModalComponent implements OnInit {
  @Input() type: string;
  place: '';

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      type: this.type,
      place: null,
    });
  }

  dismissAndSendData() {
    this.modalController.dismiss({
      type: this.type,
      place: this.place,
    });
  }
}
