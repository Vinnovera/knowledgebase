import { ObservableFromEvent } from './microrx/eventobservable';

const draggable = document.getElementById('draggable');
const area = document.getElementById('area');

const onMouseDown = ObservableFromEvent(draggable, 'mousedown');
const onMouseMove = ObservableFromEvent(area, 'mousemove');
const onMouseUp = ObservableFromEvent(area, 'mouseup');

onMouseDown
	.map((value) => ({ offx: value.offsetX, offy: value.offsetY }))
	.subscribe({
		next({ offx, offy }) { 
			const unsubMouseMove = onMouseMove
				.map((value) => ({ x: value.clientX - offx, y: value.clientY - offy }))
				.subscribe({
					next({ x, y }) {
						draggable.style.left = `${ x }px`;
						draggable.style.top = `${ y }px`;
					} 
				});

			const unsubMouseUp = onMouseUp
				.subscribe({
					next() {
						unsubMouseMove();
						unsubMouseUp();
					} 
				});
		}
	});