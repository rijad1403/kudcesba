import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  helpTexts = [];
  reasonsTexts = [];

  constructor() {}

  ngOnInit() {
    this.helpTexts = [
      {
        heading: 'Ideš nekamo?',
        body: 'Brzo ćeš pronaći ljude koji prolaze kraj tebe i putuju u tvom pravcu zato što imaš pristup milijunima putovanja.',
      },
      {
        heading: 'Poveži se s drugima',
        body: '  Upiši svoju točnu adresu kako bi pronašao savršen prijevoz. Odaberi s kim želiš putovati. I, rezerviraj!',
      },
      {
        heading: 'Pokret',
        body: 'Dođi točno tamo gdje želiš. Bez gnjavaže, bez redova i bez čekanja.',
      },
    ];

    this.reasonsTexts = [
      {
        heading: 'Ti biraš',
        body: 'Tisuće odredišta po odličnim cijenama.',
        icon: 'trail-sign-outline',
      },
      {
        heading: 'Sigurno dijeljenje prijevoza',
        body: 'Potvrda identiteta još je jedan postupak koji čini profile članova sigurnijima.',
        icon: 'document-lock-outline',
      },
      {
        heading: 'Ne gubi vrijeme',
        body: 'Ne trebaš ići na drugi kraj grada. Nađi prijevoz koji polazi u tvojoj blizini.',
        icon: 'location-outline',
      },
    ];
  }
}
