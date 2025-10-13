export function fetchWorks() {
  return fetch("http://localhost:5678/api/works")
    .then(response => response.json());
};

export function fetchCategories() {
  return fetch('http://localhost:5678/api/categories')
    .then(response => response.json());
};

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


export function showAllWorks() {
//fonction permettant de tout afficher
        fetchWorks().then(works => {
        document.querySelector(".gallery").innerHTML = '';
        displayWorks(works, document.querySelector(".gallery"))
        
    });
}

export function activeStyleButton(element, defaultClassName, newClassName) {
  document.querySelectorAll('.' + defaultClassName).forEach(btn => btn.classList.remove(newClassName));
  element.classList.add(newClassName);
}