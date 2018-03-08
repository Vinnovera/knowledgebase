var worker = new Worker('worker.js');

worker.onmessage = function(event){
	document.getElementById('content').innerHTML = event.data;
};

worker.postMessage(42);

document.getElementById('content').innerHTML = 'Awaiting worker';

var clicks = 0;
document.getElementById('button').addEventListener('click', function () {
	clicks++;
	document.getElementById('buttonresponse').innerHTML = 'Click ' + clicks;
});