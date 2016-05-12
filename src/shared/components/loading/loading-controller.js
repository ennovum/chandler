class LoadingController {
    constructor($scope, $q) {
        this._$scope = $scope;
        this._$q = $q;

        this.promise; // via attribute
        this.isAbortable; // via attribute
        this.onAbort; // via attribute

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

LoadingController.controller = (...args) => new LoadingController(...args);
LoadingController.controller.$inject = ["$scope", "$q"];

export default LoadingController;
export {LoadingController};
