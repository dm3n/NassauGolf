import {FcAbout} from 'react-icons/fc'

export default {
  title: 'About Us',
  name: 'about_us',
  type: 'document',
  icon: FcAbout,
  options: {
    singleton: true,
  },
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'The title of the About Us page.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      description: 'A brief description of your ecommerce website and what you offer.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Mission Statement',
      name: 'mission_statement',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description: "Your ecommerce website's mission statement.",
    },
    {
      title: 'Additional Fields',
      name: 'additional_fields',
      type: 'array',
      description:
        'Add any additional fields that you would like to include for the About Us page.',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Field Name',
              name: 'field_name',
              type: 'string',
              description: 'The name of the field.',
              validation: (Rule) => Rule.required().error('please specify the field title '),
            },
            {
              title: 'Field Value',
              name: 'field_value',
              type: 'text',
              description: 'The value of the field.',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
}
