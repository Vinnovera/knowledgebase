# Webpack

[Webpack](https://webpack.js.org/) is a [module bundler](https://medium.freecodecamp.org/javascript-modules-part-2-module-bundling-5020383cf306). This allows for developing a project with easily maintainable and readble code, while still delivering tight and minified JavaScript to the user.

Webpack is very flexible and allows for other tricks and bundles as well. Let's start with the basics by stitching together JavaScript modules.


### Get it running

We use [NPM](https://www.npmjs.com/) as a package manager and task runner. Make sure you have NPM installed on your system.

First install all packages needed:

```bash
$ npm install
```

Then start a [watcher](https://webpack.github.io/docs/tutorials/getting-started/#watch-mode) so that your bundle is built when you save your modules:

```bash
$ npm run watch
```


### Entry and output

There are four main [concepts](https://webpack.js.org/concepts/) in Webpack, but to get going you really only need to concern yourself with Entry and Output. [Entry](https://webpack.js.org/concepts/entry-points/) is the starting point from where the bundle will be built, and [Output](https://webpack.js.org/concepts/#output) is where the bundle will end up. You define this in your `webpack.config.js` file:

```javascript
module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
};
```

(Note that while `entry` only requires a relative path to the entry point, `output` needs to have a filename for the bundle, as well as an absolute path).

Now you can import modules into your starting point and let webpack build a cohesive bundle for you.

```javascript
import ATypicalModule from './modules/atypicalmodule';
```

```javascript
export default function ATypicalModule() {
	return 'ATypicalModule';
};
```


### Plugins

[Plugins](https://webpack.js.org/concepts/plugins/) is another core concept of Webpack and the perhaps most flexible. A huge variety of plugins can be found in the wild, and there is [quite a lot of them](https://webpack.js.org/plugins/) already shipped with Webpack.

```javascript
module.exports = {
	...,
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	]
};
```


### Loaders

Webpack is usually for creating bundles from JavaScript, but with [Loaders](https://webpack.js.org/concepts/loaders/) you can process other types of files as well. The most common use is to handle CSS. You specify Loaders in the `module` configuration, providing a "test" to match file types and one or several loaders to "use":

```javascript
module.exports = {
	...,
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' }
				]
			}
		]
	}
};
```

CSS Loader adds the "local" functionality, while Style Loader adds the compiled CSS to the actualt HTML page. This way you can isolate CSS to your specific module and avoid naming conflicts and keep module specific CSS close to your modules.


### Going further

There are numerous useful plugins and loaders, and the possibilities of creating new ones are almost endless. Common usage includes [Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/) and [Code splitting](https://webpack.js.org/guides/code-splitting/) among many other things. 
