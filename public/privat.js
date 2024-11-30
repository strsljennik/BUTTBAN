let isAccessGranted = false;
let activeUser = null;
const allowedUsers = ["__X__", "___F117___", "ZI ZU"];  // Izuzeti korisnici

// Funkcija za otvaranje modala
function openModal() {
    const modal = document.getElementById('optionsModal');
    if (allowedUsers.includes(activeUser)) {
        modal.style.display = 'block';  // Otvori modal bez lozinke za određene korisnike
    } else {
        if (!isAccessGranted) {
            const password = prompt("Unesite lozinku:");
            if (password === "galaksija123") {
                isAccessGranted = true;
                modal.style.display = 'block';  // Otvori modal nakon validne lozinke
            } else {
                alert("Pogrešna lozinka!");
            }
        } else {
            modal.style.display = 'block';  // Otvori modal ako je pristup dozvoljen
        }
    }

    window.onclick = function(event) {
        const modal = document.getElementById('optionsModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Funkcija za postavljanje korisnika
function setActiveUser(username) {
    activeUser = username;
}

// Funkcija za brisanje chata
document.getElementById('deleteChatBtn').onclick = function() {
    deleteChat();
};

// Funkcija za aktiviranje privatnog chata
let isPrivateChatActive = false; // Privatni chat status
let currentPrivateRecipient = null; // Trenutni privatni primalac

// Funkcija za aktiviranje privatnog chata
document.getElementById('privateChatBtn').onclick = function() {
    if (currentPrivateRecipient) {
        isPrivateChatActive = !isPrivateChatActive; // Prebaci privatni chat
        if (isPrivateChatActive) {
            alert('Privatni chat je uključen za ' + currentPrivateRecipient);
        } else {
            alert('Privatni chat je isključen.');
            currentPrivateRecipient = null; // Očisti trenutnog primaoca
        }
    } else {
        alert("Greška: Niste izabrali gosta za privatni chat!");
    }
};

// Kada korisnik klikne na gosta
document.getElementById('guestList').addEventListener('click', function(event) {
    const guestName = event.target.textContent; // Uzmi ime gosta na kojeg je kliknuto
    if (guestName) {
        currentPrivateRecipient = guestName; // Postavi trenutnog primaoca

        // Prikazivanje vizuelne trake
        const guestElements = document.querySelectorAll('#guestList .guest');
        guestElements.forEach(guest => guest.classList.remove('selected')); // Ukloni prethodne selekcije
        event.target.classList.add('selected'); // Dodaj selektovani stil

        // Postavi formu za privatnu poruku
        document.getElementById('chatInput').placeholder = `Poruka za ${guestName}...`;
    }
});

// Funkcija za slanje poruke
document.getElementById('chatInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        let message = this.value;
        
        // Proveri da li je korisnik aktivan
        if (!activeUser) {
            alert("Greška: Aktivni korisnik nije postavljen.");
            return;
        }

        // Ako je privatni chat aktivan i postoji primalac
        if (isPrivateChatActive && currentPrivateRecipient) {
            socket.emit('privateMessage', {
                recipient: currentPrivateRecipient,
                sender: activeUser,
                text: message
            });
        } else {
            // Normalna poruka koja ide svim korisnicima
            socket.emit('chatMessage', { sender: activeUser, text: message });
        }

        this.value = ''; // Isprazni polje za unos
    }
});

// Prikazivanje privatnih poruka u message area
socket.on('privateMessage', function(data) {
    let messageArea = document.getElementById('messageArea');
    
    // Prikazivanje samo ako je primalac ili pošiljalac trenutni korisnik
    if (data.recipient === activeUser || data.sender === activeUser) {
        let newMessage = document.createElement('div');
        newMessage.classList.add('message');
        newMessage.innerHTML = `<strong>${data.sender} ---> ${data.recipient}:</strong> ${data.text} <span style="font-size: 0.8em; color: gray;">(${data.time})</span>`;
        messageArea.prepend(newMessage);
    }
});

// Prikazivanje normalnih poruka u message area
socket.on('chatMessage', function(data) {
    let messageArea = document.getElementById('messageArea');
    let newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.innerHTML = `<strong>${data.sender}:</strong> ${data.text} <span style="font-size: 0.8em; color: gray;">(${data.time})</span>`;
    messageArea.prepend(newMessage);
});
