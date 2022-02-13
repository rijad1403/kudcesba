import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footerLinks = [];

  constructor() {}

  ngOnInit() {
    this.footerLinks = [
      {
        title: 'O nama',
        link: 'about',
      },
      {
        title: 'FAQ',
        link: 'faq',
      },
      {
        title: 'Kontakt',
        link: 'contact',
      },
      {
        title: 'Privatnost podataka',
        link: 'privacy-data',
      },
      {
        title: 'Tačnost podataka',
        link: 'data-validation',
      },
      {
        title: 'Kako postaviti oglas',
        link: 'new-ride-help',
      },
      {
        title: 'Kako brzo pronaći vožnju',
        link: 'find-ride-help',
      },
      {
        title: 'Blog',
        link: 'blog',
      },
    ];
  }
}
