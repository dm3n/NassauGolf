import {SlSocialInstagram} from 'react-icons/sl'

export default {
  name: 'social_media',
  title: 'social Media',
  icon: SlSocialInstagram,
  type: 'document',
  options: {
    singleton: true,
  },
  description: 'please set your social media links',
  fields: [
    {
      name: 'facebook',
      title: 'Facebook Link',
      type: 'string',
    },
    {
      name: 'twitter',
      title: 'twitter Link',
      type: 'string',
    },
    {
      name: 'instagram',
      title: 'instagram Link',
      type: 'string',
    },
    {
      name: 'tiktok',
      title: 'tiktok Link',
      type: 'string',
    },
  ],
}
