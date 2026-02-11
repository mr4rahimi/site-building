import type { ComponentType } from 'react'


import CTABlock from './cta/Component'
// import HeroBlock from './hero/Component'
// import CoverageBlock from './coverage/Component'
// ...

export const blocks: Record<string, ComponentType<any>> = {
  cta: CTABlock,
  // hero: HeroBlock,
  // coverage: CoverageBlock,
}
