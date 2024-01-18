import {TbFlame} from 'react-icons/tb'

export default {
  name: 'trending',
  title: 'Trending',
  type: 'document',
  icon: TbFlame,
  fields: [
    {
      name: 'varients',
      title: 'product varients',
      description: 'specify the product varients at least one',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).error('please set the color of the product'),
      of: [
        {
          type: 'document',
          fields: [
            {
              type: 'string',
              name: 'hex_color',
              title: 'color hexcode',
              description: 'please put the color in hexcode (Navy Blue: #000080)',
              validation: (Rule) => [
                Rule.required().min(1).error('please specify the color'),
                Rule.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/).error(
                  'Please enter a valid hex code.'
                ),
              ],
            },
            {
              type: 'string',
              name: 'color_name',
              title: 'color name',
              description: 'please put the color name here',
              validation: (Rule) =>
                Rule.required().error('please set the color name of the product'),
            },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              validation: (Rule) => [
                Rule.required().min(1).error('You forgot to add the photo.'),
                Rule.max(4).error('the max photo you can add are 4'),
              ],
              of: [{type: 'image'}],
              options: {
                hotspot: true,
              },
              description: 'Upload an image for the product.',
            },
          ],
        },
      ],
    },

    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => [
        Rule.required().min(1).error('You forgot to add the title.'),
        Rule.max(50).warning('Shorter titles are usually better.'),
      ],
      description: 'Enter a title for the product.',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 90,
        hidden: true,
      },
      description: 'The slug is used in the URL for this product.',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => [Rule.required().min(1).error('You forgot to add the price.')],
      description: 'Enter the price for the product.',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'catagories'}],
      validation: (Rule) =>
        Rule.required().error(
          'please set the product category if there is no one please crate it first'
        ),
      // options: {},
      description: 'Select the category that the product belongs to.',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => [
        Rule.required().min(10).max(300).error('You forgot to add the description.'),
      ],
      description: 'Enter a description for the product.',
    },
    {
      name: 'onSale',
      title: 'On Sale',
      validation: (Rule) =>
        Rule.custom((fields) => {
          if (fields.isOnSale && !!!fields.salePrice) {
            return "You can't have buyGetFree turn on without specifying all the fields"
          }
          return true
        }),
      type: 'object',
      fields: [
        {
          name: 'isOnSale',
          title: 'Is on Sale',
          type: 'boolean',
          initialValue: false,
          description: 'Check this box if the product is on sale.',
        },
        {
          name: 'salePrice',
          title: 'Sale Price',
          type: 'number',

          description: 'Enter the sale price for the product if it is on sale.',
        },
      ],
      description: 'Specify if the product is on sale and the sale price if applicable.',
    },
    {
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      description:
        'Please select the sizes available for the product. If there are no sizes available, leave this field empty. and be aware to not select a size two times',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'extra Small', value: 'XS'},
              {title: 'Small', value: 'SM'},
              {title: 'Medium', value: 'M'},
              {title: 'Large', value: 'L'},
              {title: 'Extra Large', value: 'XL'},
              {title: 'Double Extra Large', value: 'XXL'},
            ],
          },
        },
      ],
    },
    {
      name: 'tags',
      title: 'tags',
      type: 'array',
      validation: (Rule) => [
        Rule.required().min(2).error('You forgot to add the tags 2 at least.'),
      ],
      description:
        'add tags here example: shirt , polo, green , please make sure the tags are selected precisly for better search experience for the user',
      of: [{type: 'string'}],
    },
    {
      name: 'buyGetFree',
      title: 'Buy Something, Get Something Free',
      type: 'object',
      validation: (Rule) =>
        Rule.custom((fields) => {
          if (fields.isGetFree && !fields.buyQuantity) {
            return "You can't have buyGetFree turn on without specifying how many buy quantity"
          }
          if (fields.isGetFree && !fields.freeQuantity) {
            return "You can't have buyGetFree turn on without specifying how many free quantity"
          }
          if (fields.isGetFree && !fields.freeProduct) {
            return "You can't have buyGetFree turn on without specifying the free Product"
          }
          return true
        }),
      fields: [
        {
          name: 'isGetFree',
          title: 'Is it buy one get one',
          type: 'boolean',
          initialValue: false,
          validation: (Rule) => [
            Rule.required().error('Please specify if the product is BuyOneGetOne or not'),
          ],
          default: false,
        },
        {
          name: 'buyQuantity',
          title: 'Buy Quantity',
          description: 'here I need you to specify how much the user need to buy to get item free',
          type: 'number',
        },
        {
          name: 'freeQuantity',
          title: 'Free Quantity',
          type: 'number',
        },
        {
          name: 'freeProduct',
          title: 'Free Product',
          description: 'select the product that will be free',
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
    },
  ],
}
