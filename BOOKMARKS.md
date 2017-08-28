
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
      <a class="navbar-brand" href="#">My Links</a>
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

copy the html for the bookmarks into `bookmark.component.html`

```
<a href="{{bookmark.url}}">{{ bookmark.name }}</a>
```

In `bookmarks.component.ts`, add `Input` to the imports from @angular/core

```
import { Component, OnInit, Input } from '@angular/core';
```

Use `@Input()` to get data from the parent component

```
@Input() bmName;
@Input() bmUrl;
```

 In the parent componet, `home.component.html`, in this case, we will loop through each bookmark and use the bookmark component to display them. We will use property binding to pass data to the bookmark component.

```
<app-bookmark [bmName]="bookmark.name" bmUurl]="bookmark.url"></app-bookmark>
```

Finally, in the `bookmark.component.html` use the new properties created with the @Input functions

```
<a href="{{bmUrl}}">{{ bmName }}</a>
```

