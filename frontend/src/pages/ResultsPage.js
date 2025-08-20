// import React from "react";
// import { useLocation } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// function ResultsPage() {
//   const location = useLocation();
//   const summary = location.state?.summary || "No summary available.";

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="card shadow-lg p-5 rounded text-center w-75">
//         <h2 className="mb-4">Summary</h2>
//         <p className="text-start">{summary}</p>
//         <a
//           href="http://127.0.0.1:5000/download_ppt"
//           className="btn btn-primary rounded-pill px-4 mt-3"
//         >
//           Download PPT
//         </a>
//       </div>
//     </div>
//   );
// }

// export default ResultsPage;

// import React from "react";
// import { useLocation } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// function ResultsPage() {
//   const location = useLocation();
//   const summary = location.state?.summary || "No summary available.";
//   const pptDownloadUrl =
//     location.state?.ppt_download_url || "http://127.0.0.1:5000/download_ppt";

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="card shadow-lg p-5 rounded text-center w-75">
//         <h2 className="mb-4">Summary</h2>

//         {/* Show summary in a clean readable way */}
//         <div className="text-start">
//           {summary.split("\n").map((line, index) => (
//             <p key={index} className="mb-2">
//               {line}
//             </p>
//           ))}
//         </div>

//         {/* Download Button */}
//         <a
//           href={pptDownloadUrl}
//           className="btn btn-primary rounded-pill px-4 mt-3"
//           download
//         >
//           Download PPT
//         </a>
//       </div>
//     </div>
//   );
// }

// export default ResultsPage;

import React from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function ResultsPage() {
  const location = useLocation();
  const summary = location.state?.summary || "No summary available.";

  // Split summary into sections
  const sections = summary.split("\n").filter((line) => line.trim() !== "");

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(to right, #f8fafc, #e0f2fe)" }}
    >
      <div className="card shadow-lg p-4 rounded" style={{ width: "800px", maxHeight: "90vh", overflowY: "auto" }}>
        <h2 className="text-center text-primary fw-bold mb-4">📑 AI-Generated Summary</h2>

        {/* Render sections with headings + bullets */}
        {sections.map((line, index) => {
          if (!line.startsWith("-")) {
            // Heading
            return (
              <h5 key={index} className="mt-3 text-dark fw-bold border-bottom pb-1">
                {line.replace(/\*\*/g, "")}
              </h5>
            );
          } else {
            // Bullet point
            return (
              <li key={index} className="text-muted">
                {line.replace("-", "•")}
              </li>
            );
          }
        })}

        <div className="text-center mt-4">
          <a
            href="http://127.0.0.1:5000/download_ppt"
            className="btn btn-success rounded-pill px-4"
          >
            📥 Download PPT
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
