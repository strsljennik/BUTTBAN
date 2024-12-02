document.getElementById('addImage').addEventListener('click', function() {
    const imageSource = prompt("Unesite URL slike (JPG, PNG, GIF) ili ostavite prazno za upload sa računara:");

    if (imageSource) {
        // Provera da li je URL slike u validnom formatu (JPG, PNG, GIF)
        const validFormats = ['jpg', 'jpeg', 'png', 'gif'];
        const fileExtension = imageSource.split('.').pop().toLowerCase();
        
        if (validFormats.includes(fileExtension)) {
            // Dodavanje slike preko URL-a
            const img = document.createElement('img');
            img.src = imageSource;  // Podesi 'src' na URL slike
            img.style.width = "200px";  // Početna širina
            img.style.height = "200px"; // Početna visina
            img.style.position = "absolute";  // Omogućava pomeranje slike unutar chat-a
            img.classList.add('draggable');  // Dodajemo klasu za pomeranje
            img.classList.add('resizable');  // Dodajemo klasu za menjanje dimenzija
            document.getElementById('chatContainer').appendChild(img);
            enableDragAndResize(img); // Poziv funkcije za pomeranje i promenu dimenzija

            // Dodavanje dugmeta za brisanje
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'X';
            deleteButton.style.position = 'absolute';
            deleteButton.style.top = '0';
            deleteButton.style.right = '0';
            deleteButton.style.backgroundColor = 'red';
            deleteButton.style.color = 'white';
            deleteButton.style.border = 'none';
            deleteButton.style.cursor = 'pointer';
            deleteButton.style.display = 'none';  // Dugme je nevidljivo dok kursor nije iznad slike
            img.appendChild(deleteButton);

            // Prikazivanje dugmeta za brisanje kada je kursor iznad slike
            img.addEventListener('mouseenter', function() {
                deleteButton.style.display = 'block'; // Prikazuje dugme kada je kursor iznad
            });

            img.addEventListener('mouseleave', function() {
                deleteButton.style.display = 'none';  // Sakriva dugme kada kursor napusti sliku
            });

            // Brisanje slike kada se klikne na dugme
            deleteButton.onclick = function() {
                img.remove(); // Uklanja sliku
                console.log("Slika je uklonjena.");
            };

            console.log("Slika je dodata preko URL-a.");
        } else {
            alert("Nepodržan format slike. Podržani formati su: JPG, PNG, GIF.");
        }
    } else {
        // Dodavanje slike sa lokalnog računara
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/jpeg, image/png, image/gif';  // Filtriraj samo slike JPG, PNG, GIF
        fileInput.onchange = function(event) {
            const file = event.target.files[0];
            if (file) {
                // Provera tipa fajla
                const validFormats = ['image/jpeg', 'image/png', 'image/gif'];
                if (validFormats.includes(file.type)) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = document.createElement('img');
                        img.src = e.target.result;  // Podesi 'src' na Base64 sadržaj
                        img.style.width = "200px";  // Početna širina
                        img.style.height = "200px"; // Početna visina
                        img.style.position = "absolute";  // Omogućava pomeranje slike unutar chat-a
                        img.classList.add('draggable');  // Dodajemo klasu za pomeranje
                        img.classList.add('resizable');  // Dodajemo klasu za menjanje dimenzija
                        document.getElementById('chatContainer').appendChild(img);
                        enableDragAndResize(img); // Poziv funkcije za pomeranje i promenu dimenzija

                        // Dodavanje dugmeta za brisanje
                        const deleteButton = document.createElement('button');
                        deleteButton.innerText = 'X';
                        deleteButton.style.position = 'absolute';
                        deleteButton.style.top = '0';
                        deleteButton.style.right = '0';
                        deleteButton.style.backgroundColor = 'red';
                        deleteButton.style.color = 'white';
                        deleteButton.style.border = 'none';
                        deleteButton.style.cursor = 'pointer';
                        deleteButton.style.display = 'none';  // Dugme je nevidljivo dok kursor nije iznad slike
                        img.appendChild(deleteButton);

                        // Prikazivanje dugmeta za brisanje kada je kursor iznad slike
                        img.addEventListener('mouseenter', function() {
                            deleteButton.style.display = 'block'; // Prikazuje dugme kada je kursor iznad
                        });

                        img.addEventListener('mouseleave', function() {
                            deleteButton.style.display = 'none';  // Sakriva dugme kada kursor napusti sliku
                        });

                        // Brisanje slike kada se klikne na dugme
                        deleteButton.onclick = function() {
                            img.remove(); // Uklanja sliku
                            console.log("Slika je uklonjena.");
                        };

                        console.log("Slika je dodata sa računara.");
                    };
                    reader.readAsDataURL(file);  // Konvertuje sliku u Base64 format
                } else {
                    alert("Nepodržan format fajla. Podržani formati su: JPG, PNG, GIF.");
                }
            }
        };
        fileInput.click();
    }
});

