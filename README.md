
NassauGolf Store

---

#### Description

> NassauGolf Store is a sophisticated e-commerce platform designed for golf but great for a eccomerce store template. Built using Next.js and Tailwind CSS, it offers a seamless shopping experience.

---

#### Core Features


1. **Interactive Product Display**: Dynamic product galleries with detailed descriptions and pricing information.
2. **Secure Payment Gateway**: Integration with Stripe for safe and reliable transactions.
3. **User Authentication**: Secure user accounts with Firebase for personalized shopping experiences.
4. **Responsive Design**: A mobile-friendly interface that adapts to various screen sizes.
5. **Real-time Content Management**: Powered by Sanity, enabling real-time updates to product listings. Edit the store like shopify.

---

#### Screenshots


```markdown
(https://github.com/dm3n/NassauGolf/assets/79768139/7dd369e2-ac36-47f0-b1f7-4d0fa56937de)
(https://github.com/dm3n/NassauGolf/assets/79768139/32db3803-11f5-4b39-ae90-6617f5b001b6)
(https://github.com/dm3n/NassauGolf/assets/79768139/dd167bb2-0156-4b7b-880c-1d0e8efbaad8)
(https://github.com/dm3n/NassauGolf/assets/79768139/2152c24e-aac7-47e2-a94e-5c48a5871ded)


```

---

#### Installation and Setup
instructions on how to set up and run your project locally.
```bash
git clone https://github.com/yourusername/nassaugolf-store.git
cd nassaugolf-store
npm install
npm run dev
``` 

### Setting Up Sanity

1. **Install Sanity CLI**: First, ensure that you have Sanity CLI installed globally. If not, you can install it using npm:

   ```bash
   npm install -g @sanity/cli
   ```

2. **Initialize Sanity Project**: Navigate to the directory where you want to set up Sanity (typically where your project is located) and run:

   ```bash
   sanity init
   ```

   Follow the prompts to configure your Sanity project. This will include creating a new project or selecting an existing one, and configuring the dataset.

3. **Start Sanity Studio**: Once setup is complete, start the Sanity Studio:

   ```bash
   sanity start
   ```

   This will run the studio locally, allowing you to manage your content.

4. **Configure CORS for Sanity**: To ensure your front-end can communicate with the Sanity backend, set up CORS origins in the [Sanity Management Console](https://manage.sanity.io/).

   - Add your project's URL to the list of allowed origins.
   - Remember to enable credentials if your front-end requires authentication.

5. **Sanity Project Structure**: Your Sanity Studio's configurations are stored in the `sanity.json` file. You can modify schemas, add plugins, and customize the studio here.

### Setting Up Stripe

1. **Create a Stripe Account**: If you haven’t already, sign up for a Stripe account at [stripe.com](https://stripe.com/).

2. **Retrieve API Keys**: Once logged in, go to the Developers section in your Stripe Dashboard. Here, you'll find your API keys (Publishable Key and Secret Key). 

3. **Integrating Stripe with Your Project**:
   
   - Install Stripe's npm package in your project:
     ```bash
     npm install @stripe/stripe-js
     ```
   
   - In your project, where you handle payment processing, import Stripe:
     ```javascript
     import { loadStripe } from '@stripe/stripe-js';
     ```
   
   - Initialize Stripe with your Publishable Key:
     ```javascript
     const stripePromise = loadStripe('your-publishable-key');
     ```
   
   - Remember to replace `'your-publishable-key'` with your actual Stripe Publishable Key.

4. **Environment Variables**: It's best to store your Stripe keys in environment variables instead of hardcoding them. You can use `.env.local` for local development:

   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-publishable-key
   STRIPE_SECRET_KEY=your-secret-key
   ```

   Replace `your-publishable-key` and `your-secret-key` with your actual Stripe keys.

5. **Securing Stripe Keys**: Make sure not to expose your Stripe Secret Key in your client-side code. Use it only in secure server-side environments.

---

#### Technologies Used
- Next.js
- Tailwind CSS
- Sanity
- Stripe
- Firebase
- React-Query
- ESLint

---

#### Contributing

> We welcome contributions to the NassauGolf Store! If you have suggestions or want to add new features, please fork the repository, make your changes, and submit a pull request.

---
