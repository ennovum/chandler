class TrustFilter {
    constructor($sce) {
        return (value) => $sce.trustAsHtml(value);
    }
}

const filter = (...args) => new TrustFilter(...args);
filter.$inject = ['$sce'];

TrustFilter.filter = filter;

export default TrustFilter;
export {TrustFilter};
