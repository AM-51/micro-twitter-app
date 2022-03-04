import React, { useContext } from "react";
import "./profile.css";
import { TweetsContext } from "../../context/TweetsContext";
import UploadProfileImage from "../UploadProfileImage/UploadProfileImage";
import { auth } from "../../util/dataBase";

function Profile() {
  const { currentUserCollection } = useContext(TweetsContext);

  return (
    <div className="d-flex justify-content-center col-12 mt-4">
      <div className="d-flex flex-column align-items-center col-6 profile-breakpoint">
        {currentUserCollection && (
          <div className="profile-card d-flex flex-column align-items-center justify-content-between profile-breakpoint">
            {auth.currentUser.photoURL && <img src={auth.currentUser.photoURL} alt="Profile Pic" className="profile-img mt-3" />}
            <p>{currentUserCollection.userName}</p>
            <p>{currentUserCollection.email}</p>
          </div>
        )}
        <UploadProfileImage />
      </div>
    </div>
  );
}

export default Profile;
