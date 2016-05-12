class LoadingComponent {
    constructor($scope, $q) {
        this._$scope = $scope;
        this._$q = $q;

        this.promise; // via bindings
        this.isAbortable; // via bindings
        this.onAbort; // via bindings

        this.isAborted = false;

        this._$scope.$watch(() => this.promise, () => {
            this.reload();
        });
    }

    reload() {
        this.isLoading = true;
        this.isAborted = false;

        if (this.promise) {
            this.promise.then(() => {
                this.isLoading = false;
                this._$scope.$apply(); // async promise
            });
        }
        else {
            this.isLoading = false;
        }
    }

    abort() {
        this.isAborted = true;
        this.onAbort();
    }
}

const template = `
    <div class="loading" ng-if="ctrl.isLoading">
        <span>Loading...</span>
        <a ng-click="ctrl.abort()" ng-if="ctrl.isAbortable && !ctrl.isAborted">Abort</a>
    </div>
`;

const controller = (...args) => new LoadingComponent(...args);
controller.$inject = ["$scope", "$q"];

const component = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        promise: "=",
        isAbortable: "=",
        onAbort: "&"
    }
};

LoadingComponent.component = component;

export default LoadingComponent;
export {LoadingComponent};
