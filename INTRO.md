# Intro to Angular 4

```
ng new intro-angular
```

Change into that directory

```
cd intro-angular
```

```
ng serve
```

```
http://localhost:4200
```

Look at file structure

Change some html in the `app.component.html`

```
<p>Here is some text</p>
```

Change title property in `app.component.ts`
```
// from
    title = 'app works!';
// to
    title = 'This app works!';
```

Add style to `styles.css`. These are global styles.

```
h1 {
    color: green;
}
```

Add style to `app.component.css`. Component Styles override global styles.

```
h1 {
    color: red;
}
```

## Add Bootstrap

Add jQuery, Bootstrap, and ngx-bootstrap using NPM

```
npm install jquery bootstrap ngx-bootstrap --save
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

## Property Binding

Add a property to `app.component.ts`

```
imageUrl = "http://lorempixel.com/400/200/"
```

Add image tag to the template `app.component.html` using interpolation (property binding)
```
<img src="{{ imageUrl }}">
```

Add image tag putting the DOM porperty in square brackets (also property binding)

```
<img [src]="imageUrl">
```

You can set the textContent property of the H1 DOM element using this [] syntax

```
<h1 [textContent]="title"></h1>
```

## Class Binding

Add a buttons to `app.component.html`

```
<button class="btn btn-primary">Submit</button>
```

Use class binding to add the "active" class to button when the isActive property is true

```
// change from 
    <button class="btn btn-primary">Submit</button>
// to
    <button class="btn btn-primary" [class.active]="isActive">Submit</button>
```

Add isActive property to `app.component.ts`

```
isActive = true;
```

## Style Binding

Add another button and use style binding to set the backgroundColor style to "green" the isActive property is true otherwise set it to "gray"

```
<button class="btn btn-primary" [style.backgroundColor]="isActive ? 'green' : 'red'">Submit</button>
```

## Event Binding

Use event binding to handle events raised by the DOM such as clicks and keystrokes

```
<button class="btn btn-primary" (click)="onClick()">Submit</button>
```

Write the onClick() method in  `app.component.ts`

```
onClick() {
    console.log('Clicked!');
}
```

Lets also have that method toggle the isActive property 

```
onClick() {
    console.log('Clicked!');
    this.isActive = !this.isActive;
}
```

Talk about generating components and inline templates and styles

## *ngIf and *ngFor

Create a div with the class `well` and put some text in it

```
<div class="well">
  <p >here</p>
</div>
```

Now add the *ngIf directive. The well is only visible when the isActive property is true

```
<div class="well" *ngIf="isActive">
  <p>well</p>
</div>
```

Copy and paste that div and change as shown here to toggle between wells

```
<div class="well" *ngIf="!isActive">
  <p>another well</p>
</div>
```

In the `app.component.ts` define another property called colors and set it equal to an array of some colors.

```
colors = ['red', 'blue', 'green', 'yellow']
```

Now back in the app.component template, create a ul with an li element as shown

```
<ul>
  <li *ngFor="let color of colors">{{ color }}</li>
</ul>
```
