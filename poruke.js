let io;
let socket;
let newImage = [];  

// Socket.io događaj za vezivanje konekcije
io.on('connection', (socket) => {
    // Emitovanje početnih slika
    socket.emit('initial-images', newImage);

    // Dodavanje nove slike
    socket.on('add-image', (imageSource, position, dimensions) => {
        if (!imageSource || !position || !dimensions) return;

        newImage.push({
            imageUrl: imageSource,
            position: position,
            dimensions: dimensions
        });

        io.emit('display-image', {
            imageUrl: imageSource,
            position: position,
            dimensions: dimensions
        });
    });

    // Ažuriranje slike
    socket.on('update-image', (data) => {
        const image = newImage.find(img => img.imageUrl === data.imageUrl);
        if (image) {
            image.position = data.position;
            image.dimensions = data.dimensions;
        }
        io.emit('sync-image', data);
    });

    // Brisanje slike
    socket.on('remove-image', (imageUrl) => {
        const index = newImage.findIndex(img => img.imageUrl === imageUrl);
        if (index !== -1) {
            newImage.splice(index, 1);
        }
        io.emit('update-images', newImage);
    });

    // Funkcija za slanje poruka u četu
    socket.on('chatMessage', (msgData) => {
        const time = new Date().toLocaleTimeString();
        const messageToSend = {
            text: msgData.text,
            bold: msgData.bold,
            italic: msgData.italic,
            color: msgData.color,
            nickname: guests[socket.id],
            time: time
        };
        io.emit('chatMessage', messageToSend);
    });

    // Funkcija za brisanje chata
    socket.on('clear-chat', () => {
        console.log(`Zahtev za brisanje chata primljen od ${socket.id}`);
        io.emit('chat-cleared');
    });
});

module.exports = { chatMessage, clearChat };

