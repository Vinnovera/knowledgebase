# Asynchronous code

When something is [asynchronous](http://www.dictionary.com/browse/asynchronous) it means that it is not happening at the same time as something else. In code it usually means that either the outcome of an operation happens at a later time than the initiation of it; or that the initiation happens at an unpredictable time (like a user clicking a button). Consider this example:

```javascript
const getUser => () => {
	const request = new XMLHttpRequest();
	request.open('GET', '/user', true);
	request.onload = () => {
		return request.responseText;
	};
};

const user = getUser();
console.log(user);
```

This code will NOT work, since the `console.log(user);` will run before the AJAX request has finished.

In modern JavaScript there are several approaches to handle asynchronous events. Which that are available to you depend a lot on the environment you are running JavaScript in, but can be [polyfilled](https://en.wikipedia.org/wiki/Polyfill_(programming)).

Some of the most common approaches are: Callbacks, Promises, Async/Await and Observables.

### Callbacks

A callback is a term used for functions that are passed to other functions, and then invoked when the function it is passed to is finished. Let's take a look at a callback solution to the non working example above:

```javascript
const getUser => (callback) => {
	const request = new XMLHttpRequest();
	request.open('GET', '/user', true);
	request.onload = () => {
		callback(request.responseText);
	};
};

getUser((user) => {
	console.log(user);
});
```

In this example, an anonymous function is passed to `getUser()`, which does the AJAX request. When the response from the request is available the function is invoked with the user data as an argument.

Callbacks are simple and available as a pattern under any circumstance and in any environment. This makes this pattern common and popular; however, it can lead to what is often referred to as "callback hell". Consider this:

```javascript
button.on('click', (event) => {
	const getXHR = new XMLHttpRequest();
	getXHR.open('GET', '/user', true);
	getXHR.onload = () => {
		const user = JSON.parse(getXHR.responseText);
		user.images.forEach(image => {
			getImageSize(image, (size) => {
				if (size.h > MAX_HEIGHT || size.w > MAX_WIDTH) {
					resizeImage(image, (newImageData) => {
						const postXHR = new XMLHttpRequest();
						postXHR.open('POST', `/user/${ user.id }/image/${ image.id }`);
						postXHR.send(newImageData);
						postXHR.onload = () => {
							console.log('Image is resized');
						};
					});
				}
			});
		});
	};
});
```

This is not very readable and can be rather hard to follow, even with fairly clear function and variable naming (and this example does not even include error handling). It can also be quite hard to debug and refactor.

### Promises

While callbacks are certainly reasonable in a lot of cases, if you need to chain many asynchronous jobs there are other ways to do it. One such way is using Promises. A Promise is an object that may return a value (or an error) sometime in the future. A Promise can be in one of three states: Pending, resolved or rejected.

This is how the example above could look like using promises:

```javascript
const getUser => () => {
	return new Promise((resolve) => {
		const request = new XMLHttpRequest();
		request.open('GET', '/user', true);
		request.onload = () => {
			resolve(request.responseText);
		};
	});
};

getUser()
	.then(user => {
		console.log(user)
	});
```

A Promise is "thenable", meaning it has a `.then()`-method that is invoked when the Promise is either resolved or rejected. A `.then()` returns a new Promise. This means that you can chain Promises together, like this:

```javascript
button.on('click', (event) => {
	getUser()
		.then(user => {
			return Promise.all(user.images.map(image => {
				return getImageSize(image)
					.then(resizeImage)
					.then(postImage)
					.then(() => console.log('Image is resized'));
			}));
		});
});
```

Here you can also see a sample usage of `Promise.all()` which is a Promise that resolves when an iterable list of promises all have resolved.

### Async/Await
