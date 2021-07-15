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
  placesLoading: boolean;

  constructor(
    private modalController: ModalController,
    private placesService: PlacesService
  ) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      type: this.type,
      place: null,
    });
  }

  dismissAndSendData(placeName: string) {
    this.modalController.dismiss({
      type: this.type,
      place: placeName,
    });
  }

  getPlaces() {
    console.log(this.placeInput);
    if (this.placeInput.length > 2) {
      this.placesLoading = true;
      this.placesService.searchByName(this.placeInput).subscribe(
        (data) => {
          setTimeout(() => {
            this.places = data;
            this.placesLoading = false;
          }, 300);
        },
        (error) => {
          this.placesLoading = false;
          this.places = [];
        }
      );
    } else {
      this.placesLoading = false;
      this.places = [];
    }
  }
}
