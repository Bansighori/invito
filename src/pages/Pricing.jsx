import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

import UpgradePremium from "../components/UpgradePremium";
import UpgradePremiumPlus from "../components/UpgradePremiumPlus";

function Pricing() {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  // ========================================
  // GET CURRENT USER
  // ========================================

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const response =
          await api.get("/auth/me");

        if (
          response.data.success
        ) {

          setUser(
            response.data.user
          );

        }

      } catch (error) {

        console.error(
          "Failed to fetch current user:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchUser();

  }, []);


  // ========================================
  // CHECK ACTIVE PLAN
  // ========================================

  const isPlanActive =
    user?.plan !== "free" &&
    user?.planExpiresAt &&
    new Date(
      user.planExpiresAt
    ) > new Date();


  const isPremium =
    isPlanActive &&
    user?.plan === "premium";


  const isPremiumPlus =
    isPlanActive &&
    user?.plan === "premium_plus";


  // IMPORTANT:
  // Used for the active plan banner

  const hasPaidPlan =
    isPremium ||
    isPremiumPlus;


  // ========================================
  // LOADING
  // ========================================

  if (loading) {

    return (

      <div className="templates-page">

        <section className="pricing-section">

          <div className="pricing-heading">

            <p className="pricing-eyebrow">
              SIMPLE PRICING
            </p>

            <h2>
              Choose the perfect plan
            </h2>

            <p>
              Create beautiful invitations
              with the features you need.
            </p>

          </div>

          <div className="templates-loading">

            <div className="loading-spinner"></div>

            <p>
              Loading pricing...
            </p>

          </div>

        </section>

      </div>

    );

  }


  // ========================================
  // MAIN
  // ========================================

  return (

    <div className="templates-page">

      {/* =====================================
          PRICING SECTION
      ===================================== */}

      <section className="pricing-section">


        {/* =====================================
            HEADING
        ===================================== */}

        <div className="pricing-heading">

          <p className="pricing-eyebrow">
            SIMPLE PRICING
          </p>

          <h2>
            Choose the perfect plan
          </h2>

          <p>
            Create beautiful invitations with the
            features you need.
          </p>

        </div>


        {/* =====================================
            ACTIVE PLAN
        ===================================== */}

        {hasPaidPlan && (

          <div className="active-plan-banner">

            {/* LEFT */}

            <div className="active-plan-left">

              <div className="active-plan-icon">
                ✓
              </div>


              <div className="active-plan-content">

                <h3>

                  Your{" "}

                  {user?.plan === "premium_plus"
                    ? "Premium Plus"
                    : "Premium"}

                  {" "}Plan is Active! 🎉

                </h3>


                <p>

                  You have full access to all{" "}

                  {user?.plan === "premium_plus"
                    ? "Premium Plus"
                    : "Premium"}

                  {" "}features.

                </p>

              </div>

            </div>


            {/* RIGHT */}

            <div className="active-plan-right">

              <div className="active-plan-date">

                <span>
                  Active until
                </span>


                <strong>

                  {user?.planExpiresAt
                    ? new Date(
                        user.planExpiresAt
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric"
                        }
                      )
                    : "-"}

                </strong>

              </div>


              <button
                type="button"
                className="manage-plan-btn"
                onClick={() =>
                  document
                    .getElementById(
                      "pricing-plans"
                    )
                    ?.scrollIntoView({
                      behavior: "smooth"
                    })
                }
              >
                ⚙ Manage Plan
              </button>

            </div>

          </div>

        )}


        {/* =====================================
            PRICING GRID
        ===================================== */}

        <div
          className="pricing-grid"
          id="pricing-plans"
        >


          {/* =====================================
              FREE PLAN
          ===================================== */}

          <div className="pricing-card">

            <div className="pricing-card-top">

              <span className="pricing-plan-name">
                Free
              </span>


              <span className="pricing-badge">
                STARTER
              </span>

            </div>


            <div className="pricing-price">

              <span className="currency">
                ₹
              </span>

              <span className="amount">
                0
              </span>

              <span className="period">
                /month
              </span>

            </div>


            <p className="pricing-description">

              Everything you need to create
              beautiful invitations.

            </p>


            <div className="pricing-divider"></div>


            <ul className="pricing-features">

              <li>
                <span>✓</span>
                3 invitations
              </li>

              <li>
                <span>✓</span>
                Free templates
              </li>

              <li>
                <span>✓</span>
                RSVP management
              </li>

              <li>
                <span>✓</span>
                Public invitation URL
              </li>

              <li>
                <span>✓</span>
                Basic sharing
              </li>

            </ul>


            <button
              className="pricing-button current"
              disabled
            >
              Current Plan
            </button>

          </div>


          {/* =====================================
              PREMIUM PLAN
          ===================================== */}

          <div
            className={`pricing-card ${
              isPremium
                ? "active"
                : ""
            }`}
          >

            <div className="pricing-card-top">

              <span className="pricing-plan-name">
                Premium
              </span>


              <span className="pricing-badge premium">
                PRO
              </span>

            </div>


            <div className="pricing-price">

              <span className="currency">
                ₹
              </span>

              <span className="amount">
                199
              </span>

              <span className="period">
                /30 days
              </span>

            </div>


            <p className="pricing-description">

              Unlimited invitations with powerful
              premium features.

            </p>


            <div className="pricing-divider"></div>


            <ul className="pricing-features">

              <li>
                <span>✓</span>
                Unlimited invitations
              </li>

              <li>
                <span>✓</span>
                All premium templates
              </li>

              <li>
                <span>✓</span>
                Advanced RSVP
              </li>

              <li>
                <span>✓</span>
                Invitation analytics
              </li>

              <li>
                <span>✓</span>
                WhatsApp sharing
              </li>

              <li>
                <span>✓</span>
                Google Maps location
              </li>

              <li>
                <span>✓</span>
                Custom invitation URL
              </li>

            </ul>


            {isPremium ? (

              <button
                className="pricing-button current"
                disabled
              >
                ✓ Current Plan
              </button>

            ) : (

              <UpgradePremium
                isPremium={false}
              />

            )}

          </div>


          {/* =====================================
              PREMIUM PLUS PLAN
          ===================================== */}

          <div
            className={`pricing-card premium-plus-card ${
              isPremiumPlus
                ? "active"
                : ""
            }`}
          >

            <div className="pricing-card-top">

              <span className="pricing-plan-name">
                Premium Plus
              </span>


              <span className="pricing-badge plus-badge">
                PLUS
              </span>

            </div>


            <div className="pricing-price">

              <span className="currency">
                ₹
              </span>

              <span className="amount">
                299
              </span>

              <span className="period">
                /30 days
              </span>

            </div>


            <p className="pricing-description">

              The ultimate invitation experience
              with advanced creative features.

            </p>


            <div className="pricing-divider"></div>


            <ul className="pricing-features">

              <li>
                <span>✓</span>
                Everything in Premium
              </li>

              <li>
                <span>✓</span>
                Photo gallery
              </li>

              <li>
                <span>✓</span>
                Background music
              </li>

              <li>
                <span>✓</span>
                Advanced analytics
              </li>

              <li>
                <span>✓</span>
                Advanced RSVP
              </li>

              <li>
                <span>✓</span>
                Custom invitation URL
              </li>

              <li>
                <span>✓</span>
                WhatsApp sharing
              </li>

            </ul>


            {isPremiumPlus ? (

              <button
                className="pricing-button current"
                disabled
              >
                ✓ Current Plan
              </button>

            ) : (

              <UpgradePremiumPlus />

            )}

          </div>


        </div>

      </section>

    </div>

  );

}

export default Pricing;