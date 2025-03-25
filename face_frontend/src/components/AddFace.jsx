import React, { useState } from "react";

const AddFace = () => {
  const [name, setName] = useState("");
  const [reg, setReg] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !reg || !image) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("reg", reg);
    formData.append("image", image);

    try {
      const response = await fetch("http://127.0.0.1:5000/add_face", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage("Error registering face.");
    }
  };

  return (
    <div>
      <h2>Register Face</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Registration Number" onChange={(e) => setReg(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddFace;
