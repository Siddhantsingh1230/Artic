import React, { useState  } from "react";
import axios from "axios";
import { serverURI } from "../App";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";



const Upload = () => {
  const [previewURL, setPreviewURL] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [caption,setCaption] =useState("");
  const navigate = useNavigate();
  const setPreview = (e) => {
    const [file] = e.target.files;
    setSelectedFile(e.target.files[0]);
    if (file) {
      setPreviewURL(URL.createObjectURL(file));
    } else {
      setPreviewURL("");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!selectedFile) {
      toast.error("No image selected");
      return;
    }
    const formData = new FormData();
    formData.append("posts", selectedFile);
    formData.append("postCaption",caption);
    axios
      .post(`${serverURI}/posts/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Request failed");
        }
      });
  };

  return (
    <>
      <div className="uploadContainer">
        <div className="uploadSection1">
          <div className="uploadTitle">
            Publish Tale <span>.</span>
          </div>
          <form onSubmit={submitHandler}>
            <label className="uploadBox">
              <i className="ri-upload-2-line"></i>
              <p>
                Drag & Drop or <span>Choose file</span> to upload
                <input
                  onChange={setPreview}
                  type="file"
                  name="posts"
                  accept="image/*"
                  required
                />
              </p>
              <p>img or vid</p>
            </label>
            <div className="captionInput">
              <input value={caption} onChange={(e)=>setCaption(e.target.value)} type="search" placeholder="Add caption" />
            </div>
            <div className="uploadAction">
              <button type="submit">Post</button>
            </div>
          </form>
        </div>
        <div className="uploadSection2">
          <div className="uploadTitle">Preview</div>
          <div className="uploadPreview">
            {previewURL ? (
              <img src={previewURL} alt="" className="imgPreview" />
            ) : (
              <p>Preview</p>
            )}
          </div>
        </div>
      </div>
      {loading ? <Spinner /> : null}
    </>
  );
};

export default Upload;
