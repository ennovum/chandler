import {
    AllegroHandler
} from "./../components/allegro-handler/allegro-handler.js";

import {
    AllegroProxyHandler
} from "./../components/allegro-proxy-handler/allegro-proxy-handler.js";

import {
    AllegroCostimizer
} from "./../../shared/components/allegro-costimizer/allegro-costimizer.js";

import {
    Fetcher
} from "./../../shared/components/fetcher/fetcher.js";

function depend(injector) {
    injector.register("allegroHandler", AllegroHandler.factory);
    injector.register("allegroProxyHandler", AllegroProxyHandler.factory);
    injector.register("allegroCostimizer", AllegroCostimizer.factory);
    injector.register("fetcher", Fetcher.factory);
}

export default depend;
export {depend};
