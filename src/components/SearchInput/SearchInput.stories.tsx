import type { Meta, StoryObj } from '@storybook/react'
import { SearchInput } from './SearchInput'

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    backgrounds: { default: 'glass' },
  },
}
export default meta

type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  args: { placeholder: 'Search…' },
}

export const WithShortcut: Story = {
  args: { placeholder: 'Search…', showShortcut: true },
}

export const WithValue: Story = {
  args: { placeholder: 'Search…', defaultValue: 'John Smith' },
}

export const Wide: Story = {
  args: { placeholder: 'Search employees…', showShortcut: true, style: { minWidth: 280 } },
}
