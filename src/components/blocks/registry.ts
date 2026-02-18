import type { ComponentType } from 'react'

import CTABlock from './cta/Component'
import Branches1Block from './branches1/Component'
import Contact1Block from './contact1/Component'
import Contact2Block from './contact2/Component'
import Contact3Block from './contact3/Component'

export const blocks: Record<string, ComponentType<any>> = {
  cta: CTABlock,
  branches1: Branches1Block,
  contact1: Contact1Block,
  contact2: Contact2Block,
  contact3: Contact3Block,
}
