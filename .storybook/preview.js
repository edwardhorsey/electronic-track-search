import '../src/styles/globals.css'
import { addDecorator } from '@storybook/react'
import { initializeWorker, mswDecorator } from 'msw-storybook-addon'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

initializeWorker();
addDecorator(mswDecorator);
