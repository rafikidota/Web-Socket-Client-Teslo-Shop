import { Manager, Socket } from "socket.io-client"

interface MessageFromServer {
    fullName: string,
    message: string
}

export const connectToServer = (jwt: string) => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            auth: jwt
        }
    });
    const socket = manager.socket('/');
    addListeners(socket);
}

const addListeners = (socket: Socket) => {
    const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status');
    const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul');
    const messageForm = document.querySelector<HTMLFormElement>('#message-form');
    const messageInput = document.querySelector<HTMLInputElement>('#message-input');
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul');

    socket.on('connect', () => {
        serverStatusLabel!.innerHTML = 'connected';
    });
    socket.on('disconnect', () => {
        serverStatusLabel!.innerHTML = 'disconnected';
    });
    socket.on('clients-updated', (clients: string[]) => {
        let clientHtml = '';
        clients.forEach(client => {
            clientHtml += `
            <li>${client}</li>
            `
        });
        clientsUl!.innerHTML = clientHtml;
    });
    messageForm!.addEventListener('submit', (event) => {
        event.preventDefault();
        if (messageInput!.value.trim().length <= 0) {
            return;
        }
        socket.emit('message-from-client', {
            id: 'me!!',
            message: messageInput!.value
        });
        messageInput!.value = '';
    });

    socket.on('message-from-server', (payload: MessageFromServer) => {
        const newMessage = `
            <li>
                <strong>${payload.fullName}:</strong>
                <span>${payload.message}</span>
            </li>
            `
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl!.append(li);
    });

}