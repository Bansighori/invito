import { useEffect, useState } from "react";
import api from "../api/axios";

import {
  Users,
  Mail,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

import "./Analytics.css";
function Analytics() {

  const [invitations, setInvitations] =
    useState([]);
  
  const [analytics, setAnalytics] =
    useState({
      totalInvitations: 0,
      totalGuests: 0,
      confirmed: 0,
      pending: 0,
      declined: 0
    });

  const [invitationStats, setInvitationStats] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        setLoading(true);
        setError("");
        const invitationResponse =
          await api.get("/invitations");

        const allInvitations =
          invitationResponse.data.invitations || [];

        // Only published invitations
        const publishedInvitations =
          allInvitations.filter(
            (invitation) =>
              invitation.status === "published"
          );

        setInvitations(
          publishedInvitations
        );


        // --------------------------------------
        // Get guests for every invitation
        // --------------------------------------

        const invitationResults =
          await Promise.all(

            publishedInvitations.map(
              async (invitation) => {

                try {

                  const guestResponse =
                    await api.get(
                      `/guests/invitation/${invitation._id}`
                    );

                  const guests =
                    guestResponse.data.guests || [];


                  let confirmed = 0;
                  let pending = 0;
                  let declined = 0;


                  guests.forEach(
                    (guest) => {

                      const count =
                        Number(
                          guest.numberOfGuests
                        ) || 1;


                      if (
                        guest.attendance ===
                        "yes"
                      ) {

                        confirmed += count;

                      } else if (
                        guest.attendance ===
                        "maybe"
                      ) {

                        pending += count;

                      } else if (
                        guest.attendance ===
                        "no"
                      ) {

                        declined += count;

                      }

                    }
                  );


                  return {

                    id:
                      invitation._id,

                    title:
                      invitation.title,

                    category:
                      invitation.category,

                    confirmed,

                    pending,

                    declined,

                    total:
                      confirmed +
                      pending +
                      declined

                  };

                } catch (guestError) {

                  console.error(
                    "Failed to fetch guests:",
                    guestError
                  );

                  return {

                    id:
                      invitation._id,

                    title:
                      invitation.title,

                    category:
                      invitation.category,

                    confirmed: 0,
                    pending: 0,
                    declined: 0,
                    total: 0

                  };

                }

              }
            )

          );


        setInvitationStats(
          invitationResults
        );


        const totalGuests =
          invitationResults.reduce(
            (
              total,
              invitation
            ) =>
              total +
              invitation.total,
            0
          );


        const confirmed =
          invitationResults.reduce(
            (
              total,
              invitation
            ) =>
              total +
              invitation.confirmed,
            0
          );


        const pending =
          invitationResults.reduce(
            (
              total,
              invitation
            ) =>
              total +
              invitation.pending,
            0
          );


        const declined =
          invitationResults.reduce(
            (
              total,
              invitation
            ) =>
              total +
              invitation.declined,
            0
          );


        setAnalytics({

          totalInvitations:
            publishedInvitations.length,

          totalGuests,

          confirmed,

          pending,

          declined

        });


      } catch (error) {

        console.error(
          "Analytics error:",
          error
        );

        setError(
          "Failed to load analytics data."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchAnalytics();

  }, []);

  const pieData = [

    {
      name: "Confirmed",
      value: analytics.confirmed
    },

    {
      name: "Pending",
      value: analytics.pending
    },

    {
      name: "Declined",
      value: analytics.declined
    }

  ];


  if (loading) {

    return (
      <div className="analytics-page">

        <div className="analytics-loading">
          Loading analytics...
        </div>

      </div>
    );

  }


  if (error) {

    return (
      <div className="analytics-page">

        <div className="analytics-error">
          {error}
        </div>

      </div>
    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="analytics-page">


      {/* =====================================
          HEADER
          ===================================== */}

      <div className="analytics-header">

        <div>

          <p className="analytics-eyebrow">
            INSIGHTS
          </p>

          <h1>
            Analytics
          </h1>

          <p className="analytics-description">
            View invitation performance and RSVP
            statistics.
          </p>

        </div>

      </div>


      {/* =====================================
          STAT CARDS
          ===================================== */}

      <div className="analytics-stats-grid">


        {/* TOTAL INVITATIONS */}

        <div className="analytics-stat-card">

          <div className="analytics-stat-icon">

            <Mail size={20} />

          </div>

          <div>

            <span>
              Total Invitations
            </span>

            <strong>
              {analytics.totalInvitations}
            </strong>

          </div>

        </div>


        {/* TOTAL GUESTS */}

        <div className="analytics-stat-card">

          <div className="analytics-stat-icon">

            <Users size={20} />

          </div>

          <div>

            <span>
              Total Guests
            </span>

            <strong>
              {analytics.totalGuests}
            </strong>

          </div>

        </div>


        {/* CONFIRMED */}

        <div className="analytics-stat-card">

          <div className="analytics-stat-icon">

            <CheckCircle size={20} />

          </div>

          <div>

            <span>
              Confirmed
            </span>

            <strong>
              {analytics.confirmed}
            </strong>

          </div>

        </div>


        {/* PENDING */}

        <div className="analytics-stat-card">

          <div className="analytics-stat-icon">

            <Clock size={20} />

          </div>

          <div>

            <span>
              Pending
            </span>

            <strong>
              {analytics.pending}
            </strong>

          </div>

        </div>


        {/* DECLINED */}

        <div className="analytics-stat-card">

          <div className="analytics-stat-icon">

            <XCircle size={20} />

          </div>

          <div>

            <span>
              Declined
            </span>

            <strong>
              {analytics.declined}
            </strong>

          </div>

        </div>


      </div>


      {/* =====================================
          CHART SECTION
          ===================================== */}

      <div className="analytics-chart-grid">


        {/* ===================================
            RSVP PIE CHART
            =================================== */}

        <div className="analytics-chart-card">

          <div className="analytics-card-header">

            <div>

              <h2>
                RSVP Overview
              </h2>

              <p>
                Guest response distribution
              </p>

            </div>

            <TrendingUp size={20} />

          </div>


          {analytics.totalGuests === 0 ? (

            <div className="analytics-empty-chart">

              <Users size={32} />

              <p>
                No RSVP responses yet.
              </p>

            </div>

          ) : (

            <div className="analytics-pie-container">

              <div className="analytics-pie-chart">

  <ResponsiveContainer width="100%" height={320}>

    <PieChart>

      <Pie
        data={pieData}
        cx="50%"
        cy="45%"
        innerRadius={65}
        outerRadius={105}
        paddingAngle={5}
        dataKey="value"
        isAnimationActive={false}
      >

        <Cell fill="#ec4899" />
        <Cell fill="#8b5cf6" />
        <Cell fill="#f97316" />

      </Pie>

      <Tooltip />

      <Legend
        verticalAlign="bottom"
        height={30}
      />

    </PieChart>

  </ResponsiveContainer>

</div>

            </div>

          )}

        </div>


        {/* ===================================
            BAR CHART
            =================================== */}

        <div className="analytics-chart-card">

          <div className="analytics-card-header">

            <div>

              <h2>
                Invitation Performance
              </h2>

              <p>
                RSVP responses by invitation
              </p>

            </div>

          </div>


          {invitationStats.length === 0 ? (

            <div className="analytics-empty-chart">

              <Mail size={32} />

              <p>
                No published invitations yet.
              </p>

            </div>

          ) : (

            <ResponsiveContainer
              width="100%"
              height={340}
            >

              <BarChart
                data={invitationStats}
                layout="vertical"
                margin={{
                  top: 10,
                  right: 30,
                  left: 30,
                  bottom: 10
                }}
                barGap={4}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  allowDecimals={false}
                />

                <YAxis
                  type="category"
                  dataKey="title"
                  width={120}
                  tick={{
                    fontSize: 12
                  }}
                />

                <Tooltip />

                <Legend
                  verticalAlign="top"
                  height={45}
                />

                <Bar
                  dataKey="confirmed"
                  name="Confirmed"
                  fill="#6b7280"
                  radius={[0, 5, 5, 0]}
                  barSize={14}
                />

                <Bar
                  dataKey="pending"
                  name="Pending"
                  fill="#b59b72"
                  radius={[0, 5, 5, 0]}
                  barSize={14}
                />

                <Bar
                  dataKey="declined"
                  name="Declined"
                  fill="#a66a6a"
                  radius={[0, 5, 5, 0]}
                  barSize={14}
                />

              </BarChart>

            </ResponsiveContainer>

          )}

        </div>

      </div>


      {/* =====================================
          INVITATION TABLE
          ===================================== */}

      <div className="analytics-table-card">

        <div className="analytics-card-header">

          <div>

            <h2>
              Invitation Statistics
            </h2>

            <p>
              Detailed RSVP performance
            </p>

          </div>

        </div>


        {invitationStats.length === 0 ? (

          <div className="analytics-table-empty">

            <p>
              No published invitations available.
            </p>

          </div>

        ) : (

          <div className="analytics-table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    Invitation
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Total Guests
                  </th>

                  <th>
                    Confirmed
                  </th>

                  <th>
                    Pending
                  </th>

                  <th>
                    Declined
                  </th>

                </tr>

              </thead>


              <tbody>

                {invitationStats.map(
                  (invitation) => (

                    <tr
                      key={
                        invitation.id
                      }
                    >

                      <td>

                        <strong>
                          {invitation.title}
                        </strong>

                      </td>

                      <td>
                        {invitation.category}
                      </td>

                      <td>
                        {invitation.total}
                      </td>

                      <td>

                        <span className="analytics-status confirmed">
                          {invitation.confirmed}
                        </span>

                      </td>

                      <td>

                        <span className="analytics-status pending">
                          {invitation.pending}
                        </span>

                      </td>

                      <td>

                        <span className="analytics-status declined">
                          {invitation.declined}
                        </span>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );

}


export default Analytics;