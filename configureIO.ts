import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import logger from './logger';

export function configireIO(
	io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
) {
	io.on('connect', onConnect);
}

function onConnect(
	socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
): void {
	logger.info(`Socket ${socket.id} connected.`);
	socket.emit('Connect', {
		message: 'Hello! You are connected!',
		id: socket.id,
	});
	socket.on('disconnect', () => {
		logger.info(`Socket ${socket.id} disconnected.`);
		socket.emit('Disconnect', { message: 'Bye! See you soon!' });
	});
}
