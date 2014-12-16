# Bubble.js
---

## Pleasing the DOM event handling in just 1.6K

In most of the cases we rely on DOM events. They are tightly bound to our workflow. We normally add elements to the DOM tree dynamically. Whenever we want to get info from them we have to add event listeners. And guess what? Most of us are doing this every time when the UI is changed. That's because we remove or replace node's content. In such cases the attached listeners are gone. Bubble.js aims to help here. It adds listeners to the root of our logical blocks. It uses the [bubbling model](http://stackoverflow.com/a/4616720/642670) and nicely catches elements' events.

## Usage

Include Bubble.js in your page.

```html
<script src="js/bubble.min.js"></script>
```

Pick the area where Bubble.js will operate and set a proper `data-bubble-action` describing your events. For example:

```html
<div class="header">
	<a href="#" data-bubble-action="click:logo">logo</a>
	<input type="text" name="filter" data-bubble-action="keyup:filter, blur:filter-leaved" />
	<ul>
		<li><a href="#" data-bubble-action="click:about">About</a></li>
		<li><a href="#" data-bubble-action="click:contacts">Contacts</a></li>
	</ul>
</div>
```

After that initialize the bubble:
```js
// use a selector to element
// that wraps your dispatchers
var b = bubble('.header');
```
And define the handlers of your events:
```js
b.on('logo', function(e) { console.log('Logo link clicked!'); })
.on('about', function(e) { console.log('About link clicked!'); })
.on('contacts', function(e) { console.log('Contacts link clicked!'); })
.on('filter', function(e) { console.log('Filter: ' + e.target.value); })
.on('filter-leaved', function() { console.log('Filter field leaved'); });
```
or
```js
b.on({
    logo: function(e) { console.log('Logo link clicked!'); },
    about: function(e) { console.log('About link clicked!'); },
    contacts: function(e) { console.log('Contacts link clicked!'); },
    filter: function(e) { console.log('Filter: ' + e.target.value); },
    'filter-leaved': function(e) { console.log('Filter field leaved'); }
});
```

Check out the result [here](http://jsbin.com/vujelo/3/edit?js,console,output).

## Building

* `npm install`
* `npm run build`

## Tests

Open `tests` directory in a browser or click on [this](http://work.krasimirtsonev.com/git/bubblejs/tests) link.

## Demo

* [Basic usage](http://jsbin.com/vujelo/3/edit?js,console,output)
* [Simple list-to-list app](http://work.krasimirtsonev.com/git/bubblejs/example/)

## Articles

* [Bubble.js: A 1.6K Solution to a Common Problem](http://code.tutsplus.com/tutorials/bubblejs-a-16k-solution-to-a-common-problem--cms-21986)
