import {TbCategory2} from 'react-icons/tb'

export default {
  name: 'catagories',
  title: 'Categories',
  type: 'document',
  icon: TbCategory2,
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description:
        'Upload an image for the category. This image will be displayed as the thumbnail or representative image for the category.',
    },
    {
      name: 'category_name',
      title: 'Category Name',
      type: 'string',
      description:
        'Enter the name of the category. This name will be displayed as the title or label for the category in your website or application.',
    },
  ],
}
