//fonction fetch pour recuperer les works et categories


export function fetchWorks() {
  return fetch("http://localhost:5678/api/works")
    .then(response => response.json());
};

export function fetchCategories() {
  return fetch('http://localhost:5678/api/categories')
    .then(response => response.json());
};

//fonction d'affichage des works

export function displayWorks (worksToDisplay, destination) {
     worksToDisplay.forEach(work => {
            const figure = document.createElement("figure");
            figure.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}" />
            <figcaption>${work.title}</figcaption>
            `;
            destination.appendChild(figure);
});
};


//
export function allButtonCreation () {
  const filtersContainer = document.querySelector(".filters");
const buttonFiltersReset = document.createElement("button");
buttonFiltersReset.textContent = "Tous";
buttonFiltersReset.id = "idButton-0";
buttonFiltersReset.classList.add('filters-button');
filtersContainer.appendChild(buttonFiltersReset);
return buttonFiltersReset;

};


//fonction permettant de tout afficher

export function showAllWorks() {
        fetchWorks().then(works => {
        document.querySelector(".gallery").innerHTML = '';
        displayWorks(works, document.querySelector(".gallery"))
        
    });
};

//fonction pour le style des boutons
export function activeStyleButton(element, defaultClassName, newClassName) {
  document.querySelectorAll('.' + defaultClassName).forEach(btn => btn.classList.remove(newClassName));
  element.classList.add(newClassName);
};

//fonction de verification de login
export function logVerification (){
  const token = localStorage.getItem('token');
  if (!!token && token !=='null'){
    return true;
  }
  return false;
};
//fonction de clear localstorage au logout
export function clearLogData() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};

//fonction pour changer le lien login en logout
export function loginLinkChanger() {
    const loginLink = document.getElementById("login-link");
    loginLink.href = "#";
    loginLink.textContent = "logout";
    return loginLink;
}
//fonction pour faire apparaitre la bannière d'édition

export function bannerAppear () {
    const header = document.querySelector("header");
    const editionBanner = document.createElement("button");
    editionBanner.classList.add("edition-banner");
    editionBanner.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>
    <p>Mode édition</p>`;
    header.prepend(editionBanner);
    return editionBanner;
}

