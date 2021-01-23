//Declaración de la API de donde se tomarán los datos para la página, variables globales y memoria local
const baseSwapi = "https://swapi0220.herokuapp.com/api/";
let data = {};
let searchParam = "starships/?search=";
const saveData = () => {
    localStorage.setItem("data", JSON.stringify(data));
};

/**
 *                  FUNCIONES DE NAVEGACIÓN
 * 
 * función que se utiliza cada vez que se regresa a la sección de discover donde se 
 * mostrará una vista de todas las naves; también aplica la clase d-none para no mostrar los elementos 
 * que no pertenecen en esta página
 */
function showStarships() {
    let sectionStarships = document.querySelector("#starships");
    let sectionFavs = document.querySelector("#favs");
    let sectionPassengers = document.querySelector("#passengers");
    let searchResults = document.querySelector("#search")
    let navbarSearch = document.querySelector(".navbar-search");
    let sectionFavPassenger = document.querySelector("#fav-passengers");
    let inspectStarship = document.querySelectorAll(".card-footer-inspect");
    for (const element of inspectStarship) {
        element.classList.add("d-none");
    }
    searchParam = "starships/?search=";

    sectionStarships.classList.remove("d-none");
    sectionFavs.classList.add("d-none");
    sectionPassengers.classList.add("d-none");
    navbarSearch.classList.remove("d-none");
    searchResults.classList.add("d-none");
    sectionFavPassenger.classList.add("d-none");

    document.querySelector(".passengers-result").innerHTML = "";
};
/*función que se utiliza cada vez que se ingresa a la sección Favorites donde se 
* mostrará una vista de todoas las naves favoritas; también aplica la clase d-none para no mostrar los elementos 
* que no pertenecen en esta página
*/
function showFavs() {
    let sectionPassengers = document.querySelector("#passengers");
    let searchResults = document.querySelector("#search")
    let sectionStarships = document.querySelector("#starships");
    let sectionFavs = document.querySelector("#favs");
    let navbarSearch = document.querySelector(".navbar-search");
    let sectionFavPassenger = document.querySelector("#fav-passengers");
    let inspectStarship = document.querySelectorAll(".card-footer-inspect");
    for (const element of inspectStarship) {
        element.classList.remove("d-none");
    }

    sectionStarships.classList.add("d-none");
    sectionFavs.classList.remove("d-none");
    sectionPassengers.classList.add("d-none");
    navbarSearch.classList.add("d-none");
    searchResults.classList.add("d-none");
    sectionFavPassenger.classList.add("d-none");

    document.querySelector(".passengers-result").innerHTML = "";
};

/**
 *                  FUNCIONES PARA CREAR CARDS
 * 
 * Crea la estructura HTML de la carta con la información de una nave 
 * @param {object} starship Contiene la información de la nave a mostrar
 */
const createStarshipCard = (starship) => {
    let wrapper = document.createElement("div");
    let imgUrl;
    let val = starship.length.replace(/\,/,'');
    switch (true) {
        case(val< 30):
            imgUrl = "img/ships/corvette.png";
            break;
        case(val< 65):
            imgUrl = "img/ships/falcon.png";
            break;
        case (val < 100):
            imgUrl = "img/ships/transport.png";
            break;
        case (val < 300):
            imgUrl = "img/ships/frigate.png";
            break;        
        case (val < 600):
            imgUrl = "img/ships/cruiser.png";
            break;      
        case (val < 1000):
            imgUrl = "img/ships/heavycruiser.png";
            break;        
        case (val < 2000):
            imgUrl = "img/ships/stardestroyer.png";
            break;        
        case (val < 5000):
            imgUrl = "img/ships/battlecruiser.png";
            break;        
        default:
            imgUrl = "img/ships/dreadnaught.png";
            break;
    }
    const favColor =
        data.favs.findIndex((favStarship) => starship.name == favStarship.name) >= 0 ? "toggle-on-favs" : "toggle-off";
    const cardContent = `
    <div class="card">
        <div class="card-body">
            <div class="card-body-overlay">
                <h3 class="card-body-title">${starship.name}</h3>
                <p class="card-body-overlay-1"><span>Manufacturer</span>:<br>${starship.factory}</p>
                <p class="card-body-overlay-2"><span>Class</span>:<br>${starship.class}</p>
                <p class="card-body-overlay-3"><span>HyperDrive rating</span>:<br>${starship.drive}</p>
                <p class="card-body-overlay-4"><span>Length</span>:<br>${starship.length} m</p>
            </div>

            <h3 class="card-body-title">${starship.name}</h3>
            <img src=${imgUrl} class="card-body-img" alt="spaceship">
            <h5 class="card-body-text"><span>Model</span>:<br>${starship.model}</h5>
        </div>

        <div class="card-footer">
            <button data-starship='${JSON.stringify(starship)}' type="button" class="card-footer-fav ${starship.name.replace(/\s/g,"")}"><i class="fas fa-star ${favColor}"></i></button>
            <button data-starship='${JSON.stringify(starship)}'type="button" class="card-footer-inspect d-none ${starship.name.replace(/\s/g,"")}"><i class="fas fa-eye"></i></button>
        </div>
    </div>
    `;
    wrapper.innerHTML = cardContent;
    return wrapper;
};
/**
 * Crea la estructura HTML de una carta con la información de un personaje/pasajero
 * @param {object} passenger Contiene la información del pasajero a mostrar
 */
const createPassengersCard = (passenger) => {
    let wrapper = document.createElement("div");
    let imgUrl;
    let val = passenger.gender;
    switch (val) {
        case ("male"):
            imgUrl = "img/ppl/luke.png";
            break;
        case ("female"):
            imgUrl = "img/ppl/leia.png";
            break;        
        case ("hermaphrodite"):
            imgUrl = "img/ppl/hutt.png";
            break;            
        default:
            imgUrl = "img/ppl/c3p0.png";
            break;
    }
    let favColor = "toggle-off"; 
    let registration = "No Starship Registration";
    for (const favPassenger of data.pax) {
        if (favPassenger.name == passenger.name) {
            favColor = "toggle-on-add";
            registration = `<span>travelling on</span>:<br>${favPassenger.ship}`;
            break;
        }
    }
    const cardContent = 
    `
    <div class="card">
        <div class="card-body">
            <div class="card-body-overlay">
                <h3 class="card-body-title">${passenger.name}</h3>
                <p class="card-body-overlay-1"><span>Gender</span>:<br>${passenger.gender}</p>
                <p class="card-body-overlay-2"><span>Height</span>:<br>${passenger.height} cm</p>
                <p class="card-body-overlay-3"><span>Mass</span>:<br>${passenger.mass} kg</p>
                <p class="card-body-overlay-4"><span>Birth Year</span>:<br>${passenger.year}</p>
            </div>

            <h3 class="card-body-title">${passenger.name}</h3>
            <img src=${imgUrl} class="card-body-imgPassenger" alt="passenger">
            <h5 class="card-body-text registration">${registration}</h5>
            </div>

        <div class="card-footer">
            <button data-passenger='${JSON.stringify(passenger)}' type="button" class="card-footer-add ${passenger.name.replace(/\s/g,"")}"><i class="fas fa-user-plus ${favColor}"></i></button>
        </div>
    </div>
    `;
    wrapper.innerHTML = cardContent;
    return wrapper;
};

/**
 *                  FUNCIONES PARA DESPLEGAR CARDS
 * 
 * Muestra la lista de cartas de naves
 * Reemplaza el contenido actual por el de la lista
 * @param {ArrayShip} list 
 * @param {DOMElement} target 
 */
const showListAsCard = (list, target) => {
    target.innerHTML = "";
    list.forEach((starship) => {
        target.appendChild(createStarshipCard(starship));
    });
};
/**
 * Muestra la lista de cartas de pasajeros
 * Reemplaza el contenido actual por el de la lista
 * @param {ArrayPassenger} list 
 * @param {DOMElement} target 
 */
const showPassengerListAsCard = (list, target) => {
    target.innerHTML = "";
    list.forEach((passenger) => {
        target.appendChild(createPassengersCard(passenger));
    });
};
/**
 * Obtiene una lista de naves a mostrar en la sección Discover
 * @param {string} endPoint 
 * @param {function} action 
 */
const getDiscover = (endPoint, action) => {
    fetch(endPoint)
        .then((response) => response.json())
        .then((data) => {
            action(data);
        })
        .catch((err) => {
            console.log("Could not retrieve the list of starships for discover", err);
        });
};
/**
 *  Crea un objeto Starship a partir de la data de la API.
 * @param {object} data Data obtenida de la API para una nave
 */
const createStarship = (data) => {
    const starship = {
        name: data.name,
        model: data.model,
        class: data.starship_class,
        length: data.length,
        factory: data.manufacturer,
        drive: data.hyperdrive_rating,
    };
    return starship;
};
/**
 * Crea un objeto Passenger a partir de la data de la API
 * @param {object} data Data obtenida de la API para un pasajero
 */
const createPassenger = (data) => {
    const passenger = {
        name: data.name,
        skin: data.skin_color,
        gender: data.gender,
        height: data.height,
        mass: data.mass,
        year: data.birth_year,
        ship: "",
    };
    return passenger;
};
/**
 * Muestra la lista de starships en la sección discover 
 * obteniendo los elementos a partir de data.discover
 */
const showDiscover = async () => {
    let starshipArray = [];
    for (const starshipMetaData of data.discover.results) {
        const response = await fetch(starshipMetaData.url);
        const data = await response.json();
        let starship = createStarship(data);
        starshipArray.push(starship);
    }
    let dest = document.querySelector(".discover-result");
    showListAsCard(starshipArray, dest);
};
/**
 * Muestra las naves encontradas a partir de la searchbar en la sección search
 */
const showStarshipSearch = async () => {
    let starshipArray = [];
    for (const starshipMetaData of data.search.results) {
        const response = await fetch(starshipMetaData.url);
        const data = await response.json();
        let starship = createStarship(data);
        starshipArray.push(starship);
    }
    let dest = document.querySelector(".search-result");
    showListAsCard(starshipArray, dest);
};
/**
 * Muestra los pasajeros encontrados a partir de la searchbar en la sección search
 */
const showPassengerSearch = async () => {
    let passengerArray = [];
    for (const passengerMetaData of data.searchP.results) {
        const response = await fetch(passengerMetaData.url);
        const data = await response.json();
        let passenger = createPassenger(data);
        passengerArray.push(passenger);
    }
    let dest = document.querySelector(".search-result");
    showPassengerListAsCard(passengerArray, dest);
};
/**
 * Muestra la lista de Passengers en la sección Passengers
 * obteniendo los elementos a partir de data.people
 */
const showPassengers = async () => {
    let passengerArray = [];
    for (const passengerMetaData of data.people.results) {
        const response = await fetch(passengerMetaData.url);
        const data = await response.json();
        let passenger = createPassenger(data);
        passengerArray.push(passenger);
    }
    let dest = document.querySelector(".passengers-result");
    showPassengerListAsCard(passengerArray, dest);
};

const saveDiscoverData = (discover) => {
    data.discover = discover;
    showDiscover();
};
const saveStarshipSearchData = (search) => {
    data.search = search;
    showStarshipSearch();
};
const savePassengerData = (people) => {
    data.people = people;
    showPassengers();
};
const savePassengerSearchData = (searchP) => {
    data.searchP = searchP;
    showPassengerSearch();
};

/**
 *             FUNCIONES PARA EL MANEJO DE FAVORITOS Y PASAJEROS
 *
 * Recibe los parámetros de la nave a añadir o eliminar de la lista de favoritos
 * Si la nave se elimina de favoritos, tambien se eliminan los pasajeros dentro de ella
 * Si la nave es añadida a favoritos, despliegará la sección de pasajeros a añadir
 * 
 * @param {DOMElement} target 
 * @param {ArrayStarship} list 
 * @param {object} after 
 */
const listToggle = (target, list, after) => {
    const starshipToAddOrRemove = JSON.parse(target.dataset.starship);
    let index = list.findIndex(
        (starship) => starship.name == starshipToAddOrRemove.name
    );
    if (index >= 0) {
        list.splice(index, 1);
        for (index = data.lengthAux - 1; index >= 0; index--) {
            if (data.pax[index].ship == starshipToAddOrRemove.name) {
                data.pax.splice(index, 1);
                data.lengthAux -= 1;
            }
            document.querySelector("#fav-passengers").classList.add("d-none");
        }
    } else {
        list.push(starshipToAddOrRemove);
        document.querySelector("#starships").classList.add("d-none");
        document.querySelector("#passengers").classList.remove("d-none");
        document.querySelector("#search").classList.add("d-none");
        document.querySelector("#boardingShip").innerHTML = `${starshipToAddOrRemove.name}'s`;
        searchParam = "people/?search=";
        const endPointPassengers = baseSwapi + `people/`;
        getDiscover(endPointPassengers, savePassengerData);
    }
    saveData();
    if (after) after(starshipToAddOrRemove);
};
/**
 * Recibe los parámetros del pasajero a añadir o eliminar de la nave que 
 * se tiene seleccionada
 * 
 * @param {DOMElement} target 
 * @param {ArrayPassenger} list 
 * @param {object} after 
 */
const addPassenger = (target, list, after) => {
    let passengerAddOrRemove = JSON.parse(target.dataset.passenger);
    const index = list.findIndex(
        (passenger) => passenger.name == passengerAddOrRemove.name
    );
    if (index >= 0) {
        list.splice(index, 1);
        data.lengthAux -= 1;
    } else {
        passengerAddOrRemove.ship = data.favs[data.favs.length - 1].name;
        list.push(passengerAddOrRemove);
        data.lengthAux += 1;
    }
    saveData();
    if (after) after(passengerAddOrRemove);
};
/**
 * Añade el evento de click al boton de favorito y envia la data por medio de ListToggle
 * para crear una nueva lista de naves favoritas que será desplegada en la sección de favorites.
 */
const favStarshipListener = () => {
    document.addEventListener("click", (e) => {
        let target = e.target;
        if (
            target.classList.contains("card-footer-fav") ||
            target.parentElement.classList.contains("card-footer-fav")
        ) {
            target = target.dataset.starship ? target : target.parentElement;
            listToggle(target, data.favs, (starship) => {
                document
                    .querySelectorAll(
                        ".card-footer-fav." + starship.name.replace(/\s/g, "")
                    )
                    .forEach((favs) => {
                        const i = favs.querySelector("i");
                        i.classList.toggle("toggle-off");
                        i.classList.toggle("toggle-on-favs");
                    });
                showListAsCard(data.favs, document.querySelector(".favs-result"));
                let favSection = document.querySelector("#favs");
                let inspectStarship = favSection.querySelectorAll(".card-footer-inspect");
                for (const element of inspectStarship) {
                    element.classList.remove("d-none");
                }
            });
        }
    });
};
/**
 * Añade el evento de click al boton de añadir pasajero y envía la data por medio de AddPassenger
 * para crear una lista de pasajeros dentro de la nave seleccionada
 */
const addPassengersListener = () => {
    document.addEventListener("click", (e) => {
        let target = e.target;
        if (
            target.classList.contains("card-footer-add") ||
            target.parentElement.classList.contains("card-footer-add")
        ) {
            target = target.dataset.passenger ? target : target.parentElement;
            addPassenger(target, data.pax, (passenger) => {
                document
                    .querySelectorAll(
                        ".card-footer-add." + passenger.name.replace(/\s/g, "")
                    )
                    .forEach((pax) => {
                        const i = pax.querySelector("i");
                        i.classList.toggle("toggle-off");
                        i.classList.toggle("toggle-on-add");
                        const r = pax.parentElement.parentElement.querySelector(".registration");
                        if (i.classList.contains("toggle-on-add")) {
                            r.innerHTML = `<span>travelling on</span>:<br>${passenger.ship}`;
                        } else {
                            r.innerHTML = "No Starship Registration";
                        }
                    });
            });
        }
    });
};

/**
 *            FUNCIONES PARA BÚSQUEDA Y BOTONES NEXT/PREVIOUS 
 * 
 * Agrega pasajeros a la nave seleccionada 
 */
const checkPassengersListener = () => {
    document.addEventListener("click", (e) => {
        let target = e.target;
        let passengerInside = [];
        if (target.classList.contains(".card-footer-inspect") || target.parentElement.classList.contains("card-footer-inspect")) {
            target = target.dataset.starship ? target : target.parentElement;
            let starshipToCheck = JSON.parse(target.dataset.starship);
            for (let index = data.lengthAux - 1; index >= 0; index--) {
                if (data.pax[index].ship == starshipToCheck.name) {
                    passengerInside.push(data.pax[index]);
                }
            }
            if (passengerInside.length >= 1) {
                showPassengerListAsCard(passengerInside, document.querySelector(".fav-passengers-result"));
                document.querySelector("#fav-passengers").classList.remove("d-none");
            }
            else {
                document.querySelector("#fav-passengers").classList.add("d-none")
            }
        }
    });
};
/**
 * Muestra la página siguiente de naves en Discover
 */
const nextListener = () => {
    document.querySelector(".starships-next").addEventListener("click", (e) => {
        e.preventDefault();
        getDiscover(data.discover.next, saveDiscoverData);
    });
};
/**
 * Muestra la página anterior de naves en Discover
 */
const previousListener = () => {
    document
        .querySelector(".starships-previous")
        .addEventListener("click", (e) => {
            e.preventDefault();
            getDiscover(data.discover.previous, saveDiscoverData);
        });
};
/**
 * Muestra la página siguiente de personajes al agregar pasajeros
 */
const nextPassengerListener = () => {
    document.querySelector(".passengers-next").addEventListener("click", (e) => {
        e.preventDefault();
        getDiscover(data.people.next, savePassengerData);
    });
};
/**
 * Muestra la página anterior de personajes al agregar pasajeros
 */
const previousPassengerListener = () => {
    document
        .querySelector(".passengers-previous")
        .addEventListener("click", (e) => {
            e.preventDefault();
            getDiscover(data.people.previous, savePassengerData);
        });
};
/**
 * Muestra los resultados obtenidos de la búsqueda de naves o de pasajeros
 */
const searchListener = () => {
    let searchPanel = document.querySelector("#search");
    document.forms.search.addEventListener("submit", (e) => {
        e.preventDefault();
        let input = document.forms.search.querySelector("input");
        fetch(baseSwapi + searchParam + input.value)
            .then((response) => response.json())
            .then((data) => {
                if (data.count > 0) {
                    switch (searchParam) {
                        case "starships/?search=":
                            searchPanel.classList.remove("d-none");
                            saveStarshipSearchData(data);
                            break;
                        case "people/?search=":
                            searchPanel.classList.remove("d-none");
                            savePassengerSearchData(data);
                            break;
                    }
                }
            })
            .catch((err) => {
                console.log("Could not retrieve results based on search input.");
            });
    });

    searchPanel.querySelector(".close-search").addEventListener("click", (e) => {
        searchPanel.classList.add("d-none");
    });
};

/**
 * Agrega los listeners necesarios
 */
const addListeners = () => {
    nextListener();
    previousListener();
    searchListener();
    favStarshipListener();
    nextPassengerListener();
    previousPassengerListener();
    addPassengersListener();
    checkPassengersListener();
};

/**
 * Configura todo lo necesario para que la APP funcione
 */
const App = () => {
    addListeners();
    data = JSON.parse(localStorage.getItem("data")) || {
        favs: [],
        pax: [],
        passengers: [],
        lengthAux: 0,
    };
    showListAsCard(data.favs, document.querySelector(".favs-result"));
    const endPointStarships = baseSwapi + `starships/`;
    getDiscover(endPointStarships, saveDiscoverData);
};

window.onload = App;