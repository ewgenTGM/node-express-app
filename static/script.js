const socket = io();

socket.on('Connect', function ({ message }) {
	console.log(message);
});
