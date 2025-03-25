import React, { useState } from "react";

const CaptureFace = () => {
  const [name, setName] = useState("");
  const [reg, setReg] = useState("");
  const [message, setMessage] = useState("");

  const handleCapture = async () => {
    if (!name || !reg) {
      setMessage("Name and Registration Number are required!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/capture_face", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, reg }),
      });

      const data = await response.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage("Error capturing face.");
    }
  };

  return (
    <div>
      <h2>Capture Face & Register</h2>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Registration Number" onChange={(e) => setReg(e.target.value)} />
      <button onClick={handleCapture}>Capture & Register</button>
      <p>{message}</p>
    </div>
  );
};

export default CaptureFace;
