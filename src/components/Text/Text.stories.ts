import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  args: { children: 'The quick brown fox jumps over the lazy dog' },
}

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = { args: { variant: 'h1' } }
export const H2: Story = { args: { variant: 'h2' } }
export const H3: Story = { args: { variant: 'h3' } }
export const Body: Story = { args: { variant: 'body' } }
export const BodySm: Story = { args: { variant: 'body-sm' } }
export const Caption: Story = { args: { variant: 'caption' } }
export const Label: Story = { args: { variant: 'label' } }
export const Mono: Story = { args: { variant: 'mono' } }
export const ColorSecondary: Story = { args: { color: 'secondary' } }
export const ColorAccent: Story = { args: { color: 'accent' } }
