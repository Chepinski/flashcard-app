import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { Card } from '../models/Card';
import { AuthService } from '../services/auth.service';
import { Router, Params } from '@angular/router';

@Component({//card flip animation
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  decks:Card[];
  router: Router;
  teach:boolean;


  constructor(private cardService: CardsService, private authService:AuthService, router:Router) {
    this.router = router;
  }//pass in cardService from services folder

  ngOnInit() {
    this.cardService.getDeck().subscribe(decks =>{
      this.decks = decks;//make a place in array for each deck
    });
  }

  findDeck(loc){//show deck once chosen
    this.authService.setDeck(this.decks[loc].id);
    this.router.navigate(['/cards']);
  }

  isTeach():boolean{//confirm if authorized to edit
    this.teach = this.authService.instr;
    return this.teach;
  }

  deleteDeck(loc){//delete card in deck
    this.cardService.deleteDeck(this.decks[loc]);
  }

  tryLogout(){//logout
    this.authService.doLogout();    
  }
}
