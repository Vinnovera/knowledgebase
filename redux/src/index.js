import configureStore from './store';
import List from './views/list';
import Add from './views/add';

const store = configureStore();
const list = new List(store);
const add = new Add(store);