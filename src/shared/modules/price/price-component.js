class PriceComponent {
    constructor($scope) {
        this.value; // via bindings
        this.currency; // via bindings

        this.textValue = '';
        this.textCurrency = '';

        $scope.$watch(() => this.value, () => this._evalValue())
        $scope.$watch(() => this.currency, () => this._evalCurrency())
    }

    _evalValue() {
        this.textValue = this.value.toFixed((this.value === ~~this.value) ? 0 : 2);
    }

    _evalCurrency() {
        this.textCurrency = this.currency;
    }
}

const template = `
    <span ng-if="ctrl.value">{{ctrl.textValue}}</span>
    <span ng-if="ctrl.currency">{{ctrl.textCurrency}}</span>
`;

const controller = (...args) => new PriceComponent(...args);
controller.$inject = ['$scope'];

const component = {
    template,
    controller,
    controllerAs: 'ctrl',
    bindings: {
        value: '=',
        currency: '='
    }
};

PriceComponent.component = component;

export default PriceComponent;
export {PriceComponent};
