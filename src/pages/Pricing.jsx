import {
  useEffect,
  useState
} from "react";

import { ArrowLeft } from "lucide-react";

import api from "../api/axios";

import { useNavigate } from "react-router-dom";

import UpgradePremium from "../components/UpgradePremium";
import UpgradePremiumPlus from "../components/UpgradePremiumPlus";
import SupportChatButton from "../components/SupportChatButton";

function Pricing() {
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ========================================
  // GET USER + PLANS
  // ========================================

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, plansResponse] =
          await Promise.all([
            api.get("/auth/me"),
            api.get("/plans")
          ]);
          console.log("User response:", userResponse.data);
console.log("Plans response:", plansResponse.data);

        if (userResponse.data.success) {
          setUser(userResponse.data.user);
        }

        if (plansResponse.data.success) {
          setPlans(
            plansResponse.data.plans.filter(
              (plan) => plan.active
            )
          );
        }
      } catch (error) {
        console.error(
          "Failed to load pricing:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ========================================
  // FIND PLANS
  // ========================================

  const freePlan = plans.find(
    (plan) => plan.key === "free"
  );

  const premiumPlan = plans.find(
    (plan) => plan.key === "premium"
  );

  const premiumPlusPlan = plans.find(
    (plan) => plan.key === "premium_plus"
  );

  // ========================================
  // CHECK ACTIVE PLAN
  // ========================================

  const isPlanActive =
    user?.plan !== "free" &&
    user?.planExpiresAt &&
    new Date(user.planExpiresAt) > new Date();

  const isPremium =
    isPlanActive &&
    user?.plan === "premium";

  const isPremiumPlus =
    isPlanActive &&
    user?.plan === "premium_plus";

  const hasPaidPlan =
    isPremium || isPremiumPlus;

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
    <>
    <style>
      {`
      .pricing-heading {
  position: relative;
  text-align: center;
  margin: 40px auto;
  padding: 0 30px;
}

.pricing-back-button {
  position: absolute;
  left: 30px;
  top: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: transparent;
  color: #6554ff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.pricing-heading-content .pricing-label {
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #666;
}

.pricing-heading-content h1 {
  margin: 0 0 14px;
}

.pricing-heading-content > p:last-child {
  margin: 0;
  color: #777;
}

@media (max-width: 600px) {
  .pricing-heading {
    padding: 35px 16px 0;
  }

  .pricing-back-button {
    left: 16px;
    top: 0;
  }
}`}
    </style>
    <div className="templates-page">
      <SupportChatButton />

      

      <section className="pricing-section">

        {/* =====================================
            HEADING
        ===================================== */}

        <div className="pricing-heading">
  <button
    className="pricing-back-button"
    onClick={() => navigate("/templates")}
  >
    <ArrowLeft size={18} />
    Back
  </button>

  <div className="pricing-heading-content">
    <p className="pricing-label">SIMPLE PRICING</p>
    <h1>Choose the perfect plan</h1>
    <p>Create beautiful invitations with the features you need.</p>
  </div>
</div>


        {/* =====================================
            ACTIVE PLAN
        ===================================== */}

        {hasPaidPlan && (

          <div className="active-plan-banner">

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

          {freePlan && (

            <div className="pricing-card">

              <div className="pricing-card-top">

                <span className="pricing-plan-name">
                  {freePlan.name}
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
                  {freePlan.price}
                </span>

                <span className="period">
                  {freePlan.duration === "Forever"
                    ? ""
                    : `/${freePlan.duration}`}
                </span>

              </div>


              <p className="pricing-description">
                {freePlan.description}
              </p>


              <div className="pricing-divider"></div>


              <ul className="pricing-features">

                {freePlan.features.map(
                  (feature, index) => (
                    <li key={index}>
                      <span>✓</span>
                      {feature}
                    </li>
                  )
                )}

              </ul>


              <button
                className="pricing-button current"
                disabled
              >
                Current Plan
              </button>

            </div>

          )}


          {/* =====================================
              PREMIUM PLAN
          ===================================== */}

          {premiumPlan && (

            <div
              className={`pricing-card ${
                isPremium
                  ? "active"
                  : ""
              }`}
            >

              <div className="pricing-card-top">

                <span className="pricing-plan-name">
                  {premiumPlan.name}
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
                  {premiumPlan.price}
                </span>

                <span className="period">
                  /{premiumPlan.duration}
                </span>

              </div>


              <p className="pricing-description">
                {premiumPlan.description}
              </p>


              <div className="pricing-divider"></div>


              <ul className="pricing-features">

                {premiumPlan.features.map(
                  (feature, index) => (
                    <li key={index}>
                      <span>✓</span>
                      {feature}
                    </li>
                  )
                )}

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

          )}


          {/* =====================================
              PREMIUM PLUS PLAN
          ===================================== */}

          {premiumPlusPlan && (

            <div
              className={`pricing-card premium-plus-card ${
                isPremiumPlus
                  ? "active"
                  : ""
              }`}
            >

              <div className="pricing-card-top">

                <span className="pricing-plan-name">
                  {premiumPlusPlan.name}
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
                  {premiumPlusPlan.price}
                </span>

                <span className="period">
                  /{premiumPlusPlan.duration}
                </span>

              </div>


              <p className="pricing-description">
                {premiumPlusPlan.description}
              </p>


              <div className="pricing-divider"></div>


              <ul className="pricing-features">

                {premiumPlusPlan.features.map(
                  (feature, index) => (
                    <li key={index}>
                      <span>✓</span>
                      {feature}
                    </li>
                  )
                )}

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

          )}

        </div>

      </section>

    </div>
    </>
  );
}

export default Pricing;