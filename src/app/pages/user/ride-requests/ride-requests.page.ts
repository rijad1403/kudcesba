import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import {
  IRideRequest,
  RideRequestType,
} from 'src/app/shared/models/ride-request/ride-request';
import { RideRequestService } from 'src/app/shared/services/ride-request.service';

@Component({
  selector: 'app-ride-requests',
  templateUrl: './ride-requests.page.html',
  styleUrls: ['./ride-requests.page.scss'],
})
export class RideRequestsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  contentLoaded: boolean;
  rideRequests: IRideRequest[] = [];
  rideRequestType: RideRequestType;
  pageNumber = 1;
  totalRideRequestsCount: number;
  showInfiniteScroll: boolean;
  user: any;
  constructor(private rideRequestService: RideRequestService) {}

  ngOnInit() {
    this.contentLoaded = false;
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.rideRequestType = RideRequestType.request;
    this.loadRideRequests();
  }

  loadRideRequests(event?) {
    this.rideRequestService.get(this.rideRequestType).subscribe((response) => {
      this.rideRequests = this.rideRequests.concat(response.body);
      this.totalRideRequestsCount = +response.headers.get(
        'x-pagination-total-count'
      );
      if (this.rideRequests.length < this.totalRideRequestsCount) {
        this.pageNumber++;
        this.showInfiniteScroll = true;
      } else {
        this.showInfiniteScroll = false;
      }
      this.contentLoaded = true;
      (event?.target as HTMLIonInfiniteScrollElement)?.complete();
    });
  }

  changeRideRequestType(event: any) {
    this.rideRequestType = event.detail.value as RideRequestType;
    this.rideRequests = [];
    this.pageNumber = 1;
    this.loadRideRequests();
  }

  onScroll(event) {
    this.loadRideRequests(event);
  }

  cancel(id: number) {
    this.rideRequestService.cancel(id).subscribe((value) => {
      if (value) {
        this.rideRequests.forEach((rideRequest) => {
          if (rideRequest.id == id) {
            rideRequest.status.id = 13;
          }
        });
      }
    });
  }

  reject(id: number) {
    this.rideRequestService.reject(id).subscribe((value) => {
      if (value) {
        this.rideRequests.forEach((rideRequest) => {
          if (rideRequest.id == id) {
            rideRequest.status.id = 11;
          }
        });
      }
    });
  }
}
