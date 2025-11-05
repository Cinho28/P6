//fonction fetch pour recuperer les works et categories

export function fetchWorks() {
  return fetch("http://localhost:5678/api/works").then((response) =>
    response.json()
  );
}

export function fetchCategories() {
  return fetch("http://localhost:5678/api/categories").then((response) =>
    response.json()
  );
}

//fonction d'affichage des works

export function displayWorks(worksToDisplay, destination, figcaptionBoolean) {
  worksToDisplay.forEach((work) => {
    const figure = document.createElement("figure");
    figure.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}" class="work-image" id="${work.id}" />
            `;

    if (figcaptionBoolean === true) {
      figure.innerHTML += `<figcaption>${work.title}</figcaption>`;
    } else {
      // do nothing
    }
    destination.appendChild(figure);
  });
}

//fonction permettant de tout afficher

export function showAllWorks(destination, figcaptionBoolean) {
  return fetchWorks().then((works) => {
    document.querySelector(destination).innerHTML = "";
    displayWorks(works, document.querySelector(destination), figcaptionBoolean);
  });
}

//fonction pour le style des boutons
export function activeStyleButton(element, defaultClassName, newClassName) {
  document
    .querySelectorAll("." + defaultClassName)
    .forEach((btn) => btn.classList.remove(newClassName));
  element.classList.add(newClassName);
}

//fonction de verification de login
export function logVerification() {
  const token = localStorage.getItem("token");
  if (!!token && token !== "null") {
    return true;
  }
  return false;
}
//fonction de clear localstorage au logout
export function clearLogData() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
}

//fonction pour changer le lien login en logout
export function loginLinkChanger() {
  const loginLink = document.getElementById("login-link");
  loginLink.href = "#";
  loginLink.textContent = "logout";
  return loginLink;
}
//fonction pour faire apparaitre la bannière d'édition

export function buttonModalAppear(
  containerQuerySelector,
  buttonName,
  classname
) {
  const container = document.querySelector(containerQuerySelector);
  buttonName = document.createElement("button");
  buttonName.classList.add(classname);
  buttonName.classList.add("open-modal");
  if (buttonName.classList.contains("edition-banner")) {
    buttonName.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>
    <p>Mode édition</p>`;
  }
  if (buttonName.classList.contains("edition-button")) {
    buttonName.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>
    <p>modifier</p>`;
  }
  container.prepend(buttonName);
  return buttonName;
}
//fonction pour ouvrir et fermer la modal
export function openModal(e, modal) {
  e.preventDefault();
  modal.classList.replace("modal-hidden", "modal-active");
  modal.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
}

export function closeModal(e, modal) {
  if (modal == null) return;
  document.querySelector(".edition-button").focus();
  e.preventDefault();
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-modal", "false");
  modal.classList.replace("modal-active", "modal-hidden");
  modal.removeEventListener("click", closeModal);
}
export function deleteWork(workId) {
  const token = localStorage.getItem("token");
  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    if (res.ok) {
      alert("Œuvre supprimée avec succès !");
      e.preventDefault();
      refreshModalContent();
      showAllWorksModal(".gallery-modal", false);
    } else {
      alert("Échec de la suppression de l'œuvre.");
    }
  });
}

//fonction pour afficher les works dans la modal avec icone de suppression
export function showAllWorksModal(destination, figcaptionBoolean) {
  showAllWorks(destination, figcaptionBoolean).then(() => {
    const pictures = document.querySelectorAll(".gallery-modal figure");
    pictures.forEach((picture) => {
      const div = document.createElement("div");
      div.classList.add("trash-icon-container");
      div.alt = "Supprimer";
      div.dataset.id = picture.querySelector("img").id;
      const trashIcon = document.createElement("img");
      trashIcon.src = "assets/icons/trash.png";
      trashIcon.classList.add("trash-icon");
      div.appendChild(trashIcon);
      picture.appendChild(div);
      document.querySelectorAll(".trash-icon-container").forEach((btn) =>
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const token = localStorage.getItem("token");
          fetch(`http://localhost:5678/api/works/${btn.dataset.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }).then((res) => {
            if (res.ok) {
              alert("Œuvre supprimée avec succès !");
              e.preventDefault();
              refreshModalContent();
              showAllWorksModal(".gallery-modal", false);
              showAllWorks(".gallery", true);
            } else {
              alert("Échec de la suppression de l'œuvre.");
            }
          });
        })
      );
    });
  });
}

export function createReturnButton(destination) {
  const returnButton = document.createElement("button");
  returnButton.id = "return-modal";
  returnButton.classList.add("return-button");
  const returnIcon = document.createElement("img");
  returnIcon.src = "./assets/icons/arrow-left.png";
  returnIcon.alt = "Retour";
  returnIcon.classList.add("return-icon");
  destination.prepend(returnButton);
  returnButton.appendChild(returnIcon);
  return returnButton;
}

export function toggleStyleButton(element, defaultClassName, newClassName) {
  element.classList.add(newClassName);
  element.classList.remove(defaultClassName);
}

export function refreshModalContent() {
  const submitModalButton = document.querySelector(".submit-modal");
  const galleryModal = document.createElement("div");
  const modalContent = document.querySelector(".modal-content");
  const returnButton = document.querySelector(".return-button");
  modalContent.innerHTML = "";
  galleryModal.classList.add("gallery-modal");
  modalContent.appendChild(galleryModal);
  showAllWorksModal(".gallery-modal", false);
  const titleModal = document.getElementById("title-modal");
  titleModal.textContent = "Galerie photo";
  submitModalButton.textContent = "Ajouter une photo";
  const Uploader = document.querySelector(".uploader");
  toggleStyleButton(
    submitModalButton,
    "submit-modal-incomplete",
    "submit-modal-complete"
  );
  if (returnButton) {
    returnButton.remove();
  }
}
