import React from 'react'
import { blocks } from '@/components/blocks/registry'

export default function RenderBlocks({ layout }: { layout?: any[] }) {
  if (!layout?.length) return null

  return (
    <>
      {layout.map((block, i) => {
        const Comp = blocks[block.blockType]
        if (!Comp) return null
        return <Comp key={block.id || i} {...block} />
      })}
    </>
  )
}
