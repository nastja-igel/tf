import type { Meta, StoryObj } from '@storybook/react'
import { SearchInput } from './SearchInput'

const meta: Meta<typeof SearchInput> = {
  title: 'Inputs/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'glass' },
    layout: 'centered',
    docs: {
      description: {
        component: `
Glassmorphic search field with a magnifier icon prefix. \`forwardRef\`-enabled for programmatic focus (e.g. ⌘K shortcut handler).

- Pass \`showShortcut\` to display a \`⌘K\` badge on the right — wire a global keydown listener separately.
- The \`placeholder\` also serves as the accessible \`aria-label\`, so keep it descriptive.
- Used inside **\`Filters\`** for employee / ID search.
      `,
      },
    },
  },
  argTypes: {
    placeholder:   { control: 'text' },
    showShortcut:  { control: 'boolean' },
    defaultValue:  { control: 'text' },
  },
  args: {
    placeholder: 'Search…',
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithShortcut: Story = {
  args: { showShortcut: true },
}

export const WithValue: Story = {
  args: { defaultValue: 'John Smith' },
}

export const Wide: Story = {
  args: { placeholder: 'Search employees…', showShortcut: true, style: { minWidth: 280 } },
}
