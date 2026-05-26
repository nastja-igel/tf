import type { Meta, StoryObj } from '@storybook/react'
import { LoginPage } from './LoginPage'

const meta = {
  title: 'Pages/LoginPage',
  component: LoginPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LoginPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLoginHandler: Story = {
  args: {
    onLogin: async (email, password) => {
      await new Promise(r => setTimeout(r, 1000))
      alert(`Logged in as ${email} / ${password}`)
    },
  },
}
