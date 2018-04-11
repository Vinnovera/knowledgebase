import React from 'react';
import PropTypes from 'prop-types';
import styles from './LayoutComponent.scss';
import logo from '../../img/logo.png';

const LayouComponent = ({ children }) => (
	<div className={styles.layout}>
		<img src={ logo } alt="Logo" />
		{ children }
	</div>
);

LayouComponent.propTypes = {
	children: PropTypes.array
};

export default LayouComponent;