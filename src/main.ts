import { connectToServer } from './socket-client';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Web Socket - Client</h1>
    <input id="jwt" placeholder="json web token"/>
    <button id="btn-connect">Connect</button>
    <br/>
    <span id="server-status">disconnected</span>
    <ul id="clients-ul"></ul>
    <form id="message-form">
        <input placeholder="message" id="message-input" autocomplete="off">
    </form>
    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`;
// connectToServer();

const jwt = document.querySelector<HTMLInputElement>('#jwt')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect');
btnConnect!.addEventListener('click', () => {
  if (jwt.value.trim().length <= 0) {
    return alert('Enter a jwt');
  }else{
    connectToServer(jwt.value.trim());
    jwt.innerText = '';
  }
});