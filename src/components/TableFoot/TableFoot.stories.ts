import type { Meta, StoryObj } from '@storybook/react'
import { TableFoot } from './TableFoot'

const meta: Meta<typeof TableFoot> = {
  title: 'Table/TableFoot',
  component: TableFoot,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Pagination footer for the worktime data table. Shows record count, current page info, and up to 7 numbered page buttons with prev/next chevrons and ellipsis for large page counts.

- Active page button uses \`aria-current="page"\` for accessibility.
- Ellipsis appears automatically when there are more than 7 pages and the window slides.
- Use together with **\`TableHead\`** and **\`TableRow\`** to build the full table.

### Accessibility
- Container has \`role="navigation"\` and \`aria-label="Table pagination"\` — screen readers announce it as a named navigation landmark.
- Active page button has \`aria-current="page"\`.
- Previous / Next chevron buttons have \`aria-label="Previous page"\` / \`"Next page"\` and are \`disabled\` at boundaries via the HTML attribute — AT announces them as unavailable.
- Ellipsis spans are purely visual — they carry no semantic role.
      `,
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const First: Story = {
  args: { page: 1, totalPages: 4, totalItems: 24, pageSize: 12 },
}
export const Middle: Story = {
  args: { page: 3, totalPages: 8, totalItems: 96, pageSize: 12 },
}
export const Last: Story = {
  args: { page: 8, totalPages: 8, totalItems: 96, pageSize: 12 },
}
export const SinglePage: Story = {
  args: { page: 1, totalPages: 1, totalItems: 7 },
}
