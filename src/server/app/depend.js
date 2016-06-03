import {
    config
} from "./../config/config.js";

import {
    ProxyHandler
} from "./../components/proxy-handler/proxy-handler.js";

import {
    Fetcher
} from "./../../shared/components/fetcher/fetcher.js";

function depend(injector) {
    injector.set("config", config);
    injector.register("proxyHandler", ProxyHandler.factory);
    injector.register("fetcher", Fetcher.factory);
}

export default depend;
export {depend};
