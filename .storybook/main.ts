import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', 'storybook-addon-pseudo-states'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    // `react-docgen` (domyślny) jest szybki i nie rozwija setek propsów
    // dziedziczonych z MUI — pełny opis wejść komponentu dajemy w `argTypes`.
    reactDocgen: 'react-docgen',
  },
}

export default config
