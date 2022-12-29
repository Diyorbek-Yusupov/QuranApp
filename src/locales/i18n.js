import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
   // detect user language
   // learn more: https://github.com/i18next/i18next-browser-languageDetector
   .use(LanguageDetector)
   // pass the i18n instance to react-i18next.
   .use(initReactI18next)
   // init i18next
   // for all options read: https://www.i18next.com/overview/configuration-options
   .init({
      debug: true,
      fallbackLng: "en",
      interpolation: {
         escapeValue: false, // not needed for react as it escapes by default
      },
      resources: {
         en: {
            translation: {
               lng: "Language",
               Koran: "Koran",
               prayTime: "Prayer times",
               homePage: {
                  pageName: "Home",
                  subtitle: "Learn Quran and Recite once everyday",
               },
               surahPage: {
                  pageName: "Koran Surahs",
                  placeholder: "Which surah do you want to read?",
                  ayah: "{{numberOfAyahs}} ayahs",
               },
            },
         },
         uz: {
            translation: {
               lng: "Til",
               Koran: "Quron",
               prayTime: "Namoz vaqtlari",
               homePage: {
                  pageName: "Bosh sahifa",
                  subtitle:
                     "Qur'on o'rganing va har kuni bir marta tilovat qiling",
               },
               surahPage: {
                  pageName: "Quron suralari",
                  placeholder: "Qaysi surani o'qishni hoxlaysiz?",
                  ayah: "{{numberOfAyahs}} ta oyat",
               },
            },
         },
         ru: {
            translation: {
               lng: "Язык",
               Koran: "Коран",
               prayTime: "Время молитвы",
               homePage: {
                  pageName: "Главная",
                  subtitle: "Изучайте Коран и читайте его один раз в день",
               },
               surahPage: {
                  pageName: "Суры Корана",
                  placeholder: "Какую суру вы хотите прочитать?",
                  ayah: "{{numberOfAyahs}} аятов",
               },
            },
         },
      },
   });

export default i18n;
