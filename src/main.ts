import { connectToServer } from './socket-client';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Web Socket - Client</h1>
    <span id="server-status">connecting</span>
    <ul id="client-ul">
    <li>David</li>
    </ul>
  </div>
`;
connectToServer();