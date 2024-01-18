import {MdOutlinePolicy} from 'react-icons/md'

export default {
  title: 'Return Policy',
  name: 'return_policy',
  type: 'document',
  options: {
    singleton: true,
  },
  icon: MdOutlinePolicy,
  fields: [
    {
      title: 'Description',
      validation: (Rule) => Rule.required(),
      name: 'description',
      type: 'text',
      description: 'A description of the return policy and how it works.',
    },
    {
      title: 'Time Frame',
      validation: (Rule) => Rule.required(),
      name: 'time_frame',
      type: 'text',
      description: 'The amount of time customers have to return products after purchase.',
    },
    {
      title: 'Condition of Returned Products',
      validation: (Rule) => Rule.required(),
      name: 'condition_of_returned_products',
      type: 'array',
      of: [{type: 'block'}],
      description: 'The condition that returned products must be in to be eligible for a refund.',
    },
    {
      title: 'Refund Policy',
      validation: (Rule) => Rule.required(),
      name: 'refund_policy',
      type: 'array',
      of: [{type: 'block'}],
      description:
        'A description of the refund policy, including any fees or shipping costs associated with returns.',
    },
    {
      title: 'Additional Fields',
      name: 'additional_fields',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Field Title',
              name: 'field_title',
              type: 'string',
              description: 'The title of the additional rplicy field.',
              validation: (Rule) => Rule.required(),
            },
            {
              title: 'Field Value',
              name: 'field_value',
              type: 'array',
              of: [{type: 'block'}],
              description: 'The value of the additional policy field.',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      description: 'Optional additional fields that can be added to the return policy.',
    },
  ],
  initialValue: {
    additional_fields: [],
  },
}
