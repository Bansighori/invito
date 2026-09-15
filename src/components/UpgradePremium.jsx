import { useState } from "react";
import api from "../api/axios";

function UpgradePremium() {
  const [loading, setLoading] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      setPaymentFailed(false);

      // ============================================
      // 1. CREATE ₹199 ONE-TIME ORDER
      // ============================================

      const response = await api.post(
        "/payment/create-order"
      );

      const {
        order,
        key
      } = response.data;

      if (!order?.id) {
        throw new Error(
          "Premium payment order was not created."
        );
      }

      // ============================================
      // 2. OPEN RAZORPAY CHECKOUT
      // ============================================

      const options = {
        key,

        amount: order.amount,

        currency: order.currency,

        name: "Invito",

        description:
          "Invito Premium - ₹199 for 30 days",

        order_id: order.id,

        handler: async function (
          paymentResponse
        ) {
          try {

            // ======================================
            // 3. VERIFY PAYMENT ON SERVER
            // ======================================

            const verifyResponse =
              await api.post(
                "/payment/verify",
                {
                  razorpay_payment_id:
                    paymentResponse.razorpay_payment_id,

                  razorpay_order_id:
                    paymentResponse.razorpay_order_id,

                  razorpay_signature:
                    paymentResponse.razorpay_signature
                }
              );

            if (
              verifyResponse.data.success
            ) {
              alert(
                "🎉 Premium activated for 30 days!"
              );

              window.location.reload();
            }

          } catch (error) {

            console.error(
              "Premium verification error:",
              error
            );

            setPaymentFailed(true);

          } finally {

            setLoading(false);

          }
        },

        prefill: {
          name: "",
          email: ""
        },

        theme: {
          color: "#6c63ff"
        },

        modal: {
          confirm_close: true,

          ondismiss: () => {
            setLoading(false);
          }
        }
      };

      // ============================================
      // 4. CREATE RAZORPAY CHECKOUT
      // ============================================

      const razorpay =
        new window.Razorpay(options);

      // ============================================
      // 5. PAYMENT FAILED EVENT
      // ============================================

      razorpay.on(
  "payment.failed",
  async function (response) {
    console.error(
      "Premium payment failed:",
      response
    );

    try {
      await api.post(
        "/payment/failed",
        {
          razorpay_order_id:
            response.error?.metadata?.order_id,

          error_description:
            response.error?.description,

          error_code:
            response.error?.code
        }
      );
    } catch (error) {
      console.error(
        "Unable to record failed payment:",
        error
      );
    }

    razorpay.close();
    setLoading(false);
    setPaymentFailed(true);
  }
);

      // ============================================
      // 6. OPEN PAYMENT WINDOW
      // ============================================

      razorpay.open();

    } catch (error) {

      console.error(
        "Premium upgrade error:",
        error
      );

      setLoading(false);

      setPaymentFailed(true);
    }
  };


  // ================================================
  // PAYMENT FAILED SCREEN
  // ================================================

  if (paymentFailed) {
    return (
      <div className="premium-payment-failed">

        <div className="premium-failed-icon">
          ❌
        </div>

        <h3>
          Payment Failed
        </h3>

        <p>
          Your ₹199 Premium payment
          was not completed.
        </p>

        <div className="premium-failed-actions">

          <button
            className="premium-retry"
            onClick={() => {
              setPaymentFailed(false);
              handleUpgrade();
            }}
          >
            Retry Payment
          </button>

          <button
            className="premium-back"
            onClick={() =>
              setPaymentFailed(false)
            }
          >
            Back
          </button>

        </div>

      </div>
    );
  }


  // ================================================
  // UPGRADE BUTTON
  // ================================================

  return (
    <button
      className="pricing-button plus-button"
      onClick={handleUpgrade}
      disabled={loading}
    >
      {loading
        ? "Opening Payment..."
        : "Upgrade ₹199/month"}
    </button>
  );
}

export default UpgradePremium;