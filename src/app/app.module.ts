import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//import Angular animations (for cardflip)
import { NgModule } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.css';
import fontawesome from '@fortawesome/fontawesome-free';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { AuthService } from './services/auth.service';
import { OnlyLoggedInUsersGuardGuard } from './services/only-logged-in-users-guard.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  
import { CardsComponent } from './cards/cards.component'

import { CardsService } from './services/cards.service';
import { AddCardComponent } from './components/add-card/add-card.component';
import { LoginComponent } from './components/login/login.component';

import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { DeckComponent } from './cards/deck/deck.component';
import { AddDeckComponent } from './components/add-deck/add-deck.component';

const appRoutes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'about_us', component: AboutUsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'deck',
  component: CardsComponent,
  canActivate: [OnlyLoggedInUsersGuardGuard] 
},
{ path: 'cards',
  component: DeckComponent,
  canActivate: [OnlyLoggedInUsersGuardGuard] 
}
];

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    AddCardComponent,
    LoginComponent,
    AboutUsComponent,
    DeckComponent,
    AddDeckComponent,
    ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase/*, 'Test Project'*/),//import test project database
    RouterModule.forRoot(appRoutes),    
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,//module for login later
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [CardsService, AuthService, OnlyLoggedInUsersGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*TODO
routesDONE (guard?)
edit/create deck module
login & authentication (name + email)DONE
finalize css (mobile?  prob not)
list available decks
*/
