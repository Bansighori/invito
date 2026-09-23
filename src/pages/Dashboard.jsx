import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Mail,
  Users
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";


function Dashboard() {

  const navigate = useNavigate();


  // ==========================================
  // STATE
  // ==========================================

  const [invitations, setInvitations] =
    useState([]);

  const [guestData, setGuestData] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const user =
  JSON.parse(
    localStorage.getItem("invitoUser")
  ) || {
    name: "User"
  };
  // ==========================================
  // FETCH REAL DATA
  // ==========================================

  useEffect(() => {

    const fetchDashboardData =
      async () => {

        try {

          setLoading(true);
          setError("");


          // --------------------------------------
          // GET INVITATIONS
          // --------------------------------------

        const invitationResponse =
  await api.get(
    "/invitations"
  );


          const allInvitations =
            invitationResponse.data.invitations || [];


          // Dashboard uses published invitations
          const publishedInvitations =
            allInvitations.filter(
              (invitation) =>
                invitation.status === "published"
            );


          setInvitations(
            publishedInvitations
          );


          // --------------------------------------
          // GET GUESTS FOR EACH INVITATION
          // --------------------------------------

          const guestResults =
            await Promise.all(
              publishedInvitations.map(
                async (invitation) => {

                  try {

                    const response =
  await api.get(
    `/guests/invitation/${invitation._id}`
  );


                    return {
                      invitationId:
                        invitation._id,

                      guests:
                        response.data.guests || []
                    };

                  } catch (error) {

                    console.error(
                      `Failed to fetch guests for ${invitation._id}`,
                      error
                    );


                    return {
                      invitationId:
                        invitation._id,

                      guests: []
                    };

                  }

                }
              )
            );


          // --------------------------------------
          // CONVERT ARRAY TO OBJECT
          // --------------------------------------

          const guestMap = {};


          guestResults.forEach(
            (item) => {

              guestMap[
                item.invitationId
              ] = item.guests;

            }
          );


          setGuestData(
            guestMap
          );

        } catch (error) {

          console.error(
            "Dashboard data error:",
            error
          );


          setError(
            "Failed to load dashboard data."
          );

        } finally {

          setLoading(false);

        }

      };


    fetchDashboardData();

  }, []);


  // ==========================================
  // CALCULATE REAL RSVP DATA
  // ==========================================

  const allGuests =
    Object.values(
      guestData
    ).flat();


  const confirmedGuests =
    allGuests
      .filter(
        (guest) =>
          guest.attendance === "yes"
      )
      .reduce(
        (total, guest) =>
          total +
          Number(
            guest.numberOfGuests || 1
          ),
        0
      );


  const pendingGuests =
    allGuests
      .filter(
        (guest) =>
          guest.attendance === "maybe"
      )
      .reduce(
        (total, guest) =>
          total +
          Number(
            guest.numberOfGuests || 1
          ),
        0
      );


  const declinedGuests =
    allGuests
      .filter(
        (guest) =>
          guest.attendance === "no"
      )
      .reduce(
        (total, guest) =>
          total +
          Number(
            guest.numberOfGuests || 1
          ),
        0
      );


  const totalGuests =
    confirmedGuests +
    pendingGuests +
    declinedGuests;


  // ==========================================
  // GET GUEST COUNT FOR INVITATION
  // ==========================================

  const getInvitationGuestCount =
    (invitationId) => {

      const guests =
        guestData[invitationId] || [];


      return guests.reduce(
        (total, guest) =>
          total +
          Number(
            guest.numberOfGuests || 1
          ),
        0
      );

    };


  // ==========================================
  // GET CONFIRMED COUNT
  // ==========================================

  const getInvitationConfirmed =
    (invitationId) => {

      const guests =
        guestData[invitationId] || [];


      return guests
        .filter(
          (guest) =>
            guest.attendance === "yes"
        )
        .reduce(
          (total, guest) =>
            total +
            Number(
              guest.numberOfGuests || 1
            ),
          0
        );

    };


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate =
    (dateValue) => {

      if (!dateValue) {
        return "Date not set";
      }


      const date =
        new Date(dateValue);


      if (
        Number.isNaN(
          date.getTime()
        )
      ) {
        return dateValue;
      }


      return date.toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }
      );

    };


  // ==========================================
  // GET EVENT DATE
  // ==========================================

  const getEventDate =
    (invitation) => {

      return (
        invitation.data?.eventDate ||
        invitation.data?.date ||
        null
      );

    };


  // ==========================================
  // GET INVITATION TITLE
  // ==========================================

  const getInvitationTitle =
    (invitation) => {

      const data =
        invitation.data || {};


      // Wedding
      if (
        data.brideName &&
        data.groomName
      ) {

        return `${data.brideName} & ${data.groomName} Wedding`;

      }


      // Birthday
      if (data.name) {

        return `${data.name}'s Birthday`;

      }


      if (data.birthdayName) {

        return `${data.birthdayName}'s Birthday`;

      }


      // Engagement
      if (
        data.partnerOne &&
        data.partnerTwo
      ) {

        return `${data.partnerOne} & ${data.partnerTwo} Engagement`;

      }


      // Fall back to database title
      return (
        invitation.title ||
        "Untitled Invitation"
      );

    };


  // ==========================================
  // GET CATEGORY
  // ==========================================

  const getCategory =
    (invitation) => {

      return (
        invitation.category ||
        invitation.templateId?.category ||
        "Other"
      );

    };


  // ==========================================
  // UPCOMING EVENTS
  // ==========================================

  const upcomingEvents =
    [...invitations]
      .filter(
        (invitation) =>
          getEventDate(
            invitation
          )
      )
      .sort(
        (a, b) =>
          new Date(
            getEventDate(a)
          ) -
          new Date(
            getEventDate(b)
          )
      )
      .slice(0, 3);


  // ==========================================
  // RECENT INVITATIONS
  // ==========================================

  const recentInvitations =
    [...invitations]
      .sort(
        (a, b) =>
          new Date(
            b.createdAt
          ) -
          new Date(
            a.createdAt
          )
      )
      .slice(0, 5);


  // ==========================================
  // DONUT CALCULATIONS
  // ==========================================

  const totalRSVP =
    confirmedGuests +
    pendingGuests +
    declinedGuests;


  const confirmedDegrees =
    totalRSVP > 0
      ? (confirmedGuests / totalRSVP) *
        360
      : 0;


  const pendingDegrees =
    totalRSVP > 0
      ? (pendingGuests / totalRSVP) *
        360
      : 0;


  const pendingEnd =
    confirmedDegrees +
    pendingDegrees;


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div className="dashboard-loading">

        <LoaderCircle
          size={30}
          className="dashboard-loading-spinner"
        />

        <p>
          Loading dashboard...
        </p>

      </div>
    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (
      <div className="dashboard-error">

        <h2>
          Unable to load dashboard
        </h2>

        <p>
          {error}
        </p>

        <button
          type="button"
          onClick={() =>
            window.location.reload()
          }
        >
          Try Again
        </button>

      </div>
    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="dashboard-home">


      {/* ========================================
          HEADER
      ======================================== */}

      <div className="dashboard-home-header">

        <div>

          <span className="dashboard-eyebrow">
            OVERVIEW
          </span>

          <h1>
  Good morning, {user.name} 👋
</h1>

          <p>
            Here's what's happening with your invitations.
          </p>

        </div>


        <button
          type="button"
          className="dashboard-create-button"
          onClick={() =>
            navigate("/templates")
          }
        >

          <span>
            +
          </span>

          Create Invitation

        </button>

      </div>


      {/* ========================================
          STATISTICS
      ======================================== */}

      <div className="dashboard-stat-grid">


        {/* TOTAL INVITATIONS */}

        <div className="dashboard-stat-card">

          <div className="dashboard-stat-top">

            <div className="dashboard-stat-icon">

              <Mail
                size={17}
                strokeWidth={1.7}
              />

            </div>

            <ArrowUpRight
              size={15}
              className="dashboard-stat-arrow"
            />

          </div>


          <div className="dashboard-stat-value">
            {invitations.length}
          </div>


          <div className="dashboard-stat-title">
            Total Invitations
          </div>


          <div className="dashboard-stat-subtitle">
            Published invitations
          </div>

        </div>


        {/* TOTAL GUESTS */}

        <div className="dashboard-stat-card">

          <div className="dashboard-stat-top">

            <div className="dashboard-stat-icon">

              <Users
                size={17}
                strokeWidth={1.7}
              />

            </div>

            <ArrowUpRight
              size={15}
              className="dashboard-stat-arrow"
            />

          </div>


          <div className="dashboard-stat-value">
            {totalGuests}
          </div>


          <div className="dashboard-stat-title">
            Total Guests
          </div>


          <div className="dashboard-stat-subtitle">
            From RSVP responses
          </div>

        </div>


        {/* CONFIRMED */}

        <div className="dashboard-stat-card">

          <div className="dashboard-stat-top">

            <div className="dashboard-stat-icon">

              <CheckCircle2
                size={17}
                strokeWidth={1.7}
              />

            </div>

            <ArrowUpRight
              size={15}
              className="dashboard-stat-arrow"
            />

          </div>


          <div className="dashboard-stat-value">
            {confirmedGuests}
          </div>


          <div className="dashboard-stat-title">
            Confirmed Guests
          </div>


          <div className="dashboard-stat-subtitle">

            {totalGuests > 0
              ? `${(
                  (confirmedGuests /
                    totalGuests) *
                  100
                ).toFixed(1)}% of total`
              : "0% of total"}

          </div>

        </div>


        {/* PENDING */}

        <div className="dashboard-stat-card">

          <div className="dashboard-stat-top">

            <div className="dashboard-stat-icon">

              <Clock3
                size={17}
                strokeWidth={1.7}
              />

            </div>

            <ArrowUpRight
              size={15}
              className="dashboard-stat-arrow"
            />

          </div>


          <div className="dashboard-stat-value">
            {pendingGuests}
          </div>


          <div className="dashboard-stat-title">
            Pending RSVP
          </div>


          <div className="dashboard-stat-subtitle">

            {totalGuests > 0
              ? `${(
                  (pendingGuests /
                    totalGuests) *
                  100
                ).toFixed(1)}% of total`
              : "0% of total"}

          </div>

        </div>


      </div>


      {/* ========================================
          MIDDLE GRID
      ======================================== */}

      <div className="dashboard-middle-grid">


        {/* ======================================
            RSVP OVERVIEW
        ====================================== */}

        <div className="dashboard-panel rsvp-overview-panel">


          <div className="dashboard-panel-header">

            <div>

              <h2>
                RSVP Overview
              </h2>

              <p>
                Guest responses across all invitations
              </p>

            </div>


            <select
              className="dashboard-period-select"
              defaultValue="all"
            >

              <option value="all">
                All time
              </option>

              <option value="last30">
                Last 30 days
              </option>

              <option value="last7">
                Last 7 days
              </option>

            </select>

          </div>


          <div className="rsvp-overview-content">


            {/* DONUT */}

            <div className="rsvp-donut-wrapper">

              <div
                className="rsvp-donut"
                style={{
  background:
    totalRSVP > 0
      ? `conic-gradient(
          #ec4899 0deg ${confirmedDegrees}deg,
          #8b5cf6 ${confirmedDegrees}deg ${pendingEnd}deg,
          #f59e0b ${pendingEnd}deg 360deg
        )`
      : "linear-gradient(135deg, #ffd6e8, #ddd1ff)"
}}
              >

                <div className="rsvp-donut-center">

                  <strong>
                    {confirmedGuests}
                  </strong>

                  <span>
                    Confirmed
                  </span>

                </div>

              </div>

            </div>


            {/* LEGEND */}

            <div className="rsvp-legend">


              <div className="rsvp-legend-item">

                <span className="legend-dot confirmed" />

                <div>

                  <strong>
                    {confirmedGuests}
                  </strong>

                  <span>
                    Confirmed
                  </span>

                </div>

              </div>


              <div className="rsvp-legend-item">

                <span className="legend-dot pending" />

                <div>

                  <strong>
                    {pendingGuests}
                  </strong>

                  <span>
                    Pending
                  </span>

                </div>

              </div>


              <div className="rsvp-legend-item">

                <span className="legend-dot declined" />

                <div>

                  <strong>
                    {declinedGuests}
                  </strong>

                  <span>
                    Declined
                  </span>

                </div>

              </div>


            </div>

          </div>

        </div>


        {/* ======================================
            UPCOMING EVENTS
        ====================================== */}

        <div className="dashboard-panel upcoming-events-panel">


          <div className="dashboard-panel-header">

            <div>

              <h2>
                Upcoming Events
              </h2>

              <p>
                Your next invitations
              </p>

            </div>


            <button
              type="button"
              className="dashboard-view-all"
              onClick={() =>
                navigate("/invitations")
              }
            >
              View all
            </button>

          </div>


          <div className="upcoming-events-list">


            {upcomingEvents.length === 0 ? (

              <div className="dashboard-empty-small">

                <CalendarDays size={20} />

                <span>
                  No upcoming events
                </span>

              </div>

            ) : (

              upcomingEvents.map(
                (invitation) => {

                  const eventDate =
                    getEventDate(
                      invitation
                    );


                  const date =
                    new Date(
                      eventDate
                    );


                  return (

                    <div
                      className="upcoming-event-item"
                      key={
                        invitation._id
                      }
                    >

                      <div className="event-date-box">

                        <strong>
                          {date.getDate()}
                        </strong>

                        <span>
                          {date
                            .toLocaleDateString(
                              "en-US",
                              {
                                month: "short"
                              }
                            )
                            .toUpperCase()}
                        </span>

                      </div>


                      <div className="event-information">

                        <strong>
                          {getInvitationTitle(
                            invitation
                          )}
                        </strong>

                        <span>
                          {getCategory(
                            invitation
                          )}
                        </span>

                      </div>


                      <ArrowUpRight
                        size={15}
                        className="event-arrow"
                      />

                    </div>

                  );

                }
              )

            )}

          </div>

        </div>

      </div>


      {/* ========================================
          RECENT INVITATIONS
      ======================================== */}

      <div className="dashboard-panel recent-invitations-panel">


        <div className="dashboard-panel-header">

          <div>

            <h2>
              Recent Invitations
            </h2>

            <p>
              Your latest created invitations
            </p>

          </div>


          <button
            type="button"
            className="dashboard-view-all"
            onClick={() =>
              navigate("/invitations")
            }
          >
            View all
          </button>

        </div>


        <div className="recent-invitations-table">


          {/* TABLE HEADER */}

          <div className="recent-table-header">

            <span>
              INVITATION
            </span>

            <span>
              DATE
            </span>

            <span>
              GUESTS
            </span>

            <span>
              CONFIRMED
            </span>

            <span>
              STATUS
            </span>

            <span>
            </span>

          </div>


          {/* TABLE ROWS */}

          {recentInvitations.length === 0 ? (

            <div className="dashboard-empty-table">

              <Mail size={20} />

              <p>
                No published invitations yet.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/templates")
                }
              >
                Create Invitation
              </button>

            </div>

          ) : (

            recentInvitations.map(
              (invitation) => (

                <div
                  className="recent-table-row"
                  key={
                    invitation._id
                  }
                >


                  {/* INVITATION */}

                  <div className="recent-invitation-name">

                    <div className="recent-calendar-icon">

                      <CalendarDays
                        size={15}
                      />

                    </div>


                    <div>

                      <strong>
                        {getInvitationTitle(
                          invitation
                        )}
                      </strong>

                      <span>
                        {getCategory(
                          invitation
                        )}
                      </span>

                    </div>

                  </div>


                  {/* DATE */}

                  <span className="recent-table-date">

                    {formatDate(
                      getEventDate(
                        invitation
                      )
                    )}

                  </span>


                  {/* GUESTS */}

                  <span>
                    {
                      getInvitationGuestCount(
                        invitation._id
                      )
                    }
                  </span>


                  {/* CONFIRMED */}

                  <span>
                    {
                      getInvitationConfirmed(
                        invitation._id
                      )
                    }
                  </span>


                  {/* STATUS */}

                  <span>

                    <span className="published-status">
                      {invitation.status}
                    </span>

                  </span>


                  {/* ACTION */}

                  <button
                    type="button"
                    className="recent-row-action"
                    onClick={() =>
                      navigate(
                        `/invitations/${invitation._id}`
                      )
                    }
                  >

                    <ArrowUpRight
                      size={15}
                    />

                  </button>


                </div>

              )
            )

          )}

        </div>

      </div>


    </div>

  );

}


export default Dashboard;