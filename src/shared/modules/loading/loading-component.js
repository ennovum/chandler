class LoadingComponent {
    constructor($scope, i18n) {
        this._$scope = $scope;

        this.lang = i18n.getLang('loading');

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
        <span class="loading-label">
            {{ctrl.lang.loadingLabel}}
            {{ctrl.progress * 100 | number:0}}%</span>
        <a class="loading-abort" ng-click="ctrl.abort()" ng-if="ctrl.isAbortable && !ctrl.isAborted">
            &#10060; {{ctrl.lang.abortLabel}}
        </a>
    </div>
`;

const controller = (...args) => new LoadingComponent(...args);
controller.$inject = ['$scope', 'i18n'];

const component = {
    template,
    controller,
    controllerAs: 'ctrl',
    bindings: {
        promise: '=',
        progress: '=',
        isAbortable: '=',
        onAbort: '&'
    }
};

LoadingComponent.component = component;

export default LoadingComponent;
export {LoadingComponent};
