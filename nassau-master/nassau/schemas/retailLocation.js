import {TbMapSearch} from 'react-icons/tb'

export default {
  title: 'Retail Locations',
  name: 'retail_locations',
  options: {
    singleton: true,
  },
  icon: TbMapSearch,
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      description: 'The name of the retail location.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Address',
      name: 'address',
      type: 'string',
      description: 'The street address of the retail location.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'City',
      name: 'city',
      type: 'string',
      description: 'The city where the retail location is located.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'State',
      name: 'state',
      type: 'string',
      description: 'The state where the retail location is located.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Zip Code',
      name: 'zip_code',
      type: 'string',
      description: 'The zip code where the retail location is located.',
    },
    {
      title: 'Phone Number',
      name: 'phone_number',
      type: 'string',
      description: 'The phone number of the retail location.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Additional Fields',
      name: 'additional_fields',
      type: 'array',
      description:
        'Add any additional fields that you would like to include for this retail location.',
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
              type: 'string',
              description: 'The value of the field.',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
}
