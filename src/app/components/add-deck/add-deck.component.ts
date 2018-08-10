import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { Doc } from '../../models/doc';
import { Card } from '../../models/card';

@Component({
  selector: 'app-add-deck',
  templateUrl: './add-deck.component.html',
  styleUrls: ['./add-deck.component.css']
})
export class AddDeckComponent
{
  teach: boolean;
  doc: Doc = {
    subject: ''
  }

  card: Card = {
    question: '',
    answer: ''
  }

  constructor(private cardservice: CardsService)
  {}
  onSubmit()
  {
    if (this.doc.subject != '')
    { 
      this.cardservice.addDeck(this.doc, this.card);
      this.doc.subject = '';
    }
  }

  isTeach(): boolean
  {
    this.teach = this.cardservice.isInstr();
    return this.teach;
  }


}
