import _ from 'lodash';
import lang from 'lang';

class CostimizerUiResultsComponent {
    constructor($scope) {
        this.queries; // via bindings
        this.results; // via bindings

        this.lang = lang.costimizerUiResults;

        this.sortedResults = null;
        this.selectedResultIds = [];

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
        this.selectedResultIds.push(result.id);
    }

    deselectResult(result) {
        let index = this.selectedResultIds.indexOf(result.id);
        if (index !== -1) {
            this.selectedResultIds.splice(index, 1);
        }
    }

    isSelectedResult(result) {
        let index = this.selectedResultIds.indexOf(result.id);
        return index !== -1;
    }

    toggleResult(result) {
        this.isSelectedResult(result) ? this.deselectResult(result) : this.selectResult(result);
    }
}

const template = `
    <table class="grid results-items-grid" ng-if="ctrl.results">
        <tr class="grid-row">
            <td class="grid-head grid-label">
                {{ctrl.lang.sellersLabel(ctrl.sortedResults.length)}}
            </td>
            <td class="grid-head" ng-repeat="query in ctrl.queries track by $index">
                {{ctrl.lang.offersLabel(query.phrase)}}
            </td>
        </tr>
        <tr class="grid-row" ng-repeat="result in ctrl.sortedResults">
            <td class="grid-head grid-label">
                <a ng-href="{{result.seller.url}}" target="_blank">{{result.seller.name}}</a>
            </td>
            <td class="clickable grid-cell"
                ng-repeat="offer in result.offers track by $index"
                ng-click="ctrl.toggleResult(result)"
            >
                <div>
                    {{ctrl.lang.offersCountLabel(offer.items.length)}}
                </div>
                <div ng-repeat="price in offer.prices">
                    <span ng-if="price.minimum === price.maximum">
                        <price value="price.minimum" currency="price.currency"></price>
                    </span>
                    <span ng-if="price.minimum !== price.maximum">
                        <price value="price.minimum"></price> - <price value="price.maximum" currency="price.currency"></price>
                    </span>
                </div>
                <ol class="results-offers" ng-if="ctrl.isSelectedResult(result)">
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
                <span>{{ctrl.lang.noResultsLabel}}</span>
            </td>
        </tr>
    </table>
`;

const controller = (...args) => new CostimizerUiResultsComponent(...args);
controller.$inject = ['$scope'];

const component = {
    template,
    controller,
    controllerAs: 'ctrl',
    bindings: {
        queries: '<',
        results: '<'
    }
};

CostimizerUiResultsComponent.component = component;

export default CostimizerUiResultsComponent;
export {CostimizerUiResultsComponent};
