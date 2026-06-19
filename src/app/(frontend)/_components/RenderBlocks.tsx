import React from 'react'
import { blocks } from '@/components/blocks/registry'

export default function RenderBlocks({
  layout,
  siteSlug,
}: {
  layout?: any[]
  siteSlug?: string
}) {
  if (!layout?.length) return null

  return (
    <>
      {layout.map((block, i) => {
        const Comp = blocks[block.blockType]
        if (!Comp) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(`[RenderBlocks] Missing component for blockType: ${block.blockType}`)
          }
          return null
        }
        // Pass siteSlug to contactForm block for API calls
        const extraProps = block.blockType === 'contactForm' && siteSlug ? { siteSlug } : {}
        return <Comp key={block.id || i} {...block} {...extraProps} />
      })}
    </>
  )
}
