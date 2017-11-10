const testFunc = ({ first = ['a', 'b'] }) => {
	const myFirstArray = [...first];
	const mySecondArray = [...myFirstArray, 'c', 'd'];
};
