import _ from "lodash";
import angular from "angular";

import AllegroClient from "./allegro-client.js";

angular
    .module("allegro", [])
    .service("allegroClient", AllegroClient.service);
