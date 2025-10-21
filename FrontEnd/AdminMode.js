import { logVerification } from './Function.js';
import { clearLogData } from './Function.js';
import { loginLinkChanger } from './Function.js';
import { bannerAppear } from './Function.js';

(function uiLogChanger (){
    if (!logVerification()) return;
    const editionBanner = bannerAppear();
    const loginLink = loginLinkChanger();
    
    editionBanner.addEventListener("click", () => {
    });

    loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        clearLogData();
        window.location.href = "./index.html";
    });
})();




