import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IRide } from '../../shared/models/ride/ride';
import { IRideSearchFormData } from '../../shared/models/ride/ride-search-form-data';
import { RideService } from '../../shared/services/ride.service';

@Component({
  selector: 'app-ride-search',
  templateUrl: './ride-search.page.html',
  styleUrls: ['./ride-search.page.scss'],
})
export class RideSearchPage implements OnInit {
  origin: string;
  destination: string;
  date: string;
  rides: IRide[];
  pageLoaded: boolean;
  contentLoaded: boolean;
  rideSearchFormData: IRideSearchFormData;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rideService: RideService
  ) {
    this.pageLoaded = false;
    this.contentLoaded = false;
  }

  ngOnInit() {
    this.pageLoaded = true;
    this.route.queryParams.subscribe((params) => {
      this.contentLoaded = false;
      this.origin = params.origin ?? null;
      this.destination = params.destination ?? null;
      this.date = params.date ?? null;
      this.rideSearchFormData = {
        origin: this.origin,
        destination: this.destination,
        date: this.date,
      };
      this.rideService
        .getAllWithFilters(this.origin, this.destination, this.date)
        .subscribe((data) => {
          this.rides = data.body;
          this.contentLoaded = true;
        });
    });
  }

  onRideSearchFormSubmitted(data) {
    this.router.navigate(['ride-search'], {
      queryParams: {
        origin: data.origin,
        destination: data.destination,
        date: data.date,
      },
    });
  }
}
