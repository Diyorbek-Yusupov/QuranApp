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
               tYear: "year",
               homePage: {
                  pageName: "Home",
                  subtitle: "Learn Quran and Recite once everyday",
               },
               surahPage: {
                  pageName: "Koran Surahs",
                  placeholder: "Which surah do you want to read?",
                  ayah: "{{numberOfAyahs}} ayahs",
               },
               weekdays: [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
               ],
               months: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
               ],
               prayTimes: ["Fajr", "Shuruk", "Dhuhr", "Asr", "Maghrib", "Isha"],
            },
         },
         uz: {
            translation: {
               lng: "Til",
               Koran: "Quron",
               prayTime: "Namoz vaqtlari",
               tYear: "yil",
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
               weekdays: [
                  "Yakshanba",
                  "Dushanba",
                  "Seshanba",
                  "Chorshanba",
                  "Payshanba",
                  "Juma",
                  "Shanba",
               ],
               months: [
                  "Yanvar",
                  "Fevral",
                  "Mart",
                  "Aprel",
                  "May",
                  "Iyun",
                  "Iyul",
                  "Avgust",
                  "Sentabr",
                  "Oktabr",
                  "Noyabr",
                  "Dekabr",
               ],
               prayTimes: [
                  "Bomdod",
                  "Quyosh",
                  "Peshin",
                  "Asr",
                  "Shom",
                  "Xufton",
               ],
            },
         },
         ru: {
            translation: {
               lng: "Язык",
               Koran: "Коран",
               prayTime: "Время молитвы",
               tYear: "год",
               homePage: {
                  pageName: "Главная",
                  subtitle: "Изучайте Коран и читайте его один раз в день",
               },
               surahPage: {
                  pageName: "Суры Корана",
                  placeholder: "Какую суру вы хотите прочитать?",
                  ayah: "{{numberOfAyahs}} аятов",
               },
               weekdays: [
                  "Суббота",
                  "Пятница",
                  "Воскресенье",
                  "Понедельник",
                  "Вторник",
                  "Среда",
                  "Четверг",
               ],
               months: [
                  "Январь",
                  "Февраль",
                  "Март",
                  "Апрель",
                  "Май",
                  "Июнь",
                  "Июль",
                  "Август",
                  "Сентябрь",
                  "Октябрь",
                  "Ноябрь",
                  "Декабрь",
               ],
               prayTimes: ["Фаджр", "Восход", "Зухр", "Acp", "Магриб", "Иша"],
            },
         },
      },
   });

export default i18n;
