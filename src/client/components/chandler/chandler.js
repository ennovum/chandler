import template from "./chandler.html";

class ChandlerDirective {
    constructor($scope, $element, $attrs, allegroClient) {
        this._$scope = $scope;
        this._$element = $element;
        this._$attrs = $attrs;
        this._allegroClient = allegroClient;

        this._$scope.model = {};

        this._$scope.submit = () => this.submit();
    }

    submit() {
        let query = this._$scope.model.query;

        this._allegroClient.getResults(query)
            .then((result) => {
                // TODO
            })
            .catch((err) => {
                // TODO
            });
    }
}

ChandlerDirective.directive = (allegroClient) => ({
    "restrict": "E",
    "replace": true,
    "template": template,
    "scope": {},
    "link": ($scope, $element, $attrs) => new ChandlerDirective($scope, $element, $attrs, allegroClient)
});
ChandlerDirective.directive.$inject = ["allegroClient"];

export default ChandlerDirective;
