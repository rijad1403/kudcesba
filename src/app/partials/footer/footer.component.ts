import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footerPages = [];

  constructor() {}

  ngOnInit() {
    this.footerPages = [
      {
        title: 'O nama',
        link: 'o-nama',
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
        link: 'privacy-policy',
      },
      {
        title: 'Kako postaviti oglas',
        link: 'new-advertisement-help',
      },
      {
        title: 'Kako brzo pronaći vožnju',
        link: 'find-drive-help',
      },
      {
        title: 'Blog',
        link: 'blog',
      },
    ];
  }
}
