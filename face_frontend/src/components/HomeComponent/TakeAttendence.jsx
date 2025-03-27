/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { data, useParams } from "react-router-dom";

export const TakeAttendance = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [regNo, setRegNos] = useState([]);

  const teacherId = localStorage.getItem("teacherId");
  const { courseName } = useParams();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(async (blob) => {
        if (blob) {
          setCapturedImage(URL.createObjectURL(blob)); // Display image
          await sendImageForRecognition(blob); // Pass blob directly
        } else {
          console.error("Error capturing image.");
        }
      }, "image/jpeg");
    }
  };

  // Use useEffect to log after state update
  useEffect(() => {
    console.log("Final Updated Reg Nos:", regNo);
  }, [regNo]); // Runs whenever regNos updates

  const sendImageForRecognition = async (imageBlob) => {
    if (!imageBlob) {
      console.error("No image captured!");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageBlob, "captured.jpg");
    formData.append("teacherId", teacherId);
    formData.append("subject", courseName);

    // Log FormData contents
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/attendance/uploads",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Server Response:", data);

      if(data.regNo){
        setRegNos((prevRegNos) => {
          if (!prevRegNos.includes(data.regNo)) {
            const updatedRegNos = [...prevRegNos, data.regNo];
            console.log("Updated Reg Nos inside setState:", updatedRegNos);
            return updatedRegNos;
          } else {
            alert(`Reg No ${data.regNo} is already present. Not adding.`);
            return prevRegNos; // No change if duplicate
          }
        });
      }else{
        alert("No regNo found in response data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Camera Section */}
        <div className="flex flex-col items-center w-2/3 p-6 border-r border-gray-300">
          <video
            ref={videoRef}
            autoPlay
            className="w-full h-96 bg-gray-300 rounded-lg shadow-md"
          ></video>
          <canvas ref={canvasRef} className="hidden"></canvas>
          <button
            onClick={captureImage}
            className={`mt-4 rounded-lg text-white px-6 py-3 transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            aria-label="Capture Image"
            disabled={loading}
          >
            {loading ? "Processing..." : "Capture Image"}
          </button>
          {capturedImage && (
            <img
              src={capturedImage}
              alt="Captured"
              className="mt-4 w-28 h-28 rounded-lg border"
            />
          )}
        </div>

        {/* Student List Section */}
        <div className="w-1/3 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Recognized Students
          </h2>
          <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg shadow-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-green-500 text-white text-center">
                  <th className="p-3">S No.</th>
                  <th className="p-3">Student Reg</th>
                </tr>
              </thead>
              <tbody>
                {regNo.length > 0 ? (
                  regNo.map((student, index) => (
                    <tr
                      key={index}
                      className="border-t text-center border-gray-300 odd:bg-gray-50 even:bg-white"
                    >
                      <td className="p-3 font-medium">{index + 1}</td>
                      <td className="p-3">{student}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    
                    <td
                      colSpan="2"
                      className="p-3 text-center text-gray-500"
                    >NO Data Present</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="text-lg font-medium text-gray-800 mt-4">
            Total Recognized: {regNo.length}
          </p>
        </div>
      </div>
    </div>
  );
};
