import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import englishTranslation from "./Languages/english.json";
import hindiTranslation from "./Languages/hindi.json";
import gujaratiTranslation from "./Languages/gujarati.json";
import urduTranslation from "./Languages/urdu.json";
import teluguTranslation from "./Languages/telugu.json";
import tamilTranslation from "./Languages/tamil.json";
import kannadaTranslation from "./Languages/kannada.json";
import bengaliTranslation from "./Languages/bengali.json";
import marathiTranslation from "./Languages/marathi.json";
import malayalamTranslation from "./Languages/malayalam.json";

const resources = {
  en: {
    translation: englishTranslation,
  },
  fr: {
    translation: hindiTranslation,
  },
  tg: {
    translation: teluguTranslation,
  },
  tm: {
    translation: tamilTranslation,
  },
  kd: {
    translation: kannadaTranslation,
  },
  bn: {
    translation: bengaliTranslation,
  },
  ud: {
    translation: urduTranslation,
  },
  gt: {
    translation: gujaratiTranslation,
  },
  my: {
    translation: malayalamTranslation,
  },
  marathi: {
    translation: marathiTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
