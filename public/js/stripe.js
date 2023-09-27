/* eslint-disable */

import axios from "axios";
import { showAlert } from "./alerts";

const stripe = Stripe(
  "pk_test_51KaxLiIbqDmenkuL6pm4QfVnxvAbOPxwz2OQ9R3cTQquHfb0ZcfqOovYMV5ngyUykCIJbgf9e3Us1z3ML8Bvg4Rc004Zr3vwdc",
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios.get(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`,
    );

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert("error", err);
  }
};
