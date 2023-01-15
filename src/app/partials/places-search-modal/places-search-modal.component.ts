import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlaceType } from 'src/app/shared/models/ride/place';
import { PlacesService } from 'src/app/shared/services/places.service';

@Component({
  selector: 'app-places-search-modal',
  templateUrl: './places-search-modal.component.html',
  styleUrls: ['./places-search-modal.component.scss'],
})
export class PlacesSearchModalComponent implements OnInit {
  @Input() placeType: PlaceType;
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
      place: {
        name: null,
      },
    });
  }

  dismissAndSendData(place: any) {
    this.modalController.dismiss({
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
