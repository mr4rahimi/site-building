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
import LandingHeroImageBlock from './landingHeroImage/Component'
import PricingTableBlock from './pricingTable/Component'
import SimpleCTABlock from './simpleCTA/Component'
import WhyUs1Block from './whyUs1/Component'
import RepairSteps1Block from './repairSteps1/Component'
import RepairSpecial1Block from './repairSpecial1/Component'
import RepairSpecial2Block from './repairSpecial2/Component'
import Reviews1Block from './reviews1/Component'
import StepsTimelineBlock from './stepsTimeline/Component'
import ServiceDetailSectionBlock from './serviceDetailSection/Component'
import ServicesCards1Block from './servicesCards1/Component'
import ServicesCards2Block from './servicesCards2/Component'
import ServicesGridWithAnchorsBlock from './servicesGridWithAnchors/Component'

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
  landingHeroImage: LandingHeroImageBlock,
  pricingTable: PricingTableBlock,
  simpleCTA: SimpleCTABlock,
  whyUs1: WhyUs1Block,
  repairSteps1: RepairSteps1Block,
  repairSpecial1: RepairSpecial1Block,
  repairSpecial2: RepairSpecial2Block,
  reviews1: Reviews1Block,
  stepsTimeline: StepsTimelineBlock,
  serviceDetailSection: ServiceDetailSectionBlock,
  servicesCards1: ServicesCards1Block,
  servicesCards2: ServicesCards2Block,
  servicesGridWithAnchors: ServicesGridWithAnchorsBlock,
}
