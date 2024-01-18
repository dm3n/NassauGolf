import { loadStripe } from "@stripe/stripe-js";
let stripePromise;

export default async function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51Mc8lVAH0SR2G4QQ13kRkRpeDtPreELBj84MdQu979LrD76x1HtiNH0VXeRNtO9f0dl5dXWdUGSqB0uxYFTtE7TF00h5qJqPB7"
    );
  }
  return stripePromise;
}
