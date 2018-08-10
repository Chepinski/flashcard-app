import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, interval } from 'rxjs';
import { Card } from '../models/card';
import { Doc } from '../models/doc';
import { map } from 'rxjs/operators';//why is this not included in rxjs?  just to make things difficult?
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService
{
  cardsCollection: AngularFirestoreCollection < Card > ; //firestore entire collection 'deck'
  xcollection: AngularFirestoreCollection < Card > ;
  cards: Observable < Card[] > ;
  xcards: Observable < Card[] > ;
  cardDoc: AngularFirestoreDocument < Card > ; //firestore document

  constructor(public afs: AngularFirestore, private authService: AuthService)
  {
    this.cardsCollection = this.afs.collection('test');
    //map observable firebase db collection into Card array
    this.cards = this.cardsCollection.snapshotChanges().pipe(map(changes => changes.map(a =>
    {
      const data = a.payload.doc.data() as Card;
      data.id = a.payload.doc.id;
      return data; 
    })))

  }

  getDeck()//subscribe to deck in db chosen by user
  {
    this.cardsCollection = this.afs.collection('test');
    this.cards = this.cardsCollection.snapshotChanges().pipe(map(changes => changes.map(a =>
    {
      const data = a.payload.doc.data() as Card;
      data.id = a.payload.doc.id;
      return data; //map observable firebase db collection into Card array
    })))
    return this.cards;
  }

  getCards()//subscribe to flashcards in db
  {
    this.xcollection = this.cardsCollection.doc(this.authService.deck).collection('subject');
    this.xcards = this.xcollection.snapshotChanges().pipe(map(changes => changes.map(a =>
    {
      const data = a.payload.doc.data() as Card;
      data.id = a.payload.doc.id;
      return data;
    })))
    return this.xcards;
  }

  addCard(card: Card)//add card to deck
  {
    this.xcollection.add(card);
  }

  addDeck(deck: Doc, card: Card)//add deck to db
  {
    this.cardsCollection.doc(deck.subject).collection('subject').add(card);
  }

  isInstr(): boolean//is login for instructor?
  {
    return this.authService.instr;
  }

  deleteCard(card: Card)//delete card in deck
  {
    this.cardDoc = this.afs.doc('test/' + this.authService.deck + '/subject/' + card.id); //get path to doc ID
    this.cardDoc.delete();
  }

  deleteDeck(loc)//delete deck in db
  {
    console.log('in deleteDeck in service: ' + loc.id);
    this.cardDoc = this.afs.doc('test/' + loc.id);
    this.cardDoc.delete();
  }
}