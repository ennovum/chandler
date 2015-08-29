require("es6-promise").polyfill();
import App from "./app/app.js";

let app = new App();

window.addEventListener("load", () => {
    app.run();
});
