# Ng-Radio

RxJS-based message bus inspired by [Backbone.Radio](https://github.com/marionettejs/backbone.radio).
Inject it in your Angular2 application module and have fun.

There is nothing angular2-specific, though. It is possible to use it in any application.

## Installation

`npm install --save ng-radio`

## Usage

First, import it:

`import { NgRadio } from 'ng-radio';`

Then, if using Angular2, inject it as a service (do not forget about providers):

`constructor(private radio: NgRadio){...}`

Or create an instance manually:

`let radio = new NgRadio();`

Since you have `NgRadio` instance in your app, you can use these methods for passing messages:

* `radio.cast(key, data)` - send message to radio.

* `radio.on(pattern)` - returns observable you can subscribe to listen events.

Patterns may contain multiple segments split by `:`. Use this feature to create namespaces for messages you cast. You can use `*` in `pattern` to subscribe to any matching segment, or use `**` to subscribe to all segments, starting from particular position.

For example, you can use `on('error:*')` and subscribe to all errors, including, for example `error:http`, or `error:internal`:

```
radio.cast('app:start',     'started');
radio.cast('message:greet', 'Hi!');
radio.cast('message:bye',   'Bye!');

radio.on('app:start').subscribe((message)=>{
	console.log(message); //will receive 'started' only
});

radio.on('message:greet').subscribe((message)=>{
	console.log(message); //will receive 'Hi!'
});

radio.on('message:bye').subscribe((message)=>{
	console.log(message); //will receive 'Bye!'
});

radio.on('message:*').subscribe((message)=>{
	console.log(message); //will receive both 'Hi!' and 'Bye!'
});

radio.on('**').subscribe((message)=>{
	console.log(message); //will receive all messages: 'started', 'Hi!' and 'Bye!'
});

```

### Examples

These strings will match:

* `on('**'    , callback)` can subscribe to any message with any segments count

* `on('a'     , callback)` can subscribe to `cast('a', ...)`

* `on('a:b'   , callback)` can subscribe to `cast('a:b', ...)`

* `on('a:b:c' , callback)` can subscribe to `cast('a:b:c', ...)`

* `on('a:**'  , callback)` can subscribe to `cast('a:b:c', ...)`, `cast('a:b:c:d:e:f', ...)`

* `on('a:*:*' , callback)` can subscribe to `cast('a:b:c', ...)`, `cast('a:f:g', ...)`, `cast('a:n:m', ...)`

* `on('a:b:*' , callback)` can subscribe to `cast('a:b:c', ...)`, `cast('a:b:d', ...)`, but not `cast('a:b', ...)`

* `on('a:b:**', callback)` can subscribe to `cast('a:b:c',. ..)`

* `on('*:b:*' , callback)` can subscribe to `cast('a:b:c', ...)`

* `on('a:*:*' , callback)` can subscribe to `cast('a:b:c', ...)`

