import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlacesService } from 'src/app/shared/services/places.service';

@Component({
  selector: 'app-places-search-modal',
  templateUrl: './places-search-modal.component.html',
  styleUrls: ['./places-search-modal.component.scss'],
})
export class PlacesSearchModalComponent implements OnInit {
  @Input() type: string;
  placeInput = '';
  places: any = [];
  contentLoaded = true;

  constructor(
    private modalController: ModalController,
    private placesService: PlacesService
  ) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      type: this.type,
      place: {
        name: null,
      },
    });
  }

  dismissAndSendData(place: any) {
    this.modalController.dismiss({
      type: this.type,
      place,
    });
  }

  getPlaces() {
    if (this.placeInput.length > 2) {
      this.contentLoaded = false;
      this.placesService.searchByName(this.placeInput).subscribe(
        (data) => {
          this.places = data;
          this.contentLoaded = true;
        },
        (error) => {
          this.contentLoaded = true;
          this.places = [];
        }
      );
    } else {
      this.contentLoaded = true;
      this.places = [];
    }
  }
}
