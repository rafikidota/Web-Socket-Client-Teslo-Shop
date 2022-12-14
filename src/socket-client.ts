import { Manager, Socket } from "socket.io-client"

export const connectToServer = () => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');
    const socket = manager.socket('/');
    addListeners(socket);
}

const addListeners = (socket: Socket) => {
    const serverStatusLabel = document.querySelector('#server-status');
    const clientsUl = document.querySelector('#clients-ul');

    socket.on('connect', () => {
        serverStatusLabel!.innerHTML = 'online';
    });
    socket.on('disconnect', () => {
        serverStatusLabel!.innerHTML = 'offline';
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

}