import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class BookmarksService {

  bookmarks;

  constructor(db: AngularFireDatabase) {
    this.bookmarks = db.list('/bookmarks');
  }

  addBookmark(name, url) {
    this.bookmarks.push({name: name.value, url: url.value})
    name.value = url.value = '';
  }

}
