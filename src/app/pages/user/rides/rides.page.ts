import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { IRide, RideType } from 'src/app/shared/models/ride/ride';
import { RideService } from 'src/app/shared/services/ride.service';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.page.html',
  styleUrls: ['./rides.page.scss'],
})
export class RidesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  contentLoaded: boolean;
  rides: IRide[] = [];
  rideType: RideType;
  pageNumber = 1;
  totalRidesCount: number;
  showInfiniteScroll: boolean;
  constructor(private rideService: RideService) {}

  ngOnInit() {
    this.contentLoaded = false;
    this.rideType = RideType.active;
    this.loadRides();
  }

  loadRides(event?) {
    this.rideService
      .getUserRides(this.rideType, this.pageNumber)
      .subscribe((response) => {
        this.rides = this.rides.concat(response.body);
        this.totalRidesCount = +response.headers.get(
          'x-pagination-total-count'
        );
        if (this.rides.length < this.totalRidesCount) {
          this.pageNumber++;
          this.showInfiniteScroll = true;
        } else {
          this.showInfiniteScroll = false;
        }
        this.contentLoaded = true;
        (event?.target as HTMLIonInfiniteScrollElement)?.complete();
      });
  }

  changeRideType(event: any) {
    this.rideType = event.detail.value as RideType;
    this.rides = [];
    this.pageNumber = 1;
    this.loadRides();
  }

  onScroll(event) {
    this.loadRides(event);
  }
}
