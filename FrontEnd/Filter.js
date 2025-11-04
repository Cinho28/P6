import { showAllWorks } from "./Function.js";
import { fetchWorks } from "./Function.js";
import { fetchCategories } from "./Function.js";
import { displayWorks } from "./Function.js";
import { activeStyleButton } from "./Function.js";
import { logVerification } from "./Function.js";

showAllWorks(".gallery", true); //affiche tout par default

//creation du bouton "tout" avec la fonction showAllWork en effet
(function () {
  if (logVerification()) return;

  fetchCategories().then((categories) => {
    const filtersContainer = document.querySelector(".filters");
    const buttonFiltersReset = document.createElement("button");
    buttonFiltersReset.textContent = "Tous";
    buttonFiltersReset.id = "idButton-0";
    buttonFiltersReset.classList.add("filters-button");
    filtersContainer.appendChild(buttonFiltersReset);
    buttonFiltersReset.addEventListener("click", () => {
      activeStyleButton(buttonFiltersReset, "filters-button", "filters-active");
      showAllWorks(".gallery", true);
    });

    //création de chaque boutton par nombre de categories
    categories.forEach((categories) => {
      const buttonFilter = document.createElement("button");
      buttonFilter.textContent = categories.name;
      buttonFilter.id = "idButton-" + categories.id;
      buttonFilter.classList.add("filters-button");
      filtersContainer.appendChild(buttonFilter);

      //  et le nom du travail, si le resultat est true = afficher
      buttonFilter.addEventListener("click", () => {
        //changement de style du boutton au click
        activeStyleButton(buttonFilter, "filters-button", "filters-active");
        document.querySelector(".gallery").innerHTML = "";

        fetchWorks().then((works) => {
          const resultat = works.filter(
            (works) => works.category.name === categories.name
          );
          displayWorks(resultat, document.querySelector(".gallery"), true);
        });
      });
    });
  });
})();
