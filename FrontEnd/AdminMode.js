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
  createNextStepButton,
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
  const nextStepButton = document.querySelector(".modal-buttons");
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
  createNextStepButton();
})();
