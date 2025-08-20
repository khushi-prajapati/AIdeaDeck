// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// function WelcomePage() {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center vh-100"
//       style={{
//         background: "linear-gradient(to right, #667eea, #764ba2)",
//       }}
//     >
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="card shadow-lg p-5 rounded text-center">
//         <h1 className="mb-4text-success fw-bold">AIdeaDeck</h1>
//         <p className="mb-4 text-muted fs-5">Turn your PDFs into summaries & presentations 🚀</p>
//         <button
//           className="btn btn-success rounded-pill px-5 py-2"
//           onClick={() => navigate("/upload")}
//         >
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// }

// export default WelcomePage;

import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right, #667eea, #764ba2)",
      }}
    >
      <div className="card shadow-lg p-5 rounded text-center bg-white">
        <h1 className="mb-4 text-success fw-bold">AIdeaDeck</h1>
        <p className="mb-4 text-muted fs-5">
          Turn your PDFs into summaries & presentations 🚀
        </p>
        <button
          className="btn btn-success rounded-pill px-5 py-2"
          onClick={() => navigate("/upload")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
