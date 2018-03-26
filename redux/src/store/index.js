import { createStore } from 'redux';
import reducers from '../reducers';

const { devToolsExtension } = window;

export default function configureStore () {
	return createStore(
		reducers
	);
};