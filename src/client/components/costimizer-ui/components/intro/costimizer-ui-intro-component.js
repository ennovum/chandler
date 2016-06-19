import _ from 'lodash';

class CostimizerUiIntroComponent {
    constructor($scope, $element) {
        this._el = $element[0];

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
            <input class="input-text search-query-input search-query-add-input" type="text" ng-model="ctrl.model.newQuery.phrase" placeholder="Enter a query" on-enter="ctrl.addQuery()" autofocus />
            <button class="icon-button" ng-click="ctrl.addQuery()">
                <span>&#128270; Search</span>
            </button>
        </section>
        <section class="search-intro-section search-intro-add">
            <button class="icon-button" ng-click="ctrl.addQuery()">
                <span>&#10133; Add another search</span>
            </button>
        </section>
        <section class="search-intro-section search-intro-description">
            <p>Welcome! <strong>Chandler</strong> lets you search products on <strong>Allegro</strong> & <strong>Ceneo</strong> in one place.</p>
            <p>What is uniqe about <strong>Chandler</strong> is that you can specify <strong>multiple searches</strong> and you will receive results from <strong>sellers that offer everything</strong> you are looking for.</p>
        </section>
    </section>
`;

const controller = (...args) => new CostimizerUiIntroComponent(...args);
controller.$inject = ['$scope', '$element'];

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
