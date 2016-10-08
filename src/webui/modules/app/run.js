import lang from 'lang';

function run(i18n) {
    i18n.setLang(lang);
}
run.$inject = ['i18n'];

export default run;
export {run};
