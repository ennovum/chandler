import {
    AllegroHandler
} from "./../components/allegro-handler/allegro-handler.js";

import {
    AllegroWebapiClient,
    AllegroWebapiSanitizer
} from "./../../shared/components/allegro-webapi/allegro-webapi.js";

import {
    AllegroCostimizer
} from "./../../shared/components/allegro-costimizer/allegro-costimizer.js";

import {
    Fetcher
} from "./../../shared/components/fetcher/fetcher.js";

function depend(injector) {
    injector.register("allegroHandler", AllegroHandler.factory);
    injector.register("allegroWebapiClient", AllegroWebapiClient.factory);
    injector.register("allegroWebapiSanitizer", AllegroWebapiSanitizer.factory);
    injector.register("allegroCostimizer", AllegroCostimizer.factory);
    injector.register("fetcher", Fetcher.factory);
}

export default depend;
export {depend};
