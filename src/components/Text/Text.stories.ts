import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'

const meta: Meta<typeof Text> = {
  title: 'Foundations/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Typography wrapper that picks the right HTML element for each scale and lets you override via \`as\`.

| Variant | Tag | Use case |
|---|---|---|
| \`h1\` | \`<h1>\` | Page title |
| \`h2\` | \`<h2>\` | Section heading |
| \`h3\` | \`<h3>\` | Card / panel heading |
| \`body\` | \`<p>\` | Primary paragraph text |
| \`body-sm\` | \`<p>\` | Secondary or dense paragraph text |
| \`caption\` | \`<span>\` | Metadata, timestamps, helper labels |
| \`label\` | \`<span>\` | Form labels, chip labels |
| \`mono\` | \`<span>\` | IDs, codes, employee numbers |

Colors: \`primary\`, \`secondary\`, \`disabled\`, \`accent\`. Override the tag with \`as\` for semantic flexibility (e.g. \`<Text variant="label" as="label">\`).

### Accessibility
- Heading variants render the correct semantic HTML tags (\`h1\`–\`h3\`) — **do not skip heading levels** (e.g. jumping from \`h1\` to \`h3\`).
- Use \`as\` when the visual scale doesn't match the document hierarchy (e.g. visually \`h2\` style but semantically a \`p\`).
- \`caption\` and \`label\` render as \`<span>\` — inline elements. Wrap in block-level elements when needed for layout.
- Color variants affect only visual appearance — they do not change the semantic role or ARIA properties.
- Ensure sufficient color contrast: \`disabled\` color (\`--text-disabled: #80878f\`) on white background is ~3.7:1 — below WCAG AA for body text (4.5:1). Use sparingly and never as the primary means of conveying information.
      `,
      },
    },
  },
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
