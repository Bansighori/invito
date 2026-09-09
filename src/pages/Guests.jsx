import {
  useEffect,
  useMemo,
  useState
} from "react";

import api from "../api/axios";

import {
  Users,
  UserCheck,
  UserX,
  HelpCircle,
  Search,
  RefreshCw
} from "lucide-react";


function Guests() {

  // ==========================================
  // STATE
  // ==========================================

  const [invitations, setInvitations] =
    useState([]);

  const [selectedInvitation, setSelectedInvitation] =
    useState("");

  const [guests, setGuests] =
    useState([]);

  const [loadingInvitations, setLoadingInvitations] =
    useState(true);

  const [loadingGuests, setLoadingGuests] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [attendanceFilter, setAttendanceFilter] =
    useState("all");

  const [error, setError] =
    useState("");


  // ==========================================
  // GET INVITATIONS
  // ==========================================

  useEffect(() => {

    const fetchInvitations = async () => {

      try {

        setLoadingInvitations(true);

        setError("");


        // IMPORTANT:
        // Use authenticated api instance
        // so JWT is automatically attached.

        const response =
          await api.get(
            "/invitations"
          );


        const allInvitations =
          response.data.invitations || [];


        // Only published invitations
        // can receive RSVPs.

        const invitationData =
          allInvitations.filter(
            (invitation) =>
              invitation.status ===
              "published"
          );


        setInvitations(
          invitationData
        );


        // Select first published invitation
        // automatically.

        if (
          invitationData.length > 0
        ) {

          setSelectedInvitation(
            invitationData[0]._id
          );

        } else {

          setSelectedInvitation("");

        }

      } catch (error) {

        console.error(
          "Failed to fetch invitations:",
          error
        );

        console.error(
          "Server response:",
          error.response?.data
        );

        setError(
          error.response?.data?.message ||
          "Failed to load invitations."
        );

      } finally {

        setLoadingInvitations(false);

      }

    };


    fetchInvitations();

  }, []);


  // ==========================================
  // GET GUESTS
  // ==========================================

  const fetchGuests =
    async (invitationId) => {

      if (!invitationId) {

        setGuests([]);

        return;

      }


      try {

        setLoadingGuests(true);

        setError("");


        // IMPORTANT:
        // Use authenticated api instance.

        const response =
          await api.get(
            `/guests/invitation/${invitationId}`
          );


        setGuests(
          response.data.guests || []
        );

      } catch (error) {

        console.error(
          "Failed to fetch guests:",
          error
        );

        console.error(
          "Server response:",
          error.response?.data
        );

        setError(
          error.response?.data?.message ||
          "Failed to load RSVP responses."
        );

        setGuests([]);

      } finally {

        setLoadingGuests(false);

      }

    };


  // ==========================================
  // FETCH WHEN INVITATION CHANGES
  // ==========================================

  useEffect(() => {

    if (selectedInvitation) {

      fetchGuests(
        selectedInvitation
      );

    } else {

      setGuests([]);

    }

  }, [selectedInvitation]);


  // ==========================================
  // FILTER GUESTS
  // ==========================================

  const filteredGuests =
    useMemo(() => {

      return guests.filter(
        (guest) => {

          const matchesSearch =
            guest.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );


          const matchesAttendance =
            attendanceFilter === "all" ||
            guest.attendance ===
              attendanceFilter;


          return (
            matchesSearch &&
            matchesAttendance
          );

        }
      );

    }, [
      guests,
      search,
      attendanceFilter
    ]);


  // ==========================================
  // STATISTICS
  // ==========================================

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


  const totalPeopleComing =
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


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate =
    (date) => {

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


  // ==========================================
  // GET SELECTED INVITATION
  // ==========================================

  const selectedInvitationData =
    invitations.find(
      (invitation) =>
        invitation._id ===
        selectedInvitation
    );


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="guests-page">


      {/* ======================================
          HEADER
      ====================================== */}

      <div className="guests-page-header">

        <div>

          <p className="guests-page-label">
            GUEST MANAGEMENT
          </p>

          <h1>
            Guests & RSVPs
          </h1>

          <p className="guests-page-description">
            Manage your guest responses
            and track attendance.
          </p>

        </div>


        <button
          type="button"
          className="guests-refresh-button"
          onClick={() =>
            fetchGuests(
              selectedInvitation
            )
          }
          disabled={
            loadingGuests ||
            !selectedInvitation
          }
        >

          <RefreshCw
            size={17}
            className={
              loadingGuests
                ? "guests-refresh-spin"
                : ""
            }
          />

          Refresh

        </button>

      </div>


      {/* ======================================
          INVITATION SELECTOR
      ====================================== */}

      <div className="guests-toolbar">

        <div className="guests-invitation-selector">

          <label>
            Invitation
          </label>


          <select
            value={selectedInvitation}
            onChange={(event) =>
              setSelectedInvitation(
                event.target.value
              )
            }
            disabled={
              loadingInvitations
            }
          >

            {loadingInvitations ? (

              <option value="">
                Loading invitations...
              </option>

            ) : invitations.length === 0 ? (

              <option value="">
                No invitations found
              </option>

            ) : (

              invitations.map(
                (invitation) => (

                  <option
                    key={
                      invitation._id
                    }
                    value={
                      invitation._id
                    }
                  >
                    {invitation.title}
                  </option>

                )
              )

            )}

          </select>

        </div>


        {selectedInvitationData && (

          <div className="guests-selected-status">

            <span
              className={
                selectedInvitationData.status ===
                "published"
                  ? "status-published"
                  : "status-draft"
              }
            >
              {
                selectedInvitationData.status
              }
            </span>

          </div>

        )}

      </div>


      {/* ======================================
          ERROR
      ====================================== */}

      {error && (

        <div className="guests-error">
          {error}
        </div>

      )}


      {/* ======================================
          STATISTICS
      ====================================== */}

      <div className="guest-stats-grid">


        {/* TOTAL RESPONSES */}

        <div className="guest-stat-card">

          <div className="guest-stat-icon">

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


        {/* CONFIRMED */}

        <div className="guest-stat-card">

          <div className="guest-stat-icon">

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


        {/* MAYBE */}

        <div className="guest-stat-card">

          <div className="guest-stat-icon">

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


        {/* DECLINED */}

        <div className="guest-stat-card">

          <div className="guest-stat-icon">

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


      {/* ======================================
          TOTAL PEOPLE COMING
      ====================================== */}

      <div className="guests-coming-card">

        <div>

          <p>
            PEOPLE COMING
          </p>

          <h2>
            {totalPeopleComing}
          </h2>

        </div>

        <span>
          Based on confirmed RSVPs
        </span>

      </div>


      {/* ======================================
          GUEST TABLE
      ====================================== */}

      <div className="guests-table-card">


        <div className="guests-table-header">

          <div>

            <h2>
              RSVP Responses
            </h2>

            <p>
              Guest details and attendance
              responses.
            </p>

          </div>


          <div className="guests-filters">


            {/* SEARCH */}

            <div className="guests-search">

              <Search size={17} />

              <input
                type="text"
                placeholder="Search guest..."
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
              />

            </div>


            {/* FILTER */}

            <select
              value={
                attendanceFilter
              }
              onChange={(event) =>
                setAttendanceFilter(
                  event.target.value
                )
              }
            >

              <option value="all">
                All responses
              </option>

              <option value="yes">
                Confirmed
              </option>

              <option value="maybe">
                Maybe
              </option>

              <option value="no">
                Declined
              </option>

            </select>

          </div>

        </div>


        {/* ====================================
            LOADING GUESTS
        ==================================== */}

        {loadingGuests ? (

          <div className="guests-empty-state">

            <p>
              Loading RSVP responses...
            </p>

          </div>

        ) : filteredGuests.length === 0 ? (

          <div className="guests-empty-state">

            <Users size={40} />

            <h3>
              No RSVP responses
            </h3>

            <p>
              Guest responses for this
              invitation will appear here.
            </p>

          </div>

        ) : (

          <div className="guests-table-wrapper">

            <table className="guests-table">

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

                {filteredGuests.map(
                  (guest) => (

                    <tr
                      key={
                        guest._id
                      }
                    >

                      <td>

                        <div className="guest-name">

                          <div className="guest-avatar">

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

                        {
                          guest.numberOfGuests
                        }

                      </td>


                      <td>

                        <span className="guest-message">

                          {
                            guest.message ||
                            "No message"
                          }

                        </span>

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


export default Guests;