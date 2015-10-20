import costimizerTpl from "./views/costimizer.html";

let routing = {
    "defaultPath": "/costimizer",
    "routes": {
        "/costimizer": {
            "template": costimizerTpl
        }
    }
};

export default routing;
export {routing};
