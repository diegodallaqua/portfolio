import type { ReactNode } from 'react'
import { RootDocument } from '@/components/RootDocument'
import { themeViewport } from '@/lib/theme'
import '../globals.css'

export const viewport = themeViewport

export default function Layout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>
}
