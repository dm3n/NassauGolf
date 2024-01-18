import {BsReverseLayoutTextWindowReverse} from 'react-icons/bs'

export default {
  name: 'homePageLayout',
  title: 'Home Page Layout',
  type: 'document',
  icon: BsReverseLayoutTextWindowReverse,
  options: {
    singleton: true,
  },
  fields: [
    {
      name: 'Hero_image',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: 'upload the Image that you want to Display in the hero section',
    },
    {
      name: 'category_layout',
      title: 'category layout',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'catagories'}]}],
      validation: (Rule) =>
        Rule.required().min(2).max(4).error('Please select at least 2 and max 4 category'),
      description: 'Select the categories that you want to display in the home page',
    },
    {
      name: 'trendingProducts',
      title: 'Trending Products number',
      type: 'number',
      initialValue: 3,
      default: 3,
      validation: (Rule) => Rule.min(3).max(10).required(),
      description: 'set How many trending product should be visiable in the home page default is 3',
    },
    {
      name: 'LatestProducts',
      title: 'latest Products number',
      type: 'number',
      initialValue: 3,
      default: 3,
      validation: (Rule) => Rule.min(3).max(10).required(),
      description: 'set How many latest product should be visiable in the home page default is 3',
    },
    {
      name: 'products',
      title: ' Products number',
      type: 'number',
      initialValue: 3,
      default: 3,
      validation: (Rule) => Rule.min(3).max(18).required(),
      description: 'set How many  products should be visiable in the home page default is 3',
    },
  ],
}
