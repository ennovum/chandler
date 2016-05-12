class CostimizerUiResultsComponent {
    constructor() {
        this.queries; // via bindings
        this.results; // via bindings
    }
}

const template = `
    <table class="grid" ng-show="ctrl.results">
        <tr class="grid-row">
            <td class="grid-head">
                Sellers
            </td>
            <td class="grid-head" colspan="{{ctrl.queries.length}}">
                Offers
            </td>
        </tr>
        <tr class="grid-row">
            <td class="grid-head">
            </td>
            <td class="grid-head" ng-repeat="query in ctrl.queries track by $index">
                "{{query}}"
            </td>
        </tr>
        <tr class="grid-row" ng-repeat="result in ctrl.results" ng-if="ctrl.results.length">
            <td class="grid-cell">
                <a ng-href="{{result.seller.url}}" target="_blank">{{result.seller.login}}</a>
            </td>
            <td class="grid-cell" ng-repeat="offer in result.offers track by $index">
                <ul class="results-offers">
                    <li class="results-offer" ng-repeat="item in offer.items track by $index">
                        <a ng-href="{{item.url}}" target="_blank">{{item.title}}</a>
                    </li>
                </ul>
            </td>
        </tr>
        <tr class="grid-row" ng-if="!ctrl.results.length">
            <td class="grid-cell" colspan="{{1 + ctrl.queries.length}}">
                <span>No results</span>
            </td>
        </tr>
    </table>
`;

const controller = (...args) => new CostimizerUiResultsComponent(...args);
controller.$inject = [];

const component = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        queries: "=",
        results: "="
    }
};

CostimizerUiResultsComponent.component = component;

export default CostimizerUiResultsComponent;
export {CostimizerUiResultsComponent};