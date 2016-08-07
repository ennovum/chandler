import _ from 'lodash';

class CostimizerUiIntroComponent {
    constructor($scope, i18n) {
        this.lang = i18n.getLang('costimizerUiIntro');

        this.onSubmit; // via bindings

        this.queries = [];
        this.model = {
            newQuery: null
        };

        this._resetNewQuery();
    }

    _resetNewQuery() {
        this.model.newQuery = {phrase: ''};
    }

    addQuery() {
        let phrase = this.model.newQuery.phrase;

        this.queries.push({phrase});

        this._resetNewQuery();
        this._submitQueries();
    }

    _submitQueries() {
        let queries = _.clone(this.queries);
        this.onSubmit({queries});
    }
}

const template = `
    <section class="search-intro-form">
        <section class="buttonset search-query-buttonset search-intro-section">
            <input type="text" class="input-text search-query-input search-query-add-input"
                ng-model="ctrl.model.newQuery.phrase" placeholder="{{ctrl.lang.queryPlaceholder}}"
                on-enter="ctrl.addQuery()" autofocus />
            <button class="icon-button" ng-click="ctrl.addQuery()">
                <span>&#128270; {{ctrl.lang.searchLabel}}</span>
            </button>
        </section>
        <section class="search-intro-section search-intro-add">
            <button class="icon-button" ng-click="ctrl.addQuery()">
                <span>&#10133; {{ctrl.lang.searchAddLabel}}</span>
            </button>
        </section>
        <section class="search-intro-section search-intro-description" ng-bind-html="ctrl.lang.introHTML | trust">
        </section>
    </section>
`;

const controller = (...args) => new CostimizerUiIntroComponent(...args);
controller.$inject = ['$scope', 'i18n'];

const component = {
    template,
    controller,
    controllerAs: 'ctrl',
    bindings: {
        onSubmit: '&'
    }
};

CostimizerUiIntroComponent.component = component;

export default CostimizerUiIntroComponent;
export {CostimizerUiIntroComponent};
