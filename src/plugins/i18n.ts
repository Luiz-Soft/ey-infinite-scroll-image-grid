import { createI18n } from 'vue-i18n'
import en from '@/translations/en.json'
import es from '@/translations/es.json'
import pt from '@/translations/pt.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    es,
    pt
  }
})

export default i18n
