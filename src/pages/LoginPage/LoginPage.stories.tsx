import type { Meta, StoryObj } from '@storybook/react'
import { LoginPage } from './LoginPage'

const meta = {
  title: 'Pages/LoginPage',
  component: LoginPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof LoginPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHandler: Story = {
  args: {
    onLogin: async (email, _password) => {
      await new Promise(r => setTimeout(r, 900))
      alert(`Welcome, ${email}`)
    },
  },
}
