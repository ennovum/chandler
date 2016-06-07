class LoadingComponent {
    constructor($scope) {
        this._$scope = $scope;

        this.promise; // via bindings
        this.progress; // via bindings
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
            let lastPromise = this.promise;

            this.promise.then(() => {
                if (lastPromise === this.promise) {
                    this.isLoading = false;
                    this._$scope.$apply(); // async promise
                }
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
        <span class="loading-label">Loading... {{ctrl.progress * 100 | number:0}}%</span>
        <a class="loading-abort" ng-click="ctrl.abort()" ng-if="ctrl.isAbortable && !ctrl.isAborted">Stop &#10060;</a>
    </div>
`;

const controller = (...args) => new LoadingComponent(...args);
controller.$inject = ["$scope"];

const component = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        promise: "=",
        progress: "=",
        isAbortable: "=",
        onAbort: "&"
    }
};

LoadingComponent.component = component;

export default LoadingComponent;
export {LoadingComponent};
