import { useState } from "react";

import api from "../api/axios";

function UpgradePremium() {

  const [loading, setLoading] =
    useState(false);


  // ============================================
  // HANDLE PREMIUM UPGRADE
  // ============================================

  const handleUpgrade = async () => {

    try {

      setLoading(true);


      // ============================================
      // 1. CREATE ₹199 ONE-TIME ORDER
      // ============================================

      const response =
        await api.post(
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

        amount:
          order.amount,

        currency:
          order.currency,

        name:
          "Invito",

        description:
          "Invito Premium - ₹199 for 30 days",

        order_id:
          order.id,


        // ==========================================
        // PAYMENT SUCCESS
        // ==========================================

        handler:
          async function (
            paymentResponse
          ) {

            try {

              // ======================================
              // 3. VERIFY PAYMENT
              // ======================================

              const verifyResponse =
                await api.post(
                  "/payment/verify",
                  {
                    razorpay_payment_id:
                      paymentResponse
                        .razorpay_payment_id,

                    razorpay_order_id:
                      paymentResponse
                        .razorpay_order_id,

                    razorpay_signature:
                      paymentResponse
                        .razorpay_signature
                  }
                );


              if (
                verifyResponse.data.success
              ) {

                alert(
                  "🎉 Premium activated for 30 days!"
                );


                // Refresh user/plan information

                window.location.reload();

              } else {

                alert(
                  verifyResponse.data.message ||
                    "Payment verification failed."
                );

              }

            } catch (error) {

              console.error(
                "Premium verification error:",
                error
              );


              alert(
                error.response?.data?.message ||
                  "Payment verification failed. Please check Payment History."
              );

            } finally {

              setLoading(false);

            }

          },


        // ==========================================
        // PREFILL
        // ==========================================

        prefill: {

          name: "",

          email: ""

        },


        // ==========================================
        // RAZORPAY THEME
        // ==========================================

        theme: {

          color:
            "#6c63ff"

        },


        // ==========================================
        // CLOSE CHECKOUT
        // ==========================================

        modal: {

          confirm_close:
            true,

          ondismiss: () => {

            setLoading(false);

          }

        }

      };


      // ============================================
      // 4. CREATE RAZORPAY CHECKOUT
      // ============================================

      const razorpay =
        new window.Razorpay(
          options
        );


      // ============================================
      // 5. PAYMENT FAILED
      // ============================================

      razorpay.on(
        "payment.failed",
        async function (
          response
        ) {

          console.error(
            "Premium payment failed:",
            response
          );


          try {

            await api.post(
              "/payment/failed",
              {
                razorpay_order_id:
                  response.error
                    ?.metadata
                    ?.order_id,

                error_description:
                  response.error
                    ?.description ||
                  "Payment failed.",

                error_code:
                  response.error
                    ?.code ||
                  null
              }
            );


          } catch (error) {

            console.error(
              "Unable to record failed payment:",
              error
            );

          }


          // Close Razorpay window

          razorpay.close();


          // Return button to normal

          setLoading(false);


          // Tell user where the failed
          // transaction is available

          alert(
            "Payment failed. You can retry this payment from Payment History."
          );

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


      alert(
        error.response?.data?.message ||
          "Unable to start Premium payment."
      );

    }

  };


  // ============================================
  // UPGRADE BUTTON
  // ============================================

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