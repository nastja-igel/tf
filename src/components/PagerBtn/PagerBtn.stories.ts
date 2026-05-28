import type { Meta, StoryObj } from '@storybook/react'
import { PagerBtn } from './PagerBtn'

const meta: Meta<typeof PagerBtn> = {
  title: 'Navigation/PagerBtn',
  component: PagerBtn,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Single page number button in a pagination row. \`active\` marks the current page and sets \`aria-current="page"\`.

**Prefer \`TableFoot\`** for complete pagination — it composes PagerBtns with prev/next chevrons, ellipsis, and record count automatically.
Use \`PagerBtn\` directly only when building a custom pagination layout outside the data table.

### Accessibility
- \`aria-current="page"\` is set on the active button — announced by screen readers as the current page.
- Consider adding \`aria-label="Page 3"\` for numbered buttons to provide explicit context, especially in long lists where the number alone may be ambiguous.
- Wrap a group of PagerBtns in a \`<nav aria-label="Pagination">\` at the consumer level — or use \`TableFoot\` which already includes \`role="navigation"\`.
      `,
      },
    },
  },
  args: { page: 1 },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { active: false } }
export const Active: Story  = { args: { active: true } }
