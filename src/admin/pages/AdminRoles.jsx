import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./AdminRoles.css";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

function AdminRoles() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [admins, setAdmins] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  // ==========================================
  // LOAD ADMIN DATA
  // ==========================================

  const loadData = async () => {
  try {
    const [adminsRes, rolesRes] = await Promise.all([
      api.get("/admin/roles/admins"),
      api.get("/admin/roles"),
    ]);

    setAdmins(adminsRes.data.admins || []);
    setRoles(rolesRes.data.roles || []);
  } catch (error) {
    console.error(
      "ADMIN ROLES ERROR:",
      error.response?.data || error.message
    );
  }
};

useEffect(() => {
  loadData();
}, []);

  // ==========================================
  // CREATE ADMIN
  // ==========================================

  const createAdmin = async (e) => {
  e.preventDefault();

  try {
    await api.post("/admin/roles/admins", form);

    alert("Admin created successfully");
    setShowModal(false);

    setForm({
      name: "",
      email: "",
      password: "",
      role: "",
    });

    loadData();
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Failed to create admin"
    );
  }
};
  const deleteAdmin = async (admin) => {
  if (
    !window.confirm(
      `Are you sure you want to delete ${admin.name}?`
    )
  ) {
    return;
  }

  try {
    await api.delete(`/admin/roles/admins/${admin._id}`);

    alert("Admin deleted successfully");
    loadData();
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Failed to delete admin"
    );
  }
};


  return (
    <>
      <AdminSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <AdminNavbar />

      <div className="admin-roles">

        {/* HEADER */}

        <div className="roles-header">

          <div>
            <h1>Admin Roles</h1>

            <p>
              Manage administrators and
              their access levels.
            </p>
          </div>

          <button
            className="add-admin-btn"
            onClick={() =>
              setShowModal(true)
            }
          >
            + Add Admin
          </button>

        </div>


        {/* STATS */}

        <div className="role-stats">

          <div className="role-stat">
            <span>Total Admins</span>

            <strong>
              {admins.length}
            </strong>
          </div>


          <div className="role-stat">
            <span>Super Admin</span>

            <strong>
              {
                admins.filter(
                  (admin) =>
                    admin.role ===
                    "super_admin"
                ).length
              }
            </strong>
          </div>


          <div className="role-stat">
            <span>Active Admins</span>

            <strong>
              {
                admins.filter(
                  (admin) =>
                    admin.isActive
                ).length
              }
            </strong>
          </div>

        </div>


        {/* ADMIN TABLE */}

        <div className="admins-card">

          <div className="card-title">

            <h2>Admin Accounts</h2>

            <span>
              {admins.length} administrators
            </span>

          </div>


          <div className="admin-table">

            <div className="table-header">

  <span>Admin</span>
  <span>Email</span>
  <span>Role</span>
  <span>Status</span>
  <span>Actions</span>

</div>


            {admins.length === 0 ? (

              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  color: "#888"
                }}
              >
                No admin accounts found.
              </div>

            ) : (

              admins.map((admin) => (

                <div
                  className="table-row"
                  key={admin._id}
                >

                  <div className="admin-name">

                    <div className="avatar">
                      {admin.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <strong>
                      {admin.name}
                    </strong>

                  </div>


                  <span>
                    {admin.email}
                  </span>


                  <span>

                    <span
                      className={`role-badge ${admin.role}`}
                    >
                      {admin.role.replaceAll(
                        "_",
                        " "
                      )}
                    </span>

                  </span>


                  <span>

                    <span
                      className={
                        admin.isActive
                          ? "status active"
                          : "status inactive"
                      }
                    >
                      {admin.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </span>
                  <div className="admin-actions">

  {admin.role !== "super_admin" && (
    <button
      className="delete-admin-btn"
      onClick={() => deleteAdmin(admin)}
    >
      Delete
    </button>
  )}

  {admin.role === "super_admin" && (
    <span className="protected-admin">
      Protected
    </span>
  )}

</div>

                </div>

              ))

            )}

          </div>

        </div>


        {/* CREATE ADMIN MODAL */}

        {showModal && (

          <div className="modal-overlay">

            <div className="admin-modal">

              <button
                className="close-modal"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ×
              </button>


              <h2>
                Create New Admin
              </h2>


              <form
                onSubmit={createAdmin}
              >

                <label>
                  Name
                </label>

                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value
                    })
                  }
                  required
                />


                <label>
                  Email
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value
                    })
                  }
                  required
                />


                <label>
                  Password
                </label>

                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value
                    })
                  }
                  required
                />


                <label>
                  Role
                </label>

                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      role: e.target.value
                    })
                  }
                  required
                >

                  <option value="">
                    Select role
                  </option>

                  {roles
                    .filter(
                      (role) =>
                        role !==
                        "super_admin"
                    )
                    .map((role) => (

                      <option
                        key={role}
                        value={role}
                      >
                        {role.replaceAll(
                          "_",
                          " "
                        )}
                      </option>

                    ))}

                </select>


                <div className="modal-actions">

                  <button
                    type="button"
                    onClick={() =>
                      setShowModal(false)
                    }
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="create-btn"
                  >
                    Create Admin
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

      </div>
    </>
  );
}

export default AdminRoles;