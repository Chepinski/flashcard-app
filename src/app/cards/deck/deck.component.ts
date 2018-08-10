import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { AuthService } from '../../services/auth.service';
import { Router, Params } from '@angular/router';
import { Card } from '../../models/Card';

import {//import support for card flipping animation
	trigger,
	state,
	style,
	animate,
	transition
} from '@angular/animations';

@Component({
	selector: 'app-deck',
	templateUrl: './deck.component.html',
	styleUrls: ['./deck.component.css'],
	animations:[
	trigger('flipAnimation', [
    state('front', style({
      transform:'rotateY(0deg)',
      visibility: 'visible',
    })),
    state('back', style({
      transform:'rotateY(180deg)',
      visibility: 'hidden',
    })),

    transition('front => back', animate('300ms ease-in')),//take 3ms to flip card
    ]),
	]
})
export class DeckComponent implements OnInit
{

  cards: Card[]; //array of cards/a deck
  index = 0; //initiate index 
  currentDeck: string;
  currentQuestion: string; //this.currentQuestion from cards/deck
  currentAnswer: string; //this.currentAnswer from cards/deck
  stateFront: string = 'front';stateBack: string = 'back'; //beginning states for flip transitions
  router: Router;
  teach: boolean;

  constructor(private cardService: CardsService, private authService: AuthService, router: Router)
  {
    this.router = router;
  }

  ngOnInit()
  {
    this.cardService.getCards().subscribe(cards =>
    {
      this.cards = cards; //make a place in array for each card in deck and place in cards[]
      if (cards.length > 0)
      {
        this.currentQuestion = this.cards[this.index].question; //populate currentQuestion binding with 0th question in cards array
        this.currentAnswer = this.cards[this.index].answer; //populate currentAnswer
        this.currentDeck = this.authService.deck; //current working deck in deck array
      }
    });

  }
  getQuestion()
  {
    this.currentQuestion = this.cards[this.index].question; //update question
  }

  getAnswer()
  {
    this.currentAnswer = this.cards[this.index].answer; //update answer
  }

  changeCardState() //update contents of card that is showing
  {
    this.stateFront = (this.stateFront == 'front' ? 'back' : 'front');
    this.stateBack = (this.stateBack == 'front' ? 'back' : 'front');
  }

  nextCard(id: string)
  {
    if (this.stateFront == 'back')
    { //flip card to answer on back
      this.changeCardState();
    }
    if (id == 'nxt_btn')//if next clicked
    {
      if (this.index < this.cards.length - 1)
      { //if additional cards exist, get next question & answer
        this.index++;
      }
      else
      {
        this.index = 0;
      }
      this.getQuestion();
      this.getAnswer();
    }
    else if (id == 'prev_btn')//if previous clicked
    {
      if (this.index > 0)
      {
        this.index--;
      }
      else
      {
        this.index = this.cards.length - 1;
      }
      this.getQuestion();
      this.getAnswer();
    }

    else
    {
      this.index = -1;
      this.nextCard('nxt_btn'); //recursively call next card      
    }
  }

  deleteCard(event)
  { //delete card in deck
    this.cardService.deleteCard(this.cards[this.index]);
    length -= 1;
    this.nextCard('nxt_btn');
  }

  isTeach(): boolean//is the user allowed to edit?
  {
    this.teach = this.authService.instr;
    return this.teach;
  }

}