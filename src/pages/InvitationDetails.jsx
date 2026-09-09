import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  ArrowLeft,
  Users,
  UserCheck,
  UserX,
  HelpCircle,
  CalendarDays,
  MapPin,
  RefreshCw
} from "lucide-react";

import {
  useNavigate,
  useParams
} from "react-router-dom";


function InvitationDetails() {

  const navigate = useNavigate();

  const { id } = useParams();


  const [invitation, setInvitation] =
    useState(null);

  const [guests, setGuests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  const fetchDetails = async () => {

    try {

      setLoading(true);

      setError("");


      // Get invitation

      const invitationResponse =
        await axios.get(
          `http://localhost:5000/api/invitations/${id}`
        );


      const invitationData =
        invitationResponse.data.invitation;


      setInvitation(
        invitationData
      );


      // Get guests

      const guestsResponse =
        await axios.get(
          `http://localhost:5000/api/guests/invitation/${id}`
        );


      setGuests(
        guestsResponse.data.guests || []
      );


    } catch (error) {

      console.error(
        "Failed to fetch invitation details:",
        error
      );

      setError(
        "Unable to load invitation details."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchDetails();

  }, [id]);


  const totalResponses =
    guests.length;


  const confirmed =
    guests.filter(
      (guest) =>
        guest.attendance === "yes"
    ).length;


  const maybe =
    guests.filter(
      (guest) =>
        guest.attendance === "maybe"
    ).length;


  const declined =
    guests.filter(
      (guest) =>
        guest.attendance === "no"
    ).length;


  const peopleComing =
    guests
      .filter(
        (guest) =>
          guest.attendance === "yes"
      )
      .reduce(
        (total, guest) =>
          total +
          Number(
            guest.numberOfGuests || 0
          ),
        0
      );

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

  if (loading) {

    return (
      <div className="simple-page">

        <p className="simple-page-label">
          INVITATION
        </p>

        <h1>
          Loading invitation...
        </h1>

      </div>
    );

  }


  if (error || !invitation) {

    return (
      <div className="simple-page">

        <p className="simple-page-label">
          INVITATION
        </p>

        <h1>
          Invitation Not Found
        </h1>

        <p>
          {error ||
            "This invitation does not exist."}
        </p>

        <button
          onClick={() =>
            navigate("/invitations")
          }
        >
          Back to Invitations
        </button>

      </div>
    );

  }


  return (
    <div className="invitation-details-page">


      <div className="invitation-details-header">

        <button
          className="invitation-details-back"
          onClick={() =>
            navigate("/invitations")
          }
        >

          <ArrowLeft size={17} />

          Back to Invitations

        </button>


        <button
          className="invitation-details-refresh"
          onClick={fetchDetails}
        >

          <RefreshCw size={16} />

          Refresh

        </button>

      </div>


      <div className="invitation-details-info">

        <div>

          <p className="invitation-details-label">
            {invitation.category}
          </p>

          <h1>
            {invitation.title}
          </h1>

          <span
            className={
              invitation.status === "published"
                ? "invitation-status published"
                : "invitation-status draft"
            }
          >
            {invitation.status}
          </span>

        </div>


        <div className="invitation-details-meta">

          <div>

            <CalendarDays size={16} />

            <span>
              Created{" "}
              {formatDate(
                invitation.createdAt
              )}
            </span>

          </div>


          {invitation.data?.venue && (

            <div>

              <MapPin size={16} />

              <span>
                {invitation.data.venue}
              </span>

            </div>

          )}

        </div>

      </div>


     
      <div className="invitation-details-stats">


        <div className="invitation-detail-stat">

          <div className="invitation-detail-stat-icon">

            <Users size={20} />

          </div>

          <div>

            <p>
              Total Responses
            </p>

            <h2>
              {totalResponses}
            </h2>

          </div>

        </div>


        <div className="invitation-detail-stat">

          <div className="invitation-detail-stat-icon">

            <UserCheck size={20} />

          </div>

          <div>

            <p>
              Confirmed
            </p>

            <h2>
              {confirmed}
            </h2>

          </div>

        </div>


        <div className="invitation-detail-stat">

          <div className="invitation-detail-stat-icon">

            <HelpCircle size={20} />

          </div>

          <div>

            <p>
              Maybe
            </p>

            <h2>
              {maybe}
            </h2>

          </div>

        </div>


        <div className="invitation-detail-stat">

          <div className="invitation-detail-stat-icon">

            <UserX size={20} />

          </div>

          <div>

            <p>
              Declined
            </p>

            <h2>
              {declined}
            </h2>

          </div>

        </div>

      </div>


      <div className="invitation-people-coming">

        <div>

          <p>
            PEOPLE COMING
          </p>

          <h2>
            {peopleComing}
          </h2>

        </div>

        <span>
          Total guests from confirmed RSVPs
        </span>

      </div>


      {/* ======================================
          GUEST RESPONSES
      ====================================== */}

      <div className="invitation-responses-card">

        <div className="invitation-responses-header">

          <div>

            <h2>
              Guest Responses
            </h2>

            <p>
              All RSVP responses for this
              invitation.
            </p>

          </div>

        </div>


        {guests.length === 0 ? (

          <div className="invitation-no-responses">

            <Users size={40} />

            <h3>
              No responses yet
            </h3>

            <p>
              Guest RSVP responses will
              appear here.
            </p>

          </div>

        ) : (

          <div className="invitation-responses-table-wrapper">

            <table className="invitation-responses-table">

              <thead>

                <tr>

                  <th>
                    Guest
                  </th>

                  <th>
                    Attendance
                  </th>

                  <th>
                    Guests
                  </th>

                  <th>
                    Message
                  </th>

                  <th>
                    Submitted
                  </th>

                </tr>

              </thead>


              <tbody>

                {guests.map(
                  (guest) => (

                    <tr
                      key={guest._id}
                    >

                      <td>

                        <div className="invitation-detail-guest">

                          <div className="invitation-detail-avatar">

                            {guest.name
                              ?.charAt(0)
                              .toUpperCase()}

                          </div>

                          <strong>
                            {guest.name}
                          </strong>

                        </div>

                      </td>


                      <td>

                        <span
                          className={`guest-attendance guest-attendance-${guest.attendance}`}
                        >

                          {guest.attendance ===
                            "yes" &&
                            "Confirmed"}

                          {guest.attendance ===
                            "maybe" &&
                            "Maybe"}

                          {guest.attendance ===
                            "no" &&
                            "Declined"}

                        </span>

                      </td>


                      <td>
                        {guest.numberOfGuests}
                      </td>


                      <td>

                        {guest.message ||
                          "No message"}

                      </td>


                      <td>

                        {formatDate(
                          guest.createdAt
                        )}

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


export default InvitationDetails;