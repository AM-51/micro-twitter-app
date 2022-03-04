import React, { useState, useContext } from "react";
import { storage, auth } from "../../util/dataBase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { TweetsContext } from "../../context/TweetsContext";
import { updateProfile } from "@firebase/auth";
import { Button } from "react-bootstrap";
import { BsCloudUpload } from "react-icons/bs";

export default function UploadProfileImage() {
  const [progress, setProgress] = useState(0);
  const [profileImage, setProfileImage] = useState("");
  const { currentUserCollection } = useContext(TweetsContext);

  function uploadImage() {
    if (!profileImage) return;
    const storageRef = ref(
      storage,
      `/users/${currentUserCollection.id}/Profile.jpg`
    );
    const uploadTask = uploadBytesResumable(
      storageRef,
      profileImage,
      "data-url"
    );

    uploadTask.on(
      "state_change",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((img) => {
          updateProfile(auth.currentUser, {
            photoURL: img,
          });
        });
      }
    );
  }

  function formHandler(e) {
    e.preventDefault();
    uploadImage(profileImage);
  }

  return (
    <div>
      <form onSubmit={formHandler}>
        <label className="form-label mt-4">Upload profile image</label>
        <div className="d-flex align-items-center mt-1">
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={(e) => {
              setProfileImage(e.target.files[0]);
            }}
          />
          <Button className="ms-2" type="submit" variant="dark">
            <BsCloudUpload />
          </Button>
        </div>
        <p>
          <small>progress {progress}%</small>
        </p>
      </form>
    </div>
  );
}
