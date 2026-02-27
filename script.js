const movies = [
    {
        title: "MORTAL KOMBAT",
        img: "https://image.tmdb.org/t/p/w200/xGuOF1T3WmPsAcQEQJfnG7Ud9f8.jpg",
        desc: "Epic adventure with nonstop thrills.",
        genre: "Adventure"
    },
    {
        title: "SONIC 2",
        img: "https://image.tmdb.org/t/p/w200/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",
        desc: "Heartwarming drama for the whole family.",
        genre: "Drama"
    },
    {
        title: "JUPITER'S LEGACY",
        img: "https://image.tmdb.org/t/p/w200/9yxep7oJdkj3Pla9TD9gKflRApY.jpg",
        desc: "A gripping, suspenseful tale of heroism.",
        genre: "Suspense"
    },
    {
        title: "GODZILLA MINUS ONE",
        img: "https://image.tmdb.org/t/p/w200/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg",
        desc: "Animated fun and laughter for everyone.",
        genre: "Animation"
    },
    {
        title: "THE DARLEST DAY OF MY LIFE",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.cmuNLRAJuIFk0jVGCZ0WlAHaKe%3Fpid%3DApi&f=1&ipt=c43982934529dbb702dab6bca8cf29d2f346fd00a39167fb55e2210a301f594e&ipo=images",
        desc: "Epic adventure with nonstop thrills.",
        genre: "Adventure"
    },
    {
        title: "BATTLESHIP",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.fU-jrH4SiSSOpMDJjDmXPQHaKX%3Fpid%3DApi&f=1&ipt=d5302ab9890b67d31d1892e6fe63a863211b0c8231408b8f7f48a5c54f01ef58&ipo=images",
        desc: "Heartwarming drama for the whole family.",
        genre: "Drama"
    },
    {
        title: "AVATAR",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.pV3VBmxyDDAVaerE8IIMnwHaK9%3Fpid%3DApi&f=1&ipt=1e5abc2e744b45ae71f8dccb6044bdee408c96230d363e62b855df1bba09bb18&ipo=images",
        desc: "A gripping, suspenseful tale of heroism.",
        genre: "Suspense"
    },
    {
        title: "AVENGERS",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.SSPjvjb8dEvWSvzufCoEUQHaK-%3Fpid%3DApi&f=1&ipt=76f3e857f16e8c9d950a06f74e48f6396fd768ea12155da1c8c6d8f02cf19358&ipo=images",
        desc: "Animated fun and laughter for everyone.",
        genre: "Animation"
    }
];

let filteredMovies = [...movies];
let favorites = [];
let currentGenre = "All";

function renderMovies(list) {
    const moviesRow = document.getElementById("moviesRow");
    moviesRow.innerHTML = "";
    list.forEach((movie, idx) => {
        const div = document.createElement("div");
        div.className = "movie";
        div.innerHTML = `
            <img src="${movie.img}" alt="${movie.title}">
            <button 
                class="favorite-btn${isFavorite(movie) ? " active" : ""}"
                onclick="toggleFavorite(event, ${idx})"
                title="Add to Favorites"
            >&#9733;</button>
        `;
        div.onclick = (e) => {
            if (!e.target.classList.contains('favorite-btn')) openMovieModal(idx);
        };
        moviesRow.appendChild(div);
    });
    renderFavorites();
}

function renderFavorites() {
    const favoritesRow = document.getElementById("favoritesRow");
    favoritesRow.innerHTML = "";
    favorites.forEach((movie, idx) => {
        const div = document.createElement("div");
        div.className = "movie";
        div.innerHTML = `<img src="${movie.img}" alt="${movie.title}">`;
        div.onclick = () => openMovieModalFromFavorites(idx);
        favoritesRow.appendChild(div);
    });
}

function isFavorite(movie) {
    return favorites.some(f => f.title === movie.title);
}

function toggleFavorite(e, idx) {
    e.stopPropagation();
    const movie = filteredMovies[idx];
    if (isFavorite(movie)) {
        favorites = favorites.filter(f => f.title !== movie.title);
    } else {
        favorites.push(movie);
    }
    renderMovies(filteredMovies);
}

function openLogin() {
    document.getElementById("loginModal").style.display = "block";
}
function closeLogin() {
    document.getElementById("loginModal").style.display = "none";
}
function login(e) {
    e.preventDefault();
    let username = document.getElementById("loginUsername").value || "User";
    document.getElementById("userProfile").style.display = "flex";
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("username").innerText = username;
    closeLogin();
}
function openMovieModal(idx) {
    const movie = filteredMovies[idx];
    document.getElementById("movieTitle").innerText = movie.title;
    document.getElementById("movieImg").src = movie.img;
    document.getElementById("movieDesc").innerText = movie.desc;
    document.getElementById("movieModal").style.display = "block";
}
function openMovieModalFromFavorites(idx) {
    const movie = favorites[idx];
    document.getElementById("movieTitle").innerText = movie.title;
    document.getElementById("movieImg").src = movie.img;
    document.getElementById("movieDesc").innerText = movie.desc;
    document.getElementById("movieModal").style.display = "block";
}
function closeMovieModal() {
    document.getElementById("movieModal").style.display = "none";
}

function toggleMode() {
    document.body.classList.toggle('light-mode');
}

function searchMovies() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    filteredMovies = movies.filter(
        m => m.title.toLowerCase().includes(q) &&
        (currentGenre === "All" || m.genre === currentGenre)
    );
    renderMovies(filteredMovies);
}
function filterByGenre() {
    currentGenre = document.getElementById("genreSelect").value;
    searchMovies();
}

// Hamburger menu for mobile
function toggleMenu() {
    let nav = document.getElementById('navbar');
    nav.classList.toggle('expand');
}

window.onclick = function(event) {
    if (event.target.className === "modal") {
        closeLogin();
        closeMovieModal();
    }
};

window.onload = function() {
    renderMovies(filteredMovies);
};