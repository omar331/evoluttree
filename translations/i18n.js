import i18n from 'i18next/index';
import { initReactI18next } from "react-i18next/src/index";
import {en_US} from "./translations-en";
import {pt_BR} from "./translations-pt_BR";
import {pt_PT} from "./translations-pt_PT";
import {es_ES} from "./translations-es";

i18n
    .use(initReactI18next)
    .init({
        lng: window.userLocale,
        debug: true,
        resources: {
            en_US: en_US,
            es_ES: es_ES,
            pt_BR: pt_BR,
            pt_PT: pt_PT,
        },
    });

export default i18n;