import type { Preview } from '@storybook/react-vite'
import '../src/tokens.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo'  — show violations in the test UI only (default, local dev)
      // 'error' — fail CI on violations (set VITE_A11Y_STRICT=true in CI)
      // 'off'   — skip a11y checks entirely
      test: import.meta.env.VITE_A11Y_STRICT === 'true' ? 'error' : 'todo',
    },

    options: {
      storySort: {
        order: ['Foundations', '*'],
      },
    },

    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark',  value: '#1a1a2e' },
        {
          name: 'glass',
          value: 'linear-gradient(160deg, #5b8db8 0%, #3a6a9a 50%, #2a4f7a 100%)',
        },
      ],
    },
  },
};

export default preview;