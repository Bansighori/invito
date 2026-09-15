import {
  useEffect,
  useState
} from "react";

import {
  User,
  Mail,
  Save,
  Lock,
  KeyRound
} from "lucide-react";

import {
  updateProfile,
  
} from "../api/authApi";


function Settings() {

  // ==========================================
  // USER STATE
  // ==========================================

  const [user, setUser] =
    useState({
      name: "",
      email: ""
    });


  // ==========================================
  // PROFILE STATE
  // ==========================================

  const [profileMessage, setProfileMessage] =
    useState("");

  const [profileError, setProfileError] =
    useState("");

  const [profileLoading, setProfileLoading] =
    useState(false);


  

  // ==========================================
  // LOAD LOGGED-IN USER
  // ==========================================

  useEffect(() => {

    const savedUser =
      JSON.parse(
        localStorage.getItem("invitoUser")
      );

    if (savedUser) {

      setUser({
        name:
          savedUser.name || "",

        email:
          savedUser.email || ""
      });

    }

  }, []);


  // ==========================================
  // PROFILE INPUT CHANGE
  // ==========================================

  const handleProfileChange = (event) => {

    const {
      name,
      value
    } = event.target;


    setUser({
      ...user,
      [name]: value
    });

  };


  // ==========================================
  // UPDATE PROFILE
  // ==========================================

  const handleProfileSave = async (event) => {

    event.preventDefault();

    setProfileMessage("");
    setProfileError("");


    // Validate name

    if (!user.name.trim()) {

      setProfileError(
        "Name is required."
      );

      return;

    }


    try {

      setProfileLoading(true);


      // Send updated name to backend

      const response =
        await updateProfile({
          name:
            user.name.trim()
        });


      // Get updated user

      const updatedUser =
        response.data.user;


      // Update localStorage

      localStorage.setItem(
        "invitoUser",
        JSON.stringify(
          updatedUser
        )
      );

      setUser({

        name:
          updatedUser.name,

        email:
          updatedUser.email

      });


      setProfileMessage(
        "Profile updated successfully."
      );


      setTimeout(() => {

        setProfileMessage("");

      }, 3000);


    } catch (error) {

      console.error(
        "Profile update error:",
        error
      );


      setProfileError(
        error.response?.data?.message ||
        "Failed to update profile."
      );

    } finally {

      setProfileLoading(false);

    }

  };

  

  


   


    

    



  // ==========================================
  // AVATAR INITIALS
  // ==========================================

  const initials =
    user.name
      ? user.name
          .split(" ")
          .filter(Boolean)
          .map(
            (word) => word[0]
          )
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "U";


  // ==========================================
  // JSX
  // ==========================================

  return (

    <div className="settings-page">

      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="settings-header">

        <div>

          <p className="settings-label">
            ACCOUNT
          </p>


          <h1>
            Settings
          </h1>


          <p>
            Manage your account and security
            preferences.
          </p>

        </div>

      </div>


      {/* ======================================
          PROFILE CARD
      ====================================== */}

      <div className="settings-card">

        <div className="settings-card-header">

          <div>

            <h2>
              Profile
            </h2>


            <p>
              Manage your personal account
              information.
            </p>

          </div>

        </div>


        {/* ====================================
            PROFILE PREVIEW
        ==================================== */}

        <div className="settings-profile">

          <div className="settings-avatar">

            {initials}

          </div>


          <div>

            <strong>
              {user.name || "User"}
            </strong>


            <span>
              Invito User
            </span>

          </div>

        </div>


        {/* ====================================
            PROFILE FORM
        ==================================== */}

        <form
          className="settings-form"
          onSubmit={handleProfileSave}
        >

          {/* NAME */}

          <div className="settings-field">

            <label>
              Full Name
            </label>


            <div className="settings-input-wrapper">

              <User size={17} />


              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleProfileChange}
                placeholder="Enter your name"
                required
              />

            </div>

          </div>


          {/* EMAIL */}

          <div className="settings-field">

            <label>
              Email Address
            </label>


            <div className="settings-input-wrapper">

              <Mail size={17} />


              <input
                type="email"
                name="email"
                value={user.email}
                disabled
              />

            </div>


            <small>
              Email cannot be changed from here.
            </small>

          </div>


          {/* PROFILE SUCCESS */}

          {profileMessage && (

            <div className="settings-success">

              {profileMessage}

            </div>

          )}


          {/* PROFILE ERROR */}

          {profileError && (

            <div className="settings-error">

              {profileError}

            </div>

          )}


          {/* SAVE PROFILE */}

          <button
            type="submit"
            className="settings-save-button"
            disabled={profileLoading}
          >

            <Save size={17} />


            <span>

              {profileLoading
                ? "Saving..."
                : "Save Changes"}

            </span>

          </button>

        </form>

      </div>


        </div>

  );

}


export default Settings;