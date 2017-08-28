import { Component, OnInit } from '@angular/core';
import { BookmarksService } from '../shared/bookmarks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  bookmarks;

  constructor(private _bookmarksService: BookmarksService) { }

  ngOnInit() {
    this.bookmarks = this._bookmarksService.bookmarks;
  }

  addBookmark(name, url) {
    this._bookmarksService.addBookmark(name, url);
  }

  

}
