import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { RideService } from '../shared/services/ride.service';

@Component({
  selector: 'app-ride-share',
  templateUrl: './ride-share.page.html',
  styleUrls: ['./ride-share.page.scss'],
})
export class RideSharePage implements OnInit {
  start: string;
  destination: string;
  date: string;
  rides = [];
  contentLoaded = false;
  constructor(
    private route: ActivatedRoute,
    private rideService: RideService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((p) => {
      this.start = p.start;
      this.destination = p.destination;
      this.route.queryParams.subscribe((qp) => {
        this.date = qp.date;
        this.rideService
          .getAllWithFilters(
            20,
            1,
            'id',
            this.destination,
            this.start,
            this.date
          )
          .subscribe((data) => {
            this.rides = data;
            this.contentLoaded = true;
          });
      });
    });
  }
}
