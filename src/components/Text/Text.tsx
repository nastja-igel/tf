import { ElementType, HTMLAttributes } from 'react'
import styles from './Text.module.css'

export type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'body-sm' | 'caption' | 'label' | 'mono'
export type TextColor = 'primary' | 'secondary' | 'disabled' | 'accent'

const tagMap: Record<TextVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
  label: 'span',
  mono: 'span',
}

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant
  color?: TextColor
  as?: ElementType
}

export function Text({
  variant = 'body',
  color = 'primary',
  as,
  className,
  children,
  ...props
}: TextProps) {
  const Tag = as ?? tagMap[variant]
  return (
    <Tag
      className={[styles[variant], styles[`color-${color}`], className ?? ''].join(' ').trim()}
      {...props}
    >
      {children}
    </Tag>
  )
}
