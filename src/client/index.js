import es6Promise from "es6Promise";
import App from "./components/app/app.js";

es6Promise.polyfill();

window.addEventListener("load", () => {
    let app = new App();
    app.run();
});
