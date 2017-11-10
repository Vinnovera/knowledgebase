# Babel

[Babel](https://babeljs.io/) is used for [transpiling](https://en.wikipedia.org/wiki/Source-to-source_compiler) JavaScript using new syntax into JavaScript using old syntax. So code like this:

```javascript
const testFunc = ({ first = ['a', 'b'] }) => {
	const myFirstArray = [...first];
	const mySecondArray = [...myFirstArray, 'c', 'd'];
};
```

... turns into code like this:

```javascript
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var testFunc = function testFunc(_ref) {
	var _ref$first = _ref.first,
	    first = _ref$first === undefined ? ['a', 'b'] : _ref$first;

	var myFirstArray = [].concat(_toConsumableArray(first));
	var mySecondArray = [].concat(_toConsumableArray(myFirstArray), ['c', 'd']);
};
```

This makes it so we can use [modern and future JavaScript](http://es6-features.org/) today, with a great degree of backwards compability.


### Get it running

We use [NPM](https://www.npmjs.com/) as a package manager and task runner. Make sure you have NPM installed on your system.

First install all packages needed:

```bash
$ npm install
```

Then start a [watcher](https://babeljs.io/docs/usage/cli/#babel-compile-files) so that your source files retranspile when saved:

```bash
$ npm run watch
```


### Try it out

Babel uses different [Presets](https://babeljs.io/docs/plugins/#presets-official-presets) to transpile different sets of JavaScript. The `es2015` preset transpiles things that were ratified in 2015 (like arrow functions and destructuring), while `env` transpiles all yearly presets.

You define which presets to use in your `.babelrc` file.

You can add new presets by installing them with NPM:

```bash
$ npm install --save-dev babel-preset-react
```

And then adding them to your `.babelrc` file:

```
{
	"presets": ["env", "react"]
}
```

All JavaScript files in your `src` folder will be transpiled into your `dist` folder, together with a [Source Map](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map).

Have fun!
