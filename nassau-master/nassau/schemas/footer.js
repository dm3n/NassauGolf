export default {
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'header',
      title: 'Header',
      description:
        'Enter the header for the footer. This will be displayed as the title or heading of the footer section.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'list_of_items',
      title: 'Items list',
      description:
        'Add items for the list under the footer header. Please make sure the name of the string is like the path if it is a link.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'link',
              title: 'Link',
              type: 'string',
              description:
                'Enter the URL or link that the footer item should link to. Leave it empty if this item should not be linked.',
            },
            {
              name: 'text',
              title: 'Item Name',
              type: 'string',
              description:
                'Enter the text that you want to be displayed as the link text in the footer.',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
}
