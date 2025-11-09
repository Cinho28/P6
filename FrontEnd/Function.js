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
  });
}

export function toggleStyleButton(element, defaultClassName, newClassName) {
  element.classList.add(newClassName);
  element.classList.remove(defaultClassName);
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
      const trashButtons = document.querySelectorAll(".trash-icon-container");
      trashButtons.forEach((trashButton) => {
        trashButton.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const workId = trashButton.dataset.id;
          deleteWork(workId);
          refreshModalContent();
          showAllWorks(".gallery", true);
        });
      });
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

export function refreshModalContent() {
  const modalWrapper = document.querySelector(".modal-wrapper");
  const galleryModal = document.createElement("div");
  const modalContent = document.querySelector(".modal-content");
  const returnButton = document.querySelector(".return-button");
  const Uploader = document.querySelector(".uploader");
  modalContent.innerHTML = "";
  galleryModal.classList.add("gallery-modal");
  modalContent.appendChild(galleryModal);
  showAllWorksModal(".gallery-modal", false);
  const titleModal = document.getElementById("title-modal");
  titleModal.textContent = "Galerie photo";
  if (returnButton) {
    returnButton.remove();
  }
}

export function createSubmitButton() {
  const modalWrapper = document.querySelector(".modal-wrapper");
  const submitButton = document.createElement("button");
  submitButton.classList.add("modal-buttons", "button-inactive");
  submitButton.id = "submit-button";
  submitButton.textContent = "Valider";
  modalWrapper.appendChild(submitButton);
  return submitButton;
}

export function createNextStepButton() {
  const modalWrapper = document.querySelector(".modal-wrapper");
  const nextStepButton = document.createElement("button");
  nextStepButton.classList.add("modal-buttons", "button-active");
  nextStepButton.id = "next-step-button";
  nextStepButton.textContent = "Ajouter une photo";
  modalWrapper.appendChild(nextStepButton);
  nextStepButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const navModal = document.querySelector(".nav-modal");
    const nextStepButton = document.querySelector(".modal-buttons");
    const titleModal = document.getElementById("title-modal");
    const modalContent = document.querySelector(".modal-content");
    nextStepButton.remove();
    /*suppression du bouton next et création du button formulaire d'upload*/
    const submitButton = createSubmitButton();
    modalContent.innerHTML = "";
    titleModal.textContent = "Ajout photo";
    const Uploader = document.createElement("div");
    Uploader.classList.add("uploader");
    modalContent.appendChild(Uploader);
    const previewContainer = document.createElement("div");
    previewContainer.classList.add("preview-container");
    Uploader.appendChild(previewContainer);
    const formInputFilelogo = document.createElement("img");
    formInputFilelogo.src = "./assets/icons/File.png";
    formInputFilelogo.alt = "Icône d'upload d'image";
    formInputFilelogo.classList.add("file-logo");
    Uploader.appendChild(formInputFilelogo);
    //ajout des elements du uploader
    const buttonInputFile = document.createElement("label");
    buttonInputFile.setAttribute("for", "file-input");
    buttonInputFile.classList.add("file-button");
    buttonInputFile.textContent = "+ Ajouter photo";
    Uploader.appendChild(buttonInputFile);
    const formInputFileModal = document.createElement("input"); //input file a recuperer
    formInputFileModal.setAttribute("type", "file");
    formInputFileModal.setAttribute("accept", "image/png, image/jpeg");
    formInputFileModal.setAttribute("id", "file-input");
    formInputFileModal.setAttribute("name", "file-input");
    formInputFileModal.classList.add("file-input");
    buttonInputFile.appendChild(formInputFileModal);
    //ajout du label
    const formInputFileLabel = document.createElement("label");
    formInputFileLabel.setAttribute("for", "file-input");
    formInputFileLabel.textContent = "jpg, png : 4mo max";
    formInputFileLabel.classList.add("file-label");
    Uploader.appendChild(formInputFileLabel);
    //ajout du label titre
    const titresLabel = document.createElement("label");
    titresLabel.setAttribute("for", "title-input");
    titresLabel.textContent = "Titre";
    titresLabel.classList.add("title-label", "label-style");
    modalContent.appendChild(titresLabel);
    //ajout de l'input "titre"
    const titresInput = document.createElement("input"); //input titre a recuperer
    titresInput.setAttribute("type", "texte");
    titresInput.setAttribute("id", "title-input");
    titresInput.setAttribute("name", "title-input");
    titresInput.classList.add("title-input", "input-style");
    modalContent.appendChild(titresInput);
    //ajout du label categorie
    const categoryLabel = document.createElement("label");
    categoryLabel.setAttribute("for", "category-select");
    categoryLabel.textContent = "Catégorie";
    categoryLabel.classList.add("category-label", "label-style");
    modalContent.appendChild(categoryLabel);
    //ajout de la selection de categorie
    const categorySelect = document.createElement("select"); //select categorie a recuperer
    categorySelect.setAttribute("id", "category-select");
    categorySelect.setAttribute("name", "category-select");
    categorySelect.classList.add("category-select", "input-style");
    modalContent.appendChild(categorySelect);
    //remplissage des categories avec le backend
    fetchCategories().then((categories) => {
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.textContent = category.name;
        option.value = category.id;
        categorySelect.appendChild(option);
      });
      if (!document.querySelector(".return-button")) {
        const returnButton = createReturnButton(navModal);
        returnButton.addEventListener("click", (e) => {
          e.stopPropagation();
          e.preventDefault();
          refreshModalContent();
          submitButton.remove();
          createNextStepButton();
        });
      }

      //gestion de l'aperçu de l'image et conditionnement de la validation
      const fileInput = document.getElementById("file-input");
      fileInput.addEventListener("change", (e) => {
        const file = e.target?.files?.[0];
        if (!file) return;

        if (!/image\/(png|jpeg)/.test(file.type)) {
          alert("Veuillez sélectionner un fichier au format jpg ou png.");
          fileInput.value = "";
          return;
        }
        if (file.size > 4 * 1024 * 1024) {
          alert("La taille du fichier ne doit pas dépasser 4 Mo.");
          fileInput.value = "";
          return;
        }

        previewContainer.innerHTML = "";
        const imgPreview = document.createElement("img");
        imgPreview.alt = file.name;
        imgPreview.classList.add("preview-image");
        imgPreview.src = URL.createObjectURL(file);
        imgPreview.onload = () => {
          URL.revokeObjectURL(imgPreview.src);
        };
        previewContainer.appendChild(imgPreview);
        const inputUi = document.querySelectorAll(
          ".file-logo, .file-label, .file-button"
        );
        if (file) {
          inputUi.forEach((input) => {
            input.classList.add("display-none");
          });
        }
        previewContainer.classList.add("loaded");
      });
      //gestion des parametres de validation du bouton
      const titleInput = document.getElementById("title-input");
      const allInputs = [titleInput, categorySelect, fileInput];
      allInputs.forEach((input) => {
        input.addEventListener("input", () => {
          if (
            titleInput.value &&
            categorySelect.value &&
            fileInput.files.length
          ) {
            toggleStyleButton(submitButton, "button-inactive", "button-active");
          }
        });
      });
      submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (submitButton.classList.contains("button-active")) {
          // Logique de soumission du formulaire
          //évite les multiples envois
          const inputFile = document.getElementById("file-input");
          const token = localStorage.getItem("token");
          const formData = new FormData();
          formData.append("title", titleInput.value);
          formData.append("image", inputFile.files[0]);
          formData.append("category", categorySelect.value);
          const res = fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }).then((res) => {
            if (res.ok) {
              refreshModalContent();
              showAllWorks(".gallery", true);
              submitButton.remove();
              createNextStepButton();
            }
          });
        }
      });
    });
  });
}
