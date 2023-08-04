import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from "./en.json";
import vn from "./vn.json";
import es from "./es.json";
const Languages = ['en','vn', 'es'];

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    supportedLngs: ["en", "vn", "es"], // *** added this ***
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: en
      },
      vn: {
        translation: vn
      },
      es: {
        translation: es
      }
    }
  });

export default i18n;