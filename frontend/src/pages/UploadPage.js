
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// function UploadPage() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return alert("Please upload a PDF file.");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);

//       const res = await axios.post("http://127.0.0.1:5000/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       // Navigate to results page with summary
//       navigate("/results", { state: { summary: res.data.summary } });
//     } catch (err) {
//       console.error("Upload error:", err.response || err.message);
//       alert("Error uploading file. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="card shadow-lg p-5 rounded text-center">
//         <h2 className="mb-4">Upload PDF</h2>
//         {/* ✅ Important: Add encType */}
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <input
//             type="file"
//             accept="application/pdf"
//             className="form-control mb-3"
//             onChange={handleFileChange}
//           />
//           <button
//             type="submit"
//             className="btn btn-success rounded-pill px-4"
//             disabled={loading}
//           >
//             {loading ? (
//               <span className="spinner-border spinner-border-sm"></span>
//             ) : (
//               "Upload & Summarize"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default UploadPage;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a PDF file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/results", { state: { summary: res.data.summary } });
    } catch (err) {
      console.error(err);
      alert("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right, #667eea, #764ba2)",
      }}
    >
      <div className="card shadow-lg p-5 rounded text-center" style={{ width: "450px" }}>
        <h1 className="mb-4 text-success fw-bold">AIdeaDeck</h1>
        <p className="text-muted">Upload your PDF & get AI-powered slides</p>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="application/pdf"
            className="form-control mb-3"
            onChange={handleFileChange}
          />

          {file && <p className="text-success small">Selected: {file.name}</p>}

          <button
            type="submit"
            className="btn btn-success rounded-pill px-4 w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Summarizing...
              </>
            ) : (
              "Upload & Summarize"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadPage;
