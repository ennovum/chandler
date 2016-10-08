import es6Promise from 'es6Promise';

import App from './app/app';

es6Promise.polyfill();

window.addEventListener('load', () => {
    let app = new App();
    app.run();
});
