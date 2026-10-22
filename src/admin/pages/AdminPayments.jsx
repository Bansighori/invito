import { useEffect, useMemo, useState } from "react";
import {
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock3,
  IndianRupee,
  Crown,
  Search,
  Eye
} from "lucide-react";

import api from "../../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import "./AdminPayments.css";

function AdminPayments() {
  const [sidebarOpen, setSidebarOpen] =
      useState(false);
  const [payments, setPayments] = useState([]);
  

  const [stats, setStats] = useState({
    totalPayments: 0,
    successfulPayments: 0,
    failedPayments: 0,
    pendingPayments: 0,
    totalRevenue: 0,
    premiumPayments: 0,
    premiumPlusPayments: 0
  });

  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedPayment, setSelectedPayment] =
    useState(null);

  const [loading, setLoading] = useState(true);


  // ==========================================
  // LOAD PAYMENTS
  // ==========================================

  useEffect(() => {
    loadPayments();
    loadStats();
  }, []);


  const loadPayments = async () => {
    try {
      const response =
        await api.get("/admin/payments");

      setPayments(
        response.data.payments || []
      );

    } catch (error) {
      console.error(
        "Load payments error:",
        error
      );
    }
  };


  const loadStats = async () => {
    try {
      const response =
        await api.get("/admin/payments/stats");

      setStats(
        response.data.stats || {}
      );

    } catch (error) {
      console.error(
        "Load payment stats error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // FILTER PAYMENTS
  // ==========================================

  const filteredPayments = useMemo(() => {

    return payments.filter((payment) => {

      const userName =
        payment.user?.name || "";

      const userEmail =
        payment.user?.email || "";

      const orderId =
        payment.razorpayOrderId || "";

      const paymentId =
        payment.razorpayPaymentId || "";


      const searchText =
        `${userName} ${userEmail} ${orderId} ${paymentId}`
          .toLowerCase();


      const matchesSearch =
        searchText.includes(
          search.toLowerCase()
        );


      const matchesPlan =
        planFilter === "all" ||
        payment.plan === planFilter;


      const matchesStatus =
        statusFilter === "all" ||
        payment.status === statusFilter;


      return (
        matchesSearch &&
        matchesPlan &&
        matchesStatus
      );
    });

  }, [
    payments,
    search,
    planFilter,
    statusFilter
  ]);


  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  };


  // ==========================================
  // PAYMENT METHOD
  // ==========================================

  const getPaymentMethod = (method) => {

    if (!method) return "—";

    return method
      .replace("_", " ")
      .toUpperCase();
  };


  // ==========================================
  // STATUS
  // ==========================================

  const getStatusClass = (status) => {

    if (status === "success")
      return "success";

    if (status === "failed")
      return "failed";

    return "created";
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="admin-payments-loading">
        Loading payments...
      </div>
    );
  }


  return (
    <>
    <AdminSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <AdminNavbar />

    <div className="admin-payments-page">

      {/* HEADER */}

      <div className="admin-payments-header">

        <div>
          <span className="admin-page-label">
            PAYMENT MANAGEMENT
          </span>

          <h1>
            Payments
          </h1>

          <p>
            Manage and monitor all Invito
            transactions.
          </p>
        </div>

      </div>


      {/* STAT CARDS */}

      <div className="admin-payment-stats">

        <div className="admin-payment-stat">

          <div className="payment-stat-icon purple">
            <CreditCard size={21} />
          </div>

          <div>
            <span>Total Payments</span>
            <strong>
              {stats.totalPayments}
            </strong>
          </div>

        </div>


        <div className="admin-payment-stat">

          <div className="payment-stat-icon green">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>Successful</span>
            <strong>
              {stats.successfulPayments}
            </strong>
          </div>

        </div>


        <div className="admin-payment-stat">

          <div className="payment-stat-icon red">
            <XCircle size={21} />
          </div>

          <div>
            <span>Failed</span>
            <strong>
              {stats.failedPayments}
            </strong>
          </div>

        </div>


        <div className="admin-payment-stat">

          <div className="payment-stat-icon orange">
            <Clock3 size={21} />
          </div>

          <div>
            <span>Pending</span>
            <strong>
              {stats.pendingPayments}
            </strong>
          </div>

        </div>


        <div className="admin-payment-stat">

          <div className="payment-stat-icon blue">
            <IndianRupee size={21} />
          </div>

          <div>
            <span>Total Revenue</span>

            <strong>
              ₹
              {Number(
                stats.totalRevenue || 0
              ).toLocaleString("en-IN")}
            </strong>
          </div>

        </div>


        <div className="admin-payment-stat">

          <div className="payment-stat-icon gold">
            <Crown size={21} />
          </div>

          <div>
            <span>Premium Plus</span>

            <strong>
              {stats.premiumPlusPayments}
            </strong>
          </div>

        </div>

      </div>


      {/* FILTER BAR */}

      <div className="admin-payment-filters">

        <div className="payment-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search user, email, order ID..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <select
          value={planFilter}
          onChange={(e) =>
            setPlanFilter(e.target.value)
          }
        >
          <option value="all">
            All Plans
          </option>

          <option value="premium">
            Premium
          </option>

          <option value="premium_plus">
            Premium Plus
          </option>
        </select>


        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="all">
            All Status
          </option>

          <option value="success">
            Success
          </option>

          <option value="failed">
            Failed
          </option>

          <option value="created">
            Pending
          </option>
        </select>

      </div>


      {/* PAYMENT TABLE */}

      <div className="admin-payment-table-card">

        <div className="admin-payment-table-header">

          <div>
            <h2>
              Transactions
            </h2>

            <span>
              {filteredPayments.length} payments
            </span>
          </div>

        </div>


        <div className="admin-payment-table-wrapper">

          <table className="admin-payment-table">

            <thead>

              <tr>
                <th>User</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Payment ID</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {filteredPayments.length === 0 ? (

                <tr>
                  <td
                    colSpan="8"
                    className="payment-empty"
                  >
                    No payments found.
                  </td>
                </tr>

              ) : (

                filteredPayments.map(
                  (payment) => (

                    <tr key={payment._id}>

                      <td>

                        <div className="payment-user">

                          <div className="payment-avatar">
                            {(
                              payment.user?.name ||
                              "U"
                            )
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <strong>
                              {
                                payment.user?.name ||
                                "Unknown User"
                              }
                            </strong>

                            <span>
                              {
                                payment.user?.email ||
                                "-"
                              }
                            </span>
                          </div>

                        </div>

                      </td>


                      <td>

                        <span
                          className={`payment-plan ${
                            payment.plan
                          }`}
                        >
                          {payment.plan ===
                          "premium_plus"
                            ? "Premium Plus"
                            : "Premium"}
                        </span>

                      </td>


                      <td>

                        <strong>
                          ₹
                          {Number(
                            payment.amount || 0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </td>


                      <td>
                        {getPaymentMethod(
                          payment.paymentMethod
                        )}
                      </td>


                      <td>

                        <span className="payment-id-text">
                          {
                            payment.razorpayPaymentId ||
                            payment.razorpayOrderId ||
                            "-"
                          }
                        </span>

                      </td>


                      <td>

                        <span
                          className={`payment-status ${getStatusClass(
                            payment.status
                          )}`}
                        >
                          {payment.status ===
                          "success"
                            ? "Success"
                            : payment.status ===
                              "failed"
                            ? "Failed"
                            : "Pending"}
                        </span>

                      </td>


                      <td>
                        {formatDate(
                          payment.createdAt
                        )}
                      </td>


                      <td>

                        <button
                          className="payment-view-btn"
                          onClick={() =>
                            setSelectedPayment(
                              payment
                            )
                          }
                        >
                          <Eye size={16} />
                          View
                        </button>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* PAYMENT DETAILS MODAL */}

      {selectedPayment && (

        <div
          className="payment-modal-overlay"
          onClick={() =>
            setSelectedPayment(null)
          }
        >

          <div
            className="payment-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="payment-modal-header">

              <div>
                <span>
                  PAYMENT DETAILS
                </span>

                <h2>
                  Transaction
                </h2>
              </div>

              <button
                onClick={() =>
                  setSelectedPayment(null)
                }
              >
                ×
              </button>

            </div>


            <div className="payment-modal-body">

              <div className="payment-detail-user">

                <div className="payment-avatar large">
                  {(
                    selectedPayment.user?.name ||
                    "U"
                  )
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <strong>
                    {
                      selectedPayment.user?.name ||
                      "Unknown User"
                    }
                  </strong>

                  <span>
                    {
                      selectedPayment.user?.email ||
                      "-"
                    }
                  </span>
                </div>

              </div>


              <div className="payment-detail-grid">

                <div>
                  <span>Plan</span>
                  <strong>
                    {selectedPayment.plan ===
                    "premium_plus"
                      ? "Premium Plus"
                      : "Premium"}
                  </strong>
                </div>


                <div>
                  <span>Amount</span>
                  <strong>
                    ₹
                    {Number(
                      selectedPayment.amount || 0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>


                <div>
                  <span>Status</span>

                  <strong
                    className={`payment-modal-status ${getStatusClass(
                      selectedPayment.status
                    )}`}
                  >
                    {selectedPayment.status}
                  </strong>
                </div>


                <div>
                  <span>Payment Method</span>

                  <strong>
                    {getPaymentMethod(
                      selectedPayment.paymentMethod
                    )}
                  </strong>
                </div>


                <div>
                  <span>Razorpay Order ID</span>

                  <strong>
                    {
                      selectedPayment.razorpayOrderId ||
                      "-"
                    }
                  </strong>
                </div>


                <div>
                  <span>Razorpay Payment ID</span>

                  <strong>
                    {
                      selectedPayment.razorpayPaymentId ||
                      "-"
                    }
                  </strong>
                </div>


                <div>
                  <span>Payment Date</span>

                  <strong>
                    {formatDate(
                      selectedPayment.createdAt
                    )}
                  </strong>
                </div>

              </div>


              {selectedPayment.status ===
                "failed" && (

                <div className="payment-failure-box">

                  <strong>
                    Payment Failed
                  </strong>

                  <p>
                    {
                      selectedPayment.failureReason ||
                      "No failure reason available."
                    }
                  </p>

                  {selectedPayment.failureCode && (
                    <span>
                      Code:{" "}
                      {
                        selectedPayment.failureCode
                      }
                    </span>
                  )}

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
    </>
  );
}

export default AdminPayments;