import {FcShipped} from 'react-icons/fc'

export default {
  title: 'Shipping Information',
  name: 'shipping_information',
  type: 'document',
  options: {
    singleton: true,
  },
  icon: FcShipped,
  fields: [
    {
      title: 'Shipping Method',
      name: 'shipping_method',
      type: 'string',
      description: 'The shipping method used for deliveries.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Shipping Time',
      name: 'shipping_time',
      type: 'number',
      description: 'The estimated time for delivery in days.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Shipping Rates',
      name: 'shipping_rates',
      type: 'number',
      validation: (Rule) => Rule.required(),
      description: 'Information about shipping taxes in cents, (flate taxes)',
    },
    {
      title: 'Shipping Restrictions',
      name: 'shipping_restrictions',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
      description:
        'Any restrictions on shipping, such as locations where shipping is not available or any items that cannot be shipped.',
    },
    {
      title: 'Additional Fields',
      name: 'additional_fields',
      type: 'array',
      description:
        'Add any additional fields that you would like to include in the shipping information section.',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Field Title',
              name: 'field_title',
              type: 'string',
              description: 'The title of the field.',
              validation: (Rule) => Rule.required(),
            },
            {
              title: 'Field Value',
              name: 'field_value',
              type: 'array',
              of: [{type: 'block'}],
              description: 'The value of the field.',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
}
