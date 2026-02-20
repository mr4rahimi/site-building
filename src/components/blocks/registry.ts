import type { ComponentType } from 'react'

import CTABlock from './cta/Component'
import Branches1Block from './branches1/Component'
import Contact1Block from './contact1/Component'
import Contact2Block from './contact2/Component'
import Contact3Block from './contact3/Component'
import CoverageBlock from './coverage/Component'
import CoverageWithBranchesBlock from './coverageWithBranches/Component'
import FAQBlock from './faq/Component'
import FAQ2Block from './faq2/Component'
import FAQAccordionBlock from './faqAccordion/Component'
import Features2Block from './features2/component'
import HeroBlock from './hero/component'
import HeroProBlock from './heroPro/Component'
import ImageWithFeatureListBlock from './imageWithFeatureList/Component'
import IssuesBlock from './issues/Component'
import IssuesAccordionBlock from './issuesAccordion/component'

export const blocks: Record<string, ComponentType<any>> = {
  cta: CTABlock,
  branches1: Branches1Block,
  contact1: Contact1Block,
  contact2: Contact2Block,
  contact3: Contact3Block,
  coverage: CoverageBlock,
  coverageWithBranches: CoverageWithBranchesBlock,
  faq: FAQBlock,
  faq2: FAQ2Block,
  faqAccordion: FAQAccordionBlock,
  features2: Features2Block,
  hero: HeroBlock,
  heroPro: HeroProBlock,
  imageWithFeatureList: ImageWithFeatureListBlock,
  issues: IssuesBlock,
  issuesAccordion: IssuesAccordionBlock,
}
