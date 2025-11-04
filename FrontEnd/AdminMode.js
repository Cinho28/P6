import {
  logVerification,
  showAllWorks,
  toggleStyleButton,
  createReturnButton,
  showAllWorksModal,
  closeModal,
  openModal,
  buttonModalAppear,
  loginLinkChanger,
  clearLogData,
  refreshModalContent,
  fetchCategories,
  fetchWorks,
} from "./Function.js";

(function uiLogChanger() {
  if (!logVerification()) return;
  const editionBanner = buttonModalAppear(
    "Header",
    "edition-banner",
    "edition-banner"
  );
  const editionButton = buttonModalAppear(
    "#portfolio",
    "edition-button",
    "edition-button"
  );
  const loginLink = loginLinkChanger();

  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    clearLogData();
    window.location.href = "./index.html";
  });

  const closeModalButton = document.getElementById("close-modal");
  const navModal = document.querySelector(".nav-modal");
  const openModalButtons = document.querySelectorAll(".open-modal");
  const modal = document.getElementById("modal1");
  const modalWrapper = document.querySelector(".modal-wrapper");
  const submitModalButton = document.querySelector(".submit-modal");
  const titleModal = document.getElementById("title-modal");
  const modalContent = document.querySelector(".modal-content");

  openModalButtons.forEach((openModalButtons) => {
    openModalButtons.addEventListener("click", (e) => {
      openModal(e, modal);
      refreshModalContent();
    });
  });
  closeModalButton.addEventListener("click", (e) => {
    closeModal(e, modal);
  });
  modal1.addEventListener("click", (e) => {
    if (!modalWrapper.contains(e.target)) {
      closeModal(e, modal);
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e, modal);
    }
  });
  showAllWorksModal(".gallery-modal", false);

  submitModalButton.addEventListener("click", (e) => {
    if (submitModalButton.innerText === "Ajouter une photo") {
      e.preventDefault();
      submitModalButton.classList.remove("submit-modal-complete");
      submitModalButton.innerText = "Valider";
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
          });
        }
      });
    }

    //gestion de l'aperçu de l'image et conditionnement de la validation
    const fileInput = document.getElementById("file-input");
    const previewContainer = document.querySelector(".preview-container");
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
    const categorySelect = document.getElementById("category-select");
    const allInputs = [titleInput, categorySelect, fileInput];
    allInputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (
          titleInput.value &&
          categorySelect.value &&
          fileInput.files.length
        ) {
          toggleStyleButton(
            submitModalButton,
            "submit-modal-incomplete",
            "submit-modal-complete"
          );
        }
      });
    });
    submitModalButton.addEventListener("click", (e) => {
      if (submitModalButton.classList.contains("submit-modal-complete")) {
        e.preventDefault();
        if (!titleInput.value) {
          titleInput.classList.add("input-error");
          const errorMsg = document.createElement("div");
          errorMsg.classList.add("error-message");
          errorMsg.textContent = "Le titre est requis.";
          titleInput.parentElement.appendChild(errorMsg);
          return;
        }
        // Logique de soumission du formulaire
        if (e.target.length > 1) return; //évite les multiples envois
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
            alert("Œuvre ajoutée avec succès !");
            refreshModalContent();
            showAllWorksModal(".gallery-modal", false);
            showAllWorks(".gallery", true);
          } else {
            alert("Échec de l'ajout de l'œuvre.");
          }
        });
      }
    });
  });
})();
