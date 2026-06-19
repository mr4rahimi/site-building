// Universal block renderer — handles both static and interactive blocks.
// Used with client:load so all blocks are server-rendered (SSG) AND
// interactive ones (FAQAccordion, ContactForm, ...) work on the client too.
import React from 'react'
import { blocks } from '@/components/blocks/registry'

interface Props {
  layout?: any[]
  siteSlug?: string
}

export default function AllBlocks({ layout, siteSlug }: Props) {
  if (!layout?.length) return null
  return (
    <>
      {layout.map((block, i) => {
        const Comp = blocks[block.blockType]
        if (!Comp) return null
        const extra = block.blockType === 'contactForm' ? { siteSlug } : {}
        return <Comp key={block.id || i} {...block} {...extra} />
      })}
    </>
  )
}
