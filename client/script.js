function drawLine(context, x1, y1, x2, y2) {
	context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = "blue";
    context.lineWidth = 5;
	context.stroke();
}

document.addEventListener("DOMContentLoaded", () => {
    const socket = io.connect();

	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	const width = window.innerWidth;
    const height = window.innerHeight;
    
    const button = document.getElementById("sendButton");
    button.addEventListener("click", () => {
        const text = document.getElementById("textInput").value;
        socket.emit("message", text);
    });
	canvas.width = width;
	canvas.height = height;

	let drawing = false;
	let x, y, prevX, prevY;


	canvas.onmousedown = e => {
		drawing = true;
		prevX = x;
		prevY = y;
	}

	canvas.onmouseup = e => {
		drawing = false;
	}

	canvas.onmousemove = e => {
		x = e.clientX;
		y = e.clientY;
		if (drawing) {
			socket.emit('draw', {
				'x1': prevX,
				'y1': prevY,
				'x2': x,
				'y2': y
			});

			drawLine(context, prevX, prevY, x, y);
			prevX = x;
			prevY = y;
		}
	}

	socket.on('draw', data => {
		drawLine(context, data.x1, data.y1, data.x2, data.y2);
    });
    
    socket.on('message', msg => {
        alert(msg);
    });
});