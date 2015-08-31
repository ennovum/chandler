import injector from "injector";

import AllegroHandler from "./allegro-handler.js";
import AllegroWebapiClient from "./allegro-webapi-client.js";
import AllegroCostimizer from "./allegro-costimizer.js";

injector.register("allegroHandler", AllegroHandler.factory);
injector.register("allegroWebapiClient", AllegroWebapiClient.factory);
injector.register("allegroCostimizer", AllegroCostimizer.factory);
