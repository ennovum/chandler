import _ from "lodash";

class CostimizerUiResultsComponent {
    constructor($scope) {
        this.queries; // via bindings
        this.results; // via bindings

        this.sortedResults = null;
        this.selectedResultId = null;

        $scope.$watch(() => this.results, () => this._evalResults());
    }

    _evalResults() {
        this.sortedResults = _.clone(this.results);
        this.sortedResults = _.sortBy(this.sortedResults, (result) => {
            return _.reduce(result.offers, (minimum, offer) => minimum + offer.prices[0].minimum, 0);
        });
        this.sortedResults.forEach((result) => {
            result.offers.forEach((offer) => {
                offer.items = _.sortBy(offer.items, (item) => item.price.value);
            });
        });
    }

    selectResult(result) {
        this.selectedResultId = result.id;
    }

    deselectResult(result) {
        this.selectedResultId = null;
    }

    isSelectedResult(result) {
        return this.selectedResultId === result.id;
    }

    toggleResult(result) {
        this.isSelectedResult(result) ? this.deselectResult(result) : this.selectResult(result);
    }
}

const template = `
    <div class="cards results-cards" ng-if="ctrl.results.length">
        <div class="card" ng-class="{'expanded-card': ctrl.isSelectedResult(result)}"
            ng-repeat="result in ctrl.sortedResults"
        >
            <div class="clickable card-head"
                ng-click="ctrl.toggleResult(result)"
            >
                <a ng-href="{{result.seller.url}}" target="_blank">{{result.seller.name}}</a>
            </div>
            <div class="clickable card-body card-raw-body"
                ng-click="ctrl.toggleResult(result)"
                ng-if="!ctrl.isSelectedResult(result)"
            >
                <table class="grid naked-grid compact-grid results-summary-grid">
                    <tr class="grid-row" ng-repeat="offer in result.offers track by $index">
                        <td class="grid-head">
                            "{{offer.query}}"
                        </td>
                        <td class="grid-cell">
                            <div>
                                <span ng-if="offer.items.length === 1">1 offer</span>
                                <span ng-if="offer.items.length > 1">{{offer.items.length}} offers</span>
                            </div>
                            <div ng-repeat="price in offer.prices">
                                <span ng-if="price.minimum === price.maximum">
                                    <price value="price.minimum" currency="price.currency"></price>
                                </span>
                                <span ng-if="price.minimum !== price.maximum">
                                    <price value="price.minimum"></price> - <price value="price.maximum" currency="price.currency"></price>
                                </span>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="card-body card-raw-body"
                ng-if="ctrl.isSelectedResult(result)"
            >
                <table class="grid naked-grid results-items-grid">
                    <tr class="grid-row">
                        <td class="grid-head" ng-repeat="query in ctrl.queries track by $index">
                            "{{query}}"
                        </td>
                    </tr>
                    <tr class="grid-row">
                        <td class="grid-cell" ng-repeat="offer in result.offers track by $index">
                            <ol>
                                <li class="results-offer" ng-repeat="item in offer.items track by $index">
                                    <div>
                                        <a ng-href="{{item.url}}" target="_blank">{{item.title}}</a>
                                    </div>
                                    <div>
                                        <price value="item.price.value" currency="item.price.currency"></price>
                                    </div>
                                </li>
                            </ol>
                        </td>
                    </tr>
                    <tr class="grid-row" ng-if="!ctrl.results.length">
                        <td class="grid-cell" colspan="{{1 + ctrl.queries.length}}">
                            <span>No results</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
`;

const controller = (...args) => new CostimizerUiResultsComponent(...args);
controller.$inject = ["$scope"];

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
