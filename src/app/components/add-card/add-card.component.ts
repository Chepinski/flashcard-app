import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { Card } from '../../models/card';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit
{ //initate blank card
  card: Card = {
    question: '',
    answer: ''
  }
  teach: boolean;//is this instructor login?

  constructor(private cardservice: CardsService)
  {}

  ngOnInit()
  {}

  onSubmit()
  {
    if (this.card.question != '' && this.card.answer != '')
    { //if neither field is left blank
      this.cardservice.addCard(this.card); //add card to deck
      this.card.question = ''; //clear fields
      this.card.answer = '';
    }
  }

  isTeach(): boolean//return if instructor logon or not
  {
    this.teach = this.cardservice.isInstr();
    return this.teach;
  }

}
