import conf from 'conf';
import lang from 'lang';

const configuration = conf;

function run(conf, i18n) {
    conf.setConf(configuration);
    i18n.setLang(lang);
}
run.$inject = ['conf', 'i18n'];

export default run;
export {run};
