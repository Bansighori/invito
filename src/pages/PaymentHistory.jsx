import { useEffect, useState } from "react";

import {
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  Calendar,
  IndianRupee,
  ArrowLeft,
  RefreshCw
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import api from "../api/axios";


function PaymentHistory() {

  const navigate = useNavigate();


  const [payments, setPayments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [processingPaymentId, setProcessingPaymentId] =
  useState(null);

  // ========================================
  // FETCH PAYMENT HISTORY
  // ========================================

  useEffect(() => {

    fetchPaymentHistory();

  }, []);


  const fetchPaymentHistory = async () => {

    try {

      setLoading(true);

      setError("");

      const response =
        await api.get(
          "/payment/history"
        );

      if (
        response.data.success
      ) {

        setPayments(
          response.data.payments || []
        );

      }

    } catch (error) {

      console.error(
        "Payment history error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load payment history."
      );

    } finally {

      setLoading(false);

    }

  };


  // ========================================
  // PLAN NAME
  // ========================================

  const getPlanName = (plan) => {

    if (
      plan === "premium_plus"
    ) {
      return "Premium Plus";
    }

    if (
      plan === "premium"
    ) {
      return "Premium";
    }

    return plan;

  };


  // ========================================
  // STATUS ICON
  // ========================================

  const getStatusIcon = (status) => {

    if (
      status === "success"
    ) {

      return (
        <CheckCircle
          size={20}
          className="payment-status-icon success"
        />
      );

    }


    if (
      status === "failed"
    ) {

      return (
        <XCircle
          size={20}
          className="payment-status-icon failed"
        />
      );

    }


    return (
      <Clock
        size={20}
        className="payment-status-icon created"
      />
    );

  };


  // ========================================
  // STATUS TEXT
  // ========================================

  const formatStatus = (status) => {

    if (
      status === "success"
    ) {
      return "Successful";
    }

    if (
      status === "failed"
    ) {
      return "Failed";
    }

    return "Pending";

  };


  // ========================================
  // DATE
  // ========================================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );

  };


  // ========================================
  // TIME
  // ========================================

  const formatTime = (date) => {

    if (!date) {
      return "";
    }

    return new Date(
      date
    ).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    );

  };


  // ========================================
  // LOAD RAZORPAY
  // ========================================

  const loadRazorpay = () => {

    return new Promise(
      (resolve) => {

        if (
          window.Razorpay
        ) {

          resolve(true);

          return;

        }


        const script =
          document.createElement(
            "script"
          );

        script.src =
          "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => {
          resolve(true);
        };

        script.onerror = () => {
          resolve(false);
        };

        document.body.appendChild(
          script
        );

      }
    );

  };


  const continuePayment = async (
  payment
) => {

  try {

    setProcessingPaymentId(
      payment._id
    );


    // ====================================
    // LOAD RAZORPAY
    // ====================================

    const razorpayLoaded =
      await loadRazorpay();


    if (!razorpayLoaded) {

      alert(
        "Unable to load Razorpay. Please check your internet connection."
      );

      return;

    }


    // ====================================
    // GET EXISTING RAZORPAY ORDER
    // ====================================

    const response =
      await api.post(
        "/payment/continue",
        {
          paymentId:
            payment._id
        }
      );


    if (
      !response.data.success
    ) {

      alert(
        response.data.message ||
          "Unable to continue payment."
      );

      return;

    }


    const {
      order,
      key
    } = response.data;


    // ====================================
    // RAZORPAY OPTIONS
    // ====================================

    const options = {

      key,

      amount:
        order.amount,

      currency:
        order.currency,

      name:
        "Invito",

      description:
        payment.plan ===
        "premium_plus"
          ? "Invito Premium Plus - ₹299 for 30 days"
          : "Invito Premium - ₹199 for 30 days",

      order_id:
        order.id,


      // ==================================
      // SUCCESS
      // ==================================

      handler:
        async function (
          razorpayResponse
        ) {

          try {

            let verifyResponse;


            if (
              payment.plan ===
              "premium"
            ) {

              verifyResponse =
                await api.post(
                  "/payment/verify",
                  {
                    razorpay_payment_id:
                      razorpayResponse
                        .razorpay_payment_id,

                    razorpay_order_id:
                      razorpayResponse
                        .razorpay_order_id,

                    razorpay_signature:
                      razorpayResponse
                        .razorpay_signature
                  }
                );

            }


            if (
              payment.plan ===
              "premium_plus"
            ) {

              verifyResponse =
                await api.post(
                  "/payment/verify-premium-plus",
                  {
                    razorpay_payment_id:
                      razorpayResponse
                        .razorpay_payment_id,

                    razorpay_order_id:
                      razorpayResponse
                        .razorpay_order_id,

                    razorpay_signature:
                      razorpayResponse
                        .razorpay_signature
                  }
                );

            }


            if (
              verifyResponse?.data
                ?.success
            ) {

              alert(
                "🎉 Payment successful! Your plan has been activated for 30 days."
              );

              window.location.reload();

            } else {

              alert(
                verifyResponse?.data
                  ?.message ||
                  "Payment verification failed."
              );

            }

          } catch (error) {

            console.error(
              "Continue payment verification error:",
              error
            );

            alert(
              error.response?.data
                ?.message ||
                "Payment verification failed."
            );

          } finally {

            setProcessingPaymentId(
              null
            );

          }

        },


      theme: {
        color: "#6c63ff"
      },


      modal: {

        confirm_close: true,

        ondismiss: () => {

          setProcessingPaymentId(
            null
          );

        }

      }

    };


    // ====================================
    // OPEN RAZORPAY
    // ====================================

    const razorpay =
      new window.Razorpay(
        options
      );


    // ====================================
    // PAYMENT FAILED
    // ====================================

    razorpay.on(
      "payment.failed",
      async function (
        response
      ) {

        console.error(
          "Continued payment failed:",
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


        alert(
          response.error
            ?.description ||
            "Payment failed. You can retry it from Payment History."
        );


        await fetchPaymentHistory();

        setProcessingPaymentId(
          null
        );

      }
    );


    razorpay.open();


  } catch (error) {

    console.error(
      "Continue payment error:",
      error
    );


    alert(
      error.response?.data
        ?.message ||
        "Unable to continue payment."
    );


    setProcessingPaymentId(
      null
    );

  }

};


  // ========================================
  // RETRY PAYMENT
  // ========================================

  const retryPayment = async (
    payment
  ) => {

    try {

      setprocessingPaymentId(
        payment._id
      );


      // ------------------------------------
      // LOAD RAZORPAY
      // ------------------------------------

      const razorpayLoaded =
        await loadRazorpay();


      if (!razorpayLoaded) {

        alert(
          "Unable to load Razorpay. Please check your internet connection."
        );

        return;

      }


      // ------------------------------------
      // CREATE NEW ORDER
      // ------------------------------------

      let response;


      if (
        payment.plan ===
        "premium"
      ) {

        response =
          await api.post(
            "/payment/create-order"
          );

      } else if (
        payment.plan ===
        "premium_plus"
      ) {

        response =
          await api.post(
            "/payment/create-premium-plus"
          );

      } else {

        alert(
          "Invalid payment plan."
        );

        return;

      }


      if (
        !response.data.success
      ) {

        alert(
          response.data.message ||
            "Unable to create payment order."
        );

        return;

      }


      const {
        order,
        key
      } = response.data;


      // ------------------------------------
      // OPEN RAZORPAY
      // ------------------------------------

      const options = {

        key: key,

        amount:
          order.amount,

        currency:
          order.currency,

        name:
          "Invito",

        description:
          payment.plan ===
          "premium_plus"
            ? "Invito Premium Plus - ₹299 for 30 days"
            : "Invito Premium - ₹199 for 30 days",

        order_id:
          order.id,


        handler:
          async function (
            razorpayResponse
          ) {

            try {

              let verifyResponse;


              // --------------------------------
              // PREMIUM
              // --------------------------------

              if (
                payment.plan ===
                "premium"
              ) {

                verifyResponse =
                  await api.post(
                    "/payment/verify",
                    {
                      razorpay_payment_id:
                        razorpayResponse
                          .razorpay_payment_id,

                      razorpay_order_id:
                        razorpayResponse
                          .razorpay_order_id,

                      razorpay_signature:
                        razorpayResponse
                          .razorpay_signature
                    }
                  );

              }


              // --------------------------------
              // PREMIUM PLUS
              // --------------------------------

              if (
                payment.plan ===
                "premium_plus"
              ) {

                verifyResponse =
                  await api.post(
                    "/payment/verify-premium-plus",
                    {
                      razorpay_payment_id:
                        razorpayResponse
                          .razorpay_payment_id,

                      razorpay_order_id:
                        razorpayResponse
                          .razorpay_order_id,

                      razorpay_signature:
                        razorpayResponse
                          .razorpay_signature
                    }
                  );

              }


              if (
                verifyResponse?.data
                  ?.success
              ) {

                alert(
                  `${getPlanName(
                    payment.plan
                  )} payment successful! 🎉`
                );


                // Refresh history

                await fetchPaymentHistory();


                // Refresh page/user state

                window.location.reload();

              } else {

                alert(
                  verifyResponse?.data
                    ?.message ||
                    "Payment verification failed."
                );

              }

            } catch (error) {

              console.error(
                "Retry payment verification error:",
                error
              );

              alert(
                error.response?.data
                  ?.message ||
                  "Payment verification failed."
              );

            }

          },


        prefill: {

          // Razorpay will use the
          // logged-in user's information
          // when available.

        },


        theme: {

          color:
            "#111827"

        },


        modal: {

          ondismiss:
            function () {

              console.log(
                "Razorpay checkout closed."
              );

            }

        }

      };


      const razorpay =
        new window.Razorpay(
          options
        );


      // ------------------------------------
      // PAYMENT FAILED
      // ------------------------------------

      razorpay.on(
        "payment.failed",
        async function (
          response
        ) {

          console.error(
            "Retry payment failed:",
            response.error
          );


          try {

            await api.post(
              "/payment/failed",
              {
                razorpay_order_id:
                  order.id,

                error_description:
                  response.error
                    ?.description ||
                  "Payment failed.",

                error_code:
                  response.error
                    ?.code || null
              }
            );

          } catch (error) {

            console.error(
              "Failed to save retry failure:",
              error
            );

          }


          alert(
            response.error
              ?.description ||
              "Payment failed. Please try again."
          );


          await fetchPaymentHistory();

        }
      );


      razorpay.open();


    } catch (error) {

      console.error(
        "Retry payment error:",
        error
      );


      alert(
        error.response?.data
          ?.message ||
          "Unable to retry payment."
      );

    } finally {

      setprocessingPaymentId(null);

    }

  };


  // ========================================
  // LOADING
  // ========================================

  if (loading) {

    return (

      <div className="payment-history-page">

        <div className="payment-history-loading">

          Loading payment history...

        </div>

      </div>

    );

  }


  // ========================================
  // MAIN
  // ========================================

  return (

    <div className="payment-history-page">


      {/* ==================================
          HEADER
      ================================== */}

      <div className="payment-history-header">

        <div>

          <button
            className="payment-back-button"
            onClick={() =>
              navigate(-1)
            }
          >

            <ArrowLeft
              size={18}
            />

            Back

          </button>


          <h1>
            Payment History
          </h1>


          <p>
            View your Premium and Premium
            Plus payment transactions.
          </p>

        </div>


        <div className="payment-history-count">

          <CreditCard
            size={20}
          />

          <span>

            {payments.length}{" "}

            {payments.length === 1
              ? "Payment"
              : "Payments"}

          </span>

        </div>

      </div>


      {/* ==================================
          ERROR
      ================================== */}

      {error && (

        <div className="payment-history-error">

          {error}

        </div>

      )}


      {/* ==================================
          EMPTY
      ================================== */}

      {!error &&
        payments.length === 0 && (

          <div className="payment-history-empty">

            <div className="payment-empty-icon">

              <CreditCard
                size={32}
              />

            </div>


            <h2>
              No payments yet
            </h2>


            <p>
              Your Premium and Premium Plus
              payments will appear here.
            </p>


            <button
              onClick={() =>
                navigate("/pricing")
              }
            >
              View Plans
            </button>

          </div>

        )}


      {/* ==================================
          PAYMENT LIST
      ================================== */}

      {payments.length > 0 && (

        <div className="payment-history-list">

          {payments.map(
            (payment) => (

              <div
                className="payment-history-card"
                key={payment._id}
              >


                {/* =========================
                    LEFT
                ========================= */}

                <div className="payment-card-left">

                  <div className="payment-plan-icon">

                    <CreditCard
                      size={22}
                    />

                  </div>


                  <div className="payment-main-info">

                    <div className="payment-plan-row">

                      <h3>

                        {getPlanName(
                          payment.plan
                        )}

                      </h3>


                      <div
                        className={`payment-status ${payment.status}`}
                      >

                        {getStatusIcon(
                          payment.status
                        )}

                        <span>

                          {formatStatus(
                            payment.status
                          )}

                        </span>

                      </div>

                    </div>


                    <div className="payment-meta">

                      <span>

                        <Calendar
                          size={15}
                        />

                        {formatDate(
                          payment.createdAt
                        )}

                      </span>


                      <span>

                        {formatTime(
                          payment.createdAt
                        )}

                      </span>


                      {payment.paymentMethod && (

                        <span>

                          <CreditCard
                            size={15}
                          />

                          {payment.paymentMethod.toUpperCase()}

                        </span>

                      )}

                    </div>

                  </div>

                </div>


                {/* =========================
                    RIGHT
                ========================= */}

                <div className="payment-card-right">

                  <div className="payment-amount">

                    <IndianRupee
                      size={17}
                    />

                    <strong>
                      {payment.amount}
                    </strong>

                    <span>
                      {payment.currency}
                    </span>

                  </div>


                  {/* PAYMENT ID */}

                  {payment.razorpayPaymentId && (

                    <div className="payment-id">

                      Payment ID:

                      <span>
                        {payment.razorpayPaymentId}
                      </span>

                    </div>

                  )}


                  {/* FAILURE MESSAGE */}

                  {payment.status ===
                    "failed" &&
                    payment.failureReason && (

                      <div className="payment-failure">

                        {payment.failureReason}

                      </div>

                    )}


                  {/* RETRY BUTTON */}

                  {payment.status === "failed" && (
  <button
    type="button"
    className="payment-retry-button"
    onClick={() => retryPayment(payment)}
    disabled={
      processingPaymentId === payment._id
    }
  >
    <RefreshCw
      size={16}
      className={
        processingPaymentId === payment._id
          ? "retry-spinning"
          : ""
      }
    />

    {processingPaymentId === payment._id
      ? "Opening..."
      : "Retry Payment"}
  </button>
)}

                    {payment.status === "created" && (
  <button
    type="button"
    className="payment-continue-button"
    onClick={() => continuePayment(payment)}
    disabled={
      processingPaymentId === payment._id
    }
  >
    <RefreshCw
      size={16}
      className={
        processingPaymentId === payment._id
          ? "retry-spinning"
          : ""
      }
    />

    {processingPaymentId === payment._id
      ? "Opening..."
      : "Continue Payment"}
  </button>
)}

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );

}

export default PaymentHistory;