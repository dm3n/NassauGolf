import {FcPrivacy} from 'react-icons/fc'

export default {
  name: 'TermsAndConditions',
  type: 'document',
  icon: FcPrivacy,
  options: {
    singleton: true,
  },
  title: 'Terms and Conditions',
  fields: [
    {
      name: 'introduction',
      type: 'text',
      title: 'Introduction',
      description: 'Provide a brief overview of your website and its purpose.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'acceptance',
      type: 'text',
      title: 'Acceptance of Terms',
      description:
        'Explain how users must agree to the terms and conditions before using the website.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'accounts',
      type: 'text',
      title: 'User Accounts',
      description:
        'List the requirements for creating an account on the website, and explain how users are responsible for maintaining the security of their accounts.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'products',
      type: 'text',
      title: 'Products and Services',
      validation: (Rule) => Rule.required(),
      description:
        'Describe the products and services offered on the website, and explain how pricing, payment, shipping, and returns work.',
    },
    {
      name: 'intellectualProperty',
      validation: (Rule) => Rule.required(),
      type: 'text',
      title: 'Intellectual Property',
      description:
        'Explain who owns the content and trademarks on the website, and what users can and cannot do with that content.',
    },
    {
      name: 'disclaimer',
      validation: (Rule) => Rule.required(),
      type: 'text',
      title: 'Disclaimer',
      description:
        'Include any disclaimers or limitations of liability that may be relevant to your website.',
    },
    {
      name: 'changes',
      validation: (Rule) => Rule.required(),
      type: 'text',
      title: 'Changes to Terms and Conditions',
      description: 'Explain how users will be notified of any changes to the terms and conditions.',
    },
  ],
}
