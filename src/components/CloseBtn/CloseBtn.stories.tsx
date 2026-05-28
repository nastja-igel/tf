import type { Meta, StoryObj } from '@storybook/react'
import { CloseBtn } from './CloseBtn'

const meta: Meta<typeof CloseBtn> = {
  title: 'Actions/CloseBtn',
  component: CloseBtn,
  parameters: {
    backgrounds: { default: 'glass' },
    layout: 'centered',
    docs: {
      description: {
        component: `
Minimal ×-icon dismiss button. \`forwardRef\`-enabled for programmatic focus management (e.g. focus the close button when a drawer opens).

The default \`aria-label\` is \`"Close"\` — override it when the context needs a more specific label
(e.g. \`"Close employee details"\`, \`"Dismiss alert"\`).

Used in **\`Drawer\`** headers, toast notifications, and modal dialogs.

### Accessibility
- Default \`aria-label="Close"\` — **always override** with a context-specific label (e.g. \`"Close employee details"\`) when multiple dismissible elements are on the same page.
- The × icon SVG is \`aria-hidden="true"\`.
- \`forwardRef\`-enabled: move focus **to** the close button when an overlay opens (so keyboard users can Tab and Escape immediately). Move focus **back** to the trigger element when it closes.
- Renders as \`<button type="button">\` — activated by Space / Enter.
      `,
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof CloseBtn>

export const Default: Story = {}

export const Disabled: Story = {
  args: { disabled: true },
}
