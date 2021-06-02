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
        header: 'Kudćeš.ba',
        pages: [
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
        ],
      },
      {
        header: 'Sigurnost',
        pages: [
          {
            title: 'Privatnost podataka',
            link: 'privacy-policy',
          },
          {
            title: 'Tačnost podataka',
            link: 'data-validation',
          },
        ],
      },
      {
        header: 'Podrška korisnicima',
        pages: [
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
        ],
      },
    ];
  }
}
