import { useEffect, useState } from "react";
import "../styles/userProfile.css";
import type { User } from "../types/schema/user";
import { useAuth } from "../hooks/useAuth";
import axiosInstance from "../resources/axios.Instance.create";

const FieldGroup = ({
  label,
  value,
  editing,
  inputEl,
  full = false,
}: {
  label: string;
  value: string;
  editing: boolean;
  inputEl: React.ReactNode;
  full?: boolean;
}) => (
  <div className={`gm-field-group${full ? " full" : ""}`}>
    <span className="gm-field-label">{label}</span>
    {editing ? inputEl : <span className="gm-field-value">{value || "—"}</span>}
  </div>
);

export default function UserProfile() {
    const { loggedInUser } = useAuth();
    const [userBooking, setUserBoking] = useState([]); 
    
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [draft, setDraft] = useState<User | null>(null);

  useEffect(() => {
      if (loggedInUser) {
          setDraft(loggedInUser);
          
      }
      const fetchedBookingOfUser = async() => {
          const response = await axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/get/bookings`);
          if (response.status === 200 || response.status === 304) {
              setUserBoking(response?.data?.fetchedAllUserBookings)
          }
      }

      fetchedBookingOfUser()
  }, [ ]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const getInitials = (u: User) =>
    `${u.firstName?.[0] ?? ""}${u.lastName?.[0] ?? ""}`.toUpperCase() || "G";

  const handleEdit = () => {
    if (!loggedInUser) return;

    setDraft(loggedInUser);
    setEditing(true);
  };

  const handleCancel = () => {
    if (!loggedInUser) return;

    setDraft(loggedInUser);
    setEditing(false);
  };

  const handleSave = async () => {
    if (!draft) return;

    try {
     
        
        await axiosInstance.patch(`${import.meta.env.VITE_BACKEND_URL}/update/user/${draft.id}`, {
            firstName: draft.firstName,
            lastName: draft.lastName,
            email: draft.email,
            avatar:draft.avatar

        })

      setEditing(false);
      showToast("Profile updated successfully");
    } catch (error) {
      console.error(error);
      showToast("Failed to update profile");
    }
  };

  const updateDraft = (
    key: keyof Pick<User, "firstName" | "lastName" | "email" | "avatar">,
    value: string
  ) => {
    setDraft((prev) =>
      prev
        ? {
            ...prev,
            [key]: value,
          }
        : prev
    );
  };

  if (!loggedInUser || !draft) {
    return (
      <div className="gm-page">
        <div className="gm-profile-wrapper">
          <h3>Loading profile...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="gm-page">
      <div className="gm-profile-wrapper">
        {/* Brand Header */}
        <div className="gm-brand-header">
          <div className="gm-logo-mark">G</div>
          <span className="gm-brand-name">Grand Maison</span>
        </div>

        {/* Profile Header */}
        <div className="gm-profile-top">
          <div className="gm-avatar-wrap">
            <div className="gm-avatar-ring">
              <div className="gm-avatar-inner">
                {loggedInUser?.avatar ? (
                  <img
                    src={loggedInUser?.avatar}
                    alt="Profile"
                    className="gm-avatar-image"
                  />
                ) : (
                  getInitials(loggedInUser)
                )}
              </div>
            </div>

            <div className="gm-avatar-badge">★</div>
          </div>

          <div>
            <p className="gm-profile-name">
              {loggedInUser.firstName} {loggedInUser.lastName}
            </p>

            <p className="gm-profile-since">
              Member since{" "}
              {loggedInUser.createdAt}
            </p>

            <div className="gm-tier-pill">
              <span className="gm-tier-dot" />
              {loggedInUser.role}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="gm-stats-row">
          {[
            { val: userBooking.length, lbl: "Bookings" },
          ].map(({ val, lbl }) => (
            <div key={lbl} className="gm-stat-cell">
              <p className="gm-stat-val">{val}</p>
              <p className="gm-stat-lbl">{lbl}</p>
            </div>
          ))}
        </div>

        {/* Personal Information */}
        <div>
          <div className="gm-section-label">Personal Information</div>

          <div className="gm-info-grid">
            <FieldGroup
              label="First Name"
              value={loggedInUser.firstName ?? ""}
              editing={editing}
              inputEl={
                <input
                  className="gm-input"
                  value={draft.firstName ?? ""}
                  onChange={(e) =>
                    updateDraft("firstName", e.target.value)
                  }
                />
              }
            />

            <FieldGroup
              label="Last Name"
              value={loggedInUser.lastName ?? ""}
              editing={editing}
              inputEl={
                <input
                  className="gm-input"
                  value={draft.lastName ?? ""}
                  onChange={(e) =>
                    updateDraft("lastName", e.target.value)
                  }
                />
              }
            />

            <FieldGroup
              label="Email Address"
              value={loggedInUser.email}
              editing={editing}
              full
              inputEl={
                <input
                  type="email"
                  className="gm-input"
                  value={draft.email}
                  onChange={(e) =>
                    updateDraft("email", e.target.value)
                  }
                />
              }
            />

            <FieldGroup
              label="Avatar URL"
              value={loggedInUser.avatar ?? ""}
              editing={editing}
              full
              inputEl={
                <input
                  className="gm-input"
                  placeholder="https://example.com/avatar.jpg"
                  value={draft.avatar ?? ""}
                  onChange={(e) =>
                    updateDraft("avatar", e.target.value)
                  }
                />
              }
            />

            <FieldGroup
              label="Role"
              value={loggedInUser.role}
              editing={false}
              inputEl={<></>}
            />

            <FieldGroup
              label="Member Since"
              value={new Date(
                loggedInUser?.createdAt
              ).toLocaleDateString()}
              editing={false}
              inputEl={<></>}
            />
          </div>

          {/* Actions */}
          <div className="gm-actions-row">
            {!editing ? (
              <button
                className="gm-btn-ghost"
                onClick={handleEdit}
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <div className="gm-actions-right">
                <button
                  className="gm-btn-ghost"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  className="gm-btn-primary"
                  onClick={handleSave}
                >
                  ✓ Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Toast */}
        <div className={`gm-toast${toast ? " show" : ""}`}>
          <span className="gm-toast-icon">✓</span>
          {toast}
        </div>
      </div>
    </div>
  );
}