import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import {
  DEFAULT_STEP_STATUS_LABELS,
  STEP_STATUS_TRANSLATION_KEYS,
} from './components/Stepper/stepper.utils'

i18next.use(initReactI18next).init({
  lng: 'pl',
  fallbackLng: 'pl',
  interpolation: { escapeValue: false },
  resources: {
    pl: {
      translation: {
        [STEP_STATUS_TRANSLATION_KEYS.completed]: DEFAULT_STEP_STATUS_LABELS.completed,
        [STEP_STATUS_TRANSLATION_KEYS.active]: DEFAULT_STEP_STATUS_LABELS.active,
        [STEP_STATUS_TRANSLATION_KEYS.upcoming]: DEFAULT_STEP_STATUS_LABELS.upcoming,
      },
    },
    en: {
      translation: {
        [STEP_STATUS_TRANSLATION_KEYS.completed]: 'completed step',
        [STEP_STATUS_TRANSLATION_KEYS.active]: 'current step',
        [STEP_STATUS_TRANSLATION_KEYS.upcoming]: 'step not available yet',
      },
    },
  },
})

export default i18next
