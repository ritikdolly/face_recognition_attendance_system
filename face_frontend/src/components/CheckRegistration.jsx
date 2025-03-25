import React, { useState } from "react";

const CheckRegistration = () => {
  const [reg, setReg] = useState("");
  const [result, setResult] = useState(null);

  const checkRegistration = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/check_registration?reg=${reg}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Error checking registration." });
    }
  };

  return (
    <div>
      <h2>Check Registration</h2>
      <input type="text" placeholder="Enter Reg Number" onChange={(e) => setReg(e.target.value)} />
      <button onClick={checkRegistration}>Check</button>
      {result && <p>{result.registered ? `Registered as ${result.name}` : "Not Registered"}</p>}
    </div>
  );
};

export default CheckRegistration;
