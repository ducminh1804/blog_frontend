import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languageDetector'
import LocizeBackend from 'i18next-locize-backend'
import LastUsed from 'locize-lastused'
import { locizePlugin } from 'locize'
import { version } from 'os'


const isDev = import.meta.env.DEV

const locizeOptions = {
  projectId: import.meta.env.VITE_LOCIZE_PROJECTID,
  apiKey: import.meta.env.VITE_LOCIZE_APIKEY, // // YOU should not expose your apps API key to production!!!
  version: import.meta.env.VITE_LOCIZE_VERSION
}

if (isDev) {
  // locize-lastused
  // sets a timestamp of last access on every translation segment on locize
  // -> safely remove the ones not being touched for weeks/months
  // https://github.com/locize/locize-lastused
  i18n.use(LastUsed)
}

i18n
  .use(LocizeBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(locizePlugin)
  .init({
    debug: isDev, // Enable logging for development
    // lng:'en',
    fallbackLng: 'en', // Default language
    backend: locizeOptions,
    locizeLastUsed: locizeOptions,
    saveMissing: isDev // you should not use saveMissing in production
  })