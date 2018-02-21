import Observable from './basicobservable';

export function DatasourceFromEvent(target, event) {
	const methods = {
		ondata: (x) => { return x; }
	}

	target.addEventListener(event, (x) => methods.ondata(x));

	return methods;
}

export function ObservableFromEvent(target, event) {
	return new Observable((observer) => {
		const datasource = DatasourceFromEvent(target, event);
		datasource.ondata = (e) => observer.next(e);
	});
}