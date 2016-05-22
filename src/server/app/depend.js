import {
    AllegroProxyHandler
} from "./../components/allegro-proxy-handler/allegro-proxy-handler.js";

import {
    Fetcher
} from "./../../shared/components/fetcher/fetcher.js";

function depend(injector) {
    injector.register("allegroProxyHandler", AllegroProxyHandler.factory);
    injector.register("fetcher", Fetcher.factory);
}

export default depend;
export {depend};
