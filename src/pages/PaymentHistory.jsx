import { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  Calendar,
  IndianRupee,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function PaymentHistory() {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/payment/history"
      );

      if (response.data.success) {
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

  const getPlanName = (plan) => {
    if (plan === "premium_plus") {
      return "Premium Plus";
    }

    if (plan === "premium") {
      return "Premium";
    }

    return plan;
  };

  const getStatusIcon = (status) => {
    if (status === "success") {
      return (
        <CheckCircle
          size={20}
          className="payment-status-icon success"
        />
      );
    }

    if (status === "failed") {
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

  const formatStatus = (status) => {
    if (status === "success") {
      return "Successful";
    }

    if (status === "failed") {
      return "Failed";
    }

    return "Pending";
  };

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  };

  const formatTime = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    );
  };

  if (loading) {
    return (
      <div className="payment-history-page">
        <div className="payment-history-loading">
          Loading payment history...
        </div>
      </div>
    );
  }

  return (
    <div className="payment-history-page">

      {/* HEADER */}
      <div className="payment-history-header">

        <div>
          <button
            className="payment-back-button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
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
          <CreditCard size={20} />

          <span>
            {payments.length}{" "}
            {payments.length === 1
              ? "Payment"
              : "Payments"}
          </span>
        </div>

      </div>

      {/* ERROR */}
      {error && (
        <div className="payment-history-error">
          {error}
        </div>
      )}

      {/* EMPTY STATE */}
      {!error &&
        payments.length === 0 && (
          <div className="payment-history-empty">

            <div className="payment-empty-icon">
              <CreditCard size={32} />
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
                navigate("/templates")
              }
            >
              View Plans
            </button>

          </div>
        )}

      {/* PAYMENT LIST */}
      {payments.length > 0 && (
        <div className="payment-history-list">

          {payments.map((payment) => (
            <div
              className="payment-history-card"
              key={payment._id}
            >

              {/* LEFT */}
              <div className="payment-card-left">

                <div className="payment-plan-icon">
                  <CreditCard size={22} />
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
                      <Calendar size={15} />

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

              {/* RIGHT */}
              <div className="payment-card-right">

                <div className="payment-amount">
                  <IndianRupee size={17} />

                  <strong>
                    {payment.amount}
                  </strong>

                  <span>
                    {payment.currency}
                  </span>
                </div>

                {payment.razorpayPaymentId && (
                  <div className="payment-id">
                    Payment ID:
                    <span>
                      {payment.razorpayPaymentId}
                    </span>
                  </div>
                )}

                {payment.status ===
                  "failed" &&
                  payment.failureReason && (
                    <div className="payment-failure">
                      {payment.failureReason}
                    </div>
                  )}

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default PaymentHistory;