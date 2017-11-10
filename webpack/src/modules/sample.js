import style from './sample.css'

export function Sample() {
	this.getStyle = function(selector) {
		return style[selector];
	};
};
