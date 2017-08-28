import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { BookmarksService } from './shared/bookmarks.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BookmarkComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBoE63_A8EuiFhCx0Q_3WkNIe4iVqrun-w",
      authDomain: "ablinks-4e960.firebaseapp.com",
      databaseURL: "https://ablinks-4e960.firebaseio.com",
      projectId: "ablinks-4e960",
      storageBucket: "ablinks-4e960.appspot.com",
      messagingSenderId: "154062695240"
    }),
    AngularFireDatabaseModule,
  ],
  providers: [BookmarksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
