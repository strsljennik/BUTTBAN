let selectedUser = null;
let isPrivateChatEnabled = false; // Status privatnog chata

// Funkcija za selektovanje korisnika
function selectUser(username, color) {
    selectedUser = username;

    // Obeleži izabrani korisnik u listi gostiju
    document.querySelectorAll('#guestList li').forEach(li => li.style.backgroundColor = '');
    const userElement = Array.from(document.querySelectorAll('#guestList li')).find(li => li.textContent === username);
    
    if (userElement) {
        userElement.style.backgroundColor = 'rgba(0, 0, 255, 0.1)'; // Obeleži odabranog korisnika
    }

    // Prikazivanje trake sa informacijom o privatnoj konverzaciji
    const privateChatInfo = document.getElementById('privateChatInfo');
    if (!privateChatInfo) {
        const newDiv = document.createElement('div');
        newDiv.id = 'privateChatInfo';
        newDiv.style.padding = '5px';
        newDiv.style.backgroundColor = 'rgba(0, 0, 255, 0.1)';
        newDiv.textContent = `Privatni chat sa ${username}`;
        document.getElementById('messageArea').insertBefore(newDiv, document.getElementById('messageArea').firstChild);
    } else {
        privateChatInfo.textContent = `Privatni chat sa ${username}`;
    }
}

// Aktivacija privatnog chata
document.getElementById('privateMessage').addEventListener('click', () => {
    isPrivateChatEnabled = !isPrivateChatEnabled; // Prebacuje stanje privatnog chata
    const statusText = isPrivateChatEnabled ? 'Privatni chat je uključen' : 'Privatni chat je isključen';
    alert(statusText);
});

// Event za unos poruke
document.getElementById('chatInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) { // Pritisnuto ENTER, bez SHIFT
        const message = document.getElementById('chatInput').value;
        const time = new Date().toLocaleTimeString();

        if (isPrivateChatEnabled && selectedUser) {
            // Emituj privatnu poruku prema selektovanom korisniku
            socket.emit('private_message', { to: selectedUser, message, time });

            // Dodaj privatnu poruku u messageArea
            const messageDiv = document.createElement('div');
            messageDiv.textContent = `SALJE --->>> PRIMA --->>> ${message} --->>> ${time}`;
            document.getElementById('messageArea').appendChild(messageDiv);
        } else {
            // Emituj javnu poruku
            socket.emit('public_message', { message, time });

          // Prijem privatnih poruka
socket.on('private_message', ({ from, message, time }) => {
    const messageDiv = document.createElement('div');
    messageDiv.textContentchatInput.value = `---->>> ${selectedGuest.textContent} : `; // Forma poruke za privatni chat
    document.getElementById('messageArea').appendChild(messageDiv);
});
