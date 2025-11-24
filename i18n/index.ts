import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// Import thủ công
// import en from "@/i18n/locales/en.json";
import vi from '@/i18n/locales/vi.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      // en: { translation: en },
      vi: { translation: vi },
    },
    fallbackLng: 'vi', // Ngôn ngữ fallback
    debug: false,
    ns: ['translation'],
    defaultNS: 'translation',
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
