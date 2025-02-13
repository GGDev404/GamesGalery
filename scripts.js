document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const btnAddGame = document.getElementById('btn-add-game');
    const btnCloseModal = document.querySelector('.close');
    const form = document.getElementById('form');
    const gamesContainer = document.getElementById('games-container');
    const btnSortName = document.getElementById('btn-sort-name');
    const btnSortDate = document.getElementById('btn-sort-date');

    let games = [];

    // Open modal
    btnAddGame.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Close modal
    btnCloseModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const imageUrl = document.getElementById('image-url').value;

        if (name && date && imageUrl) {
            const game = { name, date, imageUrl };
            games.push(game);
            addGameToGallery(game);
            form.reset();
            modal.style.display = 'none';
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });

    // Function to add game to gallery
    function addGameToGallery(game) {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game');

        const gameTitle = document.createElement('h3');
        gameTitle.textContent = game.name;

        const gameDate = document.createElement('p');
        gameDate.textContent = `Fecha de Juego: ${game.date}`;

        const gameImage = document.createElement('img');
        gameImage.src = game.imageUrl;
        gameImage.alt = `Imagen del Juego: ${game.name}`;

        gameDiv.appendChild(gameTitle);
        gameDiv.appendChild(gameDate);
        gameDiv.appendChild(gameImage);

        gamesContainer.appendChild(gameDiv);
    }

    // Sort games by name
    btnSortName.addEventListener('click', () => {
        games.sort((a, b) => a.name.localeCompare(b.name));
        renderGames();
    });

    // Sort games by date
    btnSortDate.addEventListener('click', () => {
        games.sort((a, b) => new Date(a.date) - new Date(b.date));
        renderGames();
    });

    // Function to render games
    function renderGames() {
        gamesContainer.innerHTML = '';
        games.forEach(game => addGameToGallery(game));
    }
});