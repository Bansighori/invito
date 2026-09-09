import { useState } from "react";
import axios from "axios";


function RSVPForm({ invitationId }) {

  const [formData, setFormData] = useState({
    name: "",
    attendance: "",
    numberOfGuests: 1,
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");


  const handleChange = (event) => {

    const {
      name,
      value
    } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));

  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");


    try {

      const response =
        await axios.post(
          "http://localhost:5000/api/guests",
          {
            invitationId,

            name:
              formData.name,

            attendance:
              formData.attendance,

            numberOfGuests:
              Number(
                formData.numberOfGuests
              ),

            message:
              formData.message
          }
        );


      if (response.data.success) {

        setSuccess(
          "Your RSVP has been submitted successfully!"
        );


        setFormData({
          name: "",
          attendance: "",
          numberOfGuests: 1,
          message: ""
        });

      }

    } catch (error) {

      console.error(
        "RSVP submission error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to submit RSVP. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <section className="rsvp-section">

      <div className="rsvp-card">

        <div className="rsvp-header">

          <p className="rsvp-small-title">
            WE WOULD LOVE TO HEAR FROM YOU
          </p>

          <h2>
            RSVP
          </h2>

          <p className="rsvp-description">
            Please let us know if you will be
            joining us.
          </p>

        </div>


        <form
          className="rsvp-form"
          onSubmit={handleSubmit}
        >

          {/* NAME */}

          <div className="rsvp-field">

            <label htmlFor="name">
              Guest Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

          </div>


          {/* ATTENDANCE */}

          <div className="rsvp-field">

            <label htmlFor="attendance">
              Will you attend?
            </label>

            <select
              id="attendance"
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              required
            >

              <option value="">
                Select attendance
              </option>

              <option value="yes">
                Yes, I will attend
              </option>

              <option value="no">
                No, I can't attend
              </option>

              <option value="maybe">
                Maybe
              </option>

            </select>

          </div>


          {/* NUMBER OF GUESTS */}

          <div className="rsvp-field">

            <label htmlFor="numberOfGuests">
              Number of Guests
            </label>

            <input
              id="numberOfGuests"
              type="number"
              name="numberOfGuests"
              min="1"
              value={formData.numberOfGuests}
              onChange={handleChange}
              required
            />

          </div>


          {/* MESSAGE */}

          <div className="rsvp-field">

            <label htmlFor="message">
              Message
            </label>

            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write a message..."
              rows="4"
            />

          </div>


          {/* ERROR */}

          {error && (
            <div className="rsvp-error">
              {error}
            </div>
          )}


          {/* SUCCESS */}

          {success && (
            <div className="rsvp-success">
              {success}
            </div>
          )}


          {/* SUBMIT */}

          <button
            type="submit"
            className="rsvp-submit-button"
            disabled={loading}
          >

            {loading
              ? "Submitting..."
              : "Submit RSVP"
            }

          </button>

        </form>

      </div>

    </section>
  );
}


export default RSVPForm;