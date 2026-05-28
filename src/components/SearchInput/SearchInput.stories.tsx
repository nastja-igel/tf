import type { Meta, StoryObj } from '@storybook/react'
import { SearchInput } from './SearchInput'

const meta: Meta<typeof SearchInput> = {
  title: 'Inputs/SearchInput',
  component: SearchInput,
  parameters: {
    backgrounds: { default: 'glass' },
  },
}
export default meta

type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  args: { placeholder: 'Searchâ€¦' },
}

export const WithShortcut: Story = {
  args: { placeholder: 'Searchâ€¦', showShortcut: true },
}

export const WithValue: Story = {
  args: { placeholder: 'Searchâ€¦', defaultValue: 'John Smith' },
}

export const Wide: Story = {
  args: { placeholder: 'Search employeesâ€¦', showShortcut: true, style: { minWidth: 280 } },
}
