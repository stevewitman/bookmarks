[BACK to Intro to Angular](https://github.com/stevewitman/bookmarks/blob/master/INTRO.md)

# Start the Bookmark Project

Create a new project (call it whatever you want)

```
ng new bookmarks
```

Change into that directory

```
cd bookmarks
```

```
ng serve
```

Open in a browser

```
http://localhost:4200
```

## Add Bootstrap

Add jQuery, Bootstrap using NPM

```
npm install --save jquery bootstrap 
```

Add this style to "styles": ["styles.css"] in `.angular-cli.json`


```
"styles": [
    "styles.css",
    "../node_modules/bootstrap/dist/css/bootstrap.min.css"
],
```

Add these scripts to "scripts": [] in `.angular-cli.json`

```
"scripts": [
    "../node_modules/jquery/dist/jquery.js",
    "../node_modules/bootstrap/dist/js/bootstrap.min.js"
],
```

Restart dev server! (the dev server does not watch for changes in `.angular-cli.json`)

```
ng s
```

## Generate components

First lets generate a component called `navbar`

```
ng g c navbar
```

Add this component to `app.component.html`

```
<app-navbar></app-navbar>
```

Change the html in the template `navbar.component.html`

```
<nav class="navbar navbar-inverse navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Sign In</a>
    </div>
    <div id="navbar" class="navbar-collapse collapse">
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Add Link</a></li>
      </ul>
    </div>
  </div>
</nav>
```

Generate another component called `home`

```
ng g c home
```

Add this component to `app.component.html`

```
<app-home></app-home>
```

You can't see the paragraph "home works!" because it is behind the navbar right now. Lets fix that by adding a global style to `styles.css`

```
body {
    padding-top: 50px;
}
```

In the HomeComponent class define an array of bookmark objects, each with a name and a url property in `home.component.ts`

```
bookmarks = [
    {name: 'Angular', url: 'https://angular.io/'},
    {name: 'Angular Style Guide', url: 'https://angular.io/docs/ts/latest/guide/style-guide.html'},
    {name: 'ngDoc', url: 'http://ngdoc.io/'},
    {name: 'Firebase', url: 'https://firebase.com'},
    {name: 'Bootstrap', url: 'https://getbootstrap.com'},
]
```

Use ngFor to display each these bookmarks in `home.component.html`

```
<div *ngFor="let bookmark of bookmarks">
  <a href="{{bookmark.url}}">{{ bookmark.name }}</a>
</div>
```

In the `app.component.html`, wrap the app-home component with a div with class main-content.

```
<app-navbar></app-navbar>
<div class="main-content">
  <app-home></app-home>
</div>
```

Define this style in `app.component.css`

```
.main-content {
    padding: 15px;
}
```

## Use a separate component for each bookmark

Use the CLI to generate a bookmark component

```
ng g c bookmark
```

We will use this component as a child component in the home component.  In `home.component.html`, replace

```
<a href="{{bookmark.url}}">{{ bookmark.name }}</a>
```

with ...

```
<app-bookmark></app-bookmark>
```

Here we need to pass the bookmark name and url properties to the bookmark component.  

```
<app-bookmark [bookmarkName]="bookmark.name" [bookmarkUrl]="bookmark.url"></app-bookmark>
```

In `bookmarks.component.ts`, import Input from @angular/core

```
import { Component, OnInit, Input } from '@angular/core';
```

Use `@Input()` to get bookmarkName and bookmarkUrl values.  Put this inside the 
```
@Input() bookmarkName;
@Input() bookmarkUrl;
```

In `bookmark.component.html` use the new properties created with the @Input functions

```
<a href="{{ bookmarkUrl }}">
  {{ bookmarkmName }}
</a>
```

Finally lets add a little styling to the bookmark component.

First, add a div with a class `bookmark` in `bookmark.component.html`

```
<a href="{{ bookmarkUrl }}">
  <div class="bookmark">
    {{ bookmarkName }}
  </div>
</a>
```

And define that class in `bookmark.component.css`

```
.bookmark {
    background-color: #EEE;
    font-size: 16px;
    padding: 5px 10px;
    margin: 5px;
    width: 300px;
    border: 1px solid black;
}
```

## Extract links to their own service

Generate a service called `bookmarks` in a folder called shared.

```
ng g s shared/bookmarks
```

Copy the bookmarks array from `bookmarks.component.ts` and paste it in the BookmarksService class in `bookmarks.service.ts`

```
bookmarks = [
    {name: 'Angular', url: 'https://angular.io/'},
    {name: 'Angular Style Guide', url: 'https://angular.io/docs/ts/latest/guide/style-guide.html'},
    {name: 'ngDoc', url: 'http://ngdoc.io/'},
    {name: 'Firebase', url: 'https://firebase.com'},
    {name: 'Bootstrap', url: 'https://getbootstrap.com'},
];
```

Remove the array of bookmarks from `bookmarks.component.ts` and just just declare `bookmarks` ...

```
bookmarks;
```

Back in `home.component.ts` lets import the service, inject it into the constructor and assign it to the bookmarks property in the OnInit() method

```
import { BookmarksService } from '../shared/bookmarks.service';
```

```
constructor(private _bookmarksService: BookmarksService) { }
```

```
ngOnInit() {
  this.bookmarks = this._bookmarksService.bookmarks;
}
```

If you look in the browser, in the console we can see an error telling use that there is still no provider for the BookmarksService.  Lets add that provider in `app.module.ts` by importing it and adding it to the providers array.

```
import { BookmarksService } from './shared/bookmarks.service';
```

```
providers: [BookmarksService],
```

Now you should see working links from data from the boookmarks service.

## Firebase

Sign up for a [Firebase](https://firebase.google.com/) account

Add a new project in Firebase (I called mine 'ablinks')

In the Firebase console change database rules from 

```
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

to ... and be sure to click PUBLISH

```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Install [angularfire2](https://github.com/angular/angularfire2) (Before you start installing AngularFire2, make sure you have latest version of angular-cli installed. See angularfire2 installation instructions.)

```
npm install --save angularfire2 firebase 
```

Open `/src/environments/environment.ts` and add your Firebase configuration:

```
export const environment = {
  production: false,
  firebase: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  }
};
```

Copy and replace the above `firebase` object from your Firebase project. 

Import AngularFireModule, AngularFireDatabaseModule, and environment in `app.module.ts`

```
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
```

Add these modules to the @NgModule imports array in `app.module.ts`

```
AngularFireModule.initializeApp(environment.firebase)
AngularFireDatabaseModule,
```

Import AngularFireDatabase in `bookmarks.service.ts`

```
import { AngularFireDatabase } from 'angularfire2/database';
```

Remove the hardcoded array of bookmarks and in it's place declare a variable called bookmarks (which will be a Firebase list object) in `bookmarks.service.ts`

```
bookmarks;
```

In the constructor inject the AngularFireDatabase object and set links to a Firebase list object from the bookmarks endpoint on the Firebase server. This will be listening to the list of bookmarks. `bookmarks.service.ts`

```
constructor(db: AngularFireDatabase) {
    this.bookmarks = db.list('/bookmarks');
}
```

Define a method called addBookmark() to push new links to the database and reset our local state. `bookmarks.service.ts`

```
addBookmark(name, url) {
    this.bookmarks.push({name: name.value, url: url.value})
    name.value = url.value = '';
}
```

Back in `home.compoment.html` add the async pipe to the ngFor

```
<div *ngFor="let bookmark of bookmarks | async">
```

Also at the end of `home.component.html` add some input fields to allow the user to add new bookmarks. 

```
<div>
  <input placeholder="name" #name>
  <input placeholder="url" #url>
  <button class="btn btn-primary" (click)="addBookmark(name, url)">Add Bookmark</button>
</div>
```

Note: the *async* pipe is actually creating a subscription only to that observable and only within the context of this component. So when this component is not instantiated, when it is not on the screen, for example if we on another route, it is automatically going dispose of and end that subscription so that we are not wasting resources in order to keep that alive.

Finally, add the addLink method to `home.component.ts` and have it call the addBookmark method from the bookmarks service

```
addBookmark(name, url) {
    this._bookmarksService.addBookmark(name, url);
}
```

Check it out in a couple different browser tabs!

[BACK to Intro to Angular](https://github.com/stevewitman/bookmarks/blob/master/INTRO.md)

## Routing

Eventually we will have two different pages of bookmarks, one that contains only bookmarks that you want to be public and another for all of your bookmarks (private and public) We will save Auth for the next section, for now lets set up routing to reach these two pages.  We will use the home component to display the public bookmarks and create a new `my-bookmarks` component for the private ones.

```
ng g c bookmarks
```

In the `app.module.ts` file, import routerModule and routes

```
import { RouterModule, Routes } from '@angular/router';
```

Also, in the `app.module.ts` file we will define our routes

```
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'bookmarks', component: BookmarksComponent},
];
```

and add to the imports array

```
RouterModule.forRoot(appRoutes)
```

Next, in the `app.component.html` we need to replace `<app-home></app-home>` with `<router-outlet></router-outlet>`

```
<app-navbar></app-navbar>
<div class="main-content">
  <router-outlet></router-outlet>
</div>
```

Now try these routes in the browser  `localhost:4200`, `localhost:4200/home`, and `localhost:4200/bookmarks`.  The first two routes takes you to the home component and that last one takes you to the bookmarks component.

TODO:

- copy functionality from home component to bookmarks component.
- remove the add bookmark form from the home component.
- set up auth to prevent unauthorized access to bookmarks component.



