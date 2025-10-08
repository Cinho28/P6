import { showAllWorks } from "./Function.js";

showAllWorks();

fetch ('http://localhost:5678/api/categories')
.then(reponse => reponse.json())
.then (categories => {
const filtersContainer = document.querySelector(".filters");
const buttonFiltersReset = document.createElement("button");
buttonFiltersReset.textContent = "Tous";
filtersContainer.appendChild(buttonFiltersReset);
buttonFiltersReset.addEventListener("click", () => {
  showAllWorks();
});


categories.forEach (categories =>{
const buttonFilter = document.createElement("button");
buttonFilter.textContent = categories.name;
buttonFilter.id = "idButton-" + categories.id
filtersContainer.appendChild(buttonFilter);


fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(works => {
buttonFilter.addEventListener("click", () => {
  document.querySelector(".gallery").innerHTML = '';
  const resultat = works.filter(works => works.category.name === categories.name);
  resultat.forEach(works => {
    const figure = document.createElement("figure");
        figure.innerHTML = `
      <img src="${works.imageUrl}" alt="${works.title}" />
      <figcaption>${works.title}</figcaption>
    `;
    document.querySelector(".gallery").appendChild(figure);
  });

});
});


});






});
