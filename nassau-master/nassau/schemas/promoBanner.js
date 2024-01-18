import {TbShoppingCartDiscount} from 'react-icons/tb'

export default {
  name: 'bannerPromo',
  title: 'Banner Promo',
  type: 'document',
  icon: TbShoppingCartDiscount,
  options: {singleton: true},
  fields: [
    {
      name: 'activate',
      title: 'activate promo',
      initialValue: false,
      type: 'boolean',
      description: 'activate or desactivate the promo code ',
    },
    {
      name: 'code',
      title: 'Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description:
                'Enter the code for the coupon. This        code will be used by customers to apply the discount during checkout.',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Percentage', value: 'percentage'},
          {title: 'Fixed', value: 'fixed'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      description:
        'Select the type of discount for the coupon. Choose either percentage or fixed amount.',
    },
    {
      name: 'amount',
      title: 'Amount',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
      description:
        "Enter the discount amount for the coupon. This value will be used to calculate the discount applied to the customer's order.",
    },

    {
      name: 'isVisible',
      title: 'Visibility',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required(),
      description:
        'Toggle to control the visibility of the promo banner on your website. When checked, the banner will be visible to your customers, and when unchecked, it will be hidden.',
    },
  ],
}
