import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRideSearchFormData } from '../../shared/models/ride/ride-search-form-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  reasonsTexts = [];

  constructor(private router: Router) {
    this.reasonsTexts = [
      {
        heading: 'Pronađite vožnju',
        body: 'Unesite odakle, kada i gdje želite putovati i odaberite za Vas interesantnu vožnju',
        icon: 'Search-outline',
      },
      {
        heading: 'Ugovorite vožnju',
        body: 'Ako vozač Vas prihvati i Vama se svidi ugovorite vožnju.',
        icon: 'people-outline',
      },
      {
        heading: 'Sretan put',
        body: 'Dođite na ugovoreno mjesto i vrijeme i uživajte u vožnji.',
        icon: 'car-outline',
      },
    ];
  }

  ngOnInit() {}

  onRideSearchFormSubmitted(data: IRideSearchFormData) {
    this.router.navigate(['ride-search'], {
      queryParams: {
        origin: data.origin,
        destination: data.destination,
        date: data.date,
      },
    });
  }
}
