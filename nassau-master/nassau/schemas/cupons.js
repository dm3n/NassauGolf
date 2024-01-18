import {TbDiscount} from 'react-icons/tb'

export default {
  name: 'coupon',
  title: 'Coupon',
  type: 'document',
  icon: TbDiscount,
  fields: [
    {
      name: 'code',
      title: 'Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description:
        'Enter the code for the coupon. This code will be used by customers to apply the discount during checkout.',
    },
    {
      name: 'discount',
      title: 'Discount',
      type: 'object',
      fields: [
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
      ],
      validation: (Rule) => Rule.required(),
      description:
        'Configure the details of the discount for the coupon, including the type of discount, the discount amount, and the maximum discount amount that can be applied.',
    },
  ],
}
