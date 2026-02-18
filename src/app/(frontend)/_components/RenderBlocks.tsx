import React from 'react'
import { blocks } from '@/components/blocks/registry'

export default function RenderBlocks({ layout }: { layout?: any[] }) {
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
        return <Comp key={block.id || i} {...block} />
      })}
    </>
  )
}
