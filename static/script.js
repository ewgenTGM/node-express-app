const connectionInfo = document.querySelector('.connection-info');
const connectBtn = document.getElementById('connect');
const disconnectBtn = document.getElementById('disconnect');

connectBtn.addEventListener('click', connectSocket);
disconnectBtn.addEventListener('click', disconnectSocket);

const socket = io({ autoConnect: false });

socket.on('Connect', function ({ message, id }) {
	console.log(message);
	connectionInfo.textContent = `Вы подключены с id ${id}.`;
});

socket.on('Disconnect', function ({ message }) {
	console.log(message);
	connectionInfo.textContent = 'Вы не подключены.';
});

function connectSocket() {
	socket.connect();
}

function disconnectSocket() {
	socket.close();
}
