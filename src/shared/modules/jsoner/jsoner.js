const jsoner = {
    parse(subject, alt) {
        try {
            return window.JSON.parse(subject);
        }
        catch (err) {
            return alt;
        }
    },
    stringify(subject, alt) {
        try {
            return window.JSON.stringify(subject);
        }
        catch (err) {
            return alt;
        }
    }
};

export default jsoner;
export {jsoner};
