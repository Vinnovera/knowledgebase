export default class Observable {
	constructor(_subscribe) {
		this._subscribe = _subscribe;
	}
	
	subscribe(observer) {
		let isUnsubscribed = false;
		this._subscribe({
			next(value) {
				if (!isUnsubscribed && observer.next) {
					observer.next(value);
				}
			}
		});
		return function unsubscribe() {
			isUnsubscribed = true;
		};
	}

	map(callback) {
		return new Observable((observer) => {
			const mapObserver = {
				next: (x) => observer.next(callback(x))
			};
			return this.subscribe(mapObserver);
		});
	}
}