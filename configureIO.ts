import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import logger from './logger';

export function configireIO(
	io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
) {
	io.on('connect', onConnect);
	io.on('disconnect', onDisconnect);
}

function onConnect(
	socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
): void {
	logger.info(`Socket ${socket.id} connected.`);
	socket.emit('Connect', { message: 'Hello! You are connected!' });
}

function onDisconnect(
	socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
): void {
	logger.info(`Socket ${socket.id} disconnected.`);
	socket.emit('Connect', { message: 'Bye! See you soon!' });
}
