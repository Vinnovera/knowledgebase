import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './layout/LayoutComponent';
import Home from './home/HomeComponent';

class App extends Component {
	render() {
		return (
			<Router>
				<Layout>
					<Route exact path="/" component={ Home } />
				</Layout>
			</Router>
		);
	}
}

export default App;