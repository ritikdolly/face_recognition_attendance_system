// /* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useRef, useState } from "react";
// import { data, useParams } from "react-router-dom";
// import PresentList from "./PresentList";

// export const TakeAttendance = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [regNos, setRegNos] = useState([]);

//   const teacherId = localStorage.getItem("teacherId");
//   const { courseName } = useParams();

//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error("Error accessing camera:", error);
//       }
//     };

//     startCamera();

//     return () => {
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   const captureImage = () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;

//     if (canvas && video) {
//       const context = canvas.getContext("2d");
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       canvas.toBlob(async (blob) => {
//         if (blob) {
//           setCapturedImage(URL.createObjectURL(blob)); // Display image
//           await sendImageForRecognition(blob); // Pass blob directly
//         } else {
//           console.error("Error capturing image.");
//         }
//       }, "image/jpeg");
//     }
//   };

//   // Use useEffect to log after state update
//   useEffect(() => {
//     console.log("Final Updated Reg Nos:", regNos);
//   }, [regNos]); // Runs whenever regNos updates

//   const sendImageForRecognition = async (imageBlob) => {
//     if (!imageBlob) {
//       console.error("No image captured!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", imageBlob, "captured.jpg");
//     formData.append("teacherId", teacherId);
//     formData.append("subject", courseName);

//     // Log FormData contents
//     for (let pair of formData.entries()) {
//       console.log(pair[0] + ", " + pair[1]);
//     }

//     try {
//       const response = await fetch(
//         "http://127.0.0.1:5000/api/attendance/recognize",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();
//       console.log("Server Response:", data);

//       if(data.regNo){
//         setRegNos((prevRegNos) => {
//           if (!prevRegNos.includes(data.regNo)) {
//             const updatedRegNos = [...prevRegNos, data.regNo];
//             console.log("Updated Reg Nos inside setState:", updatedRegNos);
//             return updatedRegNos;
//           } else {
//             alert(`Reg No ${data.regNo} is already present. Not adding.`);
//             return prevRegNos; // No change if duplicate
//           }
//         });
//       }else{
//         alert("No regNo found in response data.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
//         {/* Camera Section */}
//         <div className="flex flex-col items-center w-2/3 p-6 border-r border-gray-300">
//           <video
//             ref={videoRef}
//             autoPlay
//             className="w-full h-96 bg-gray-300 rounded-lg shadow-md"
//           ></video>
//           <canvas ref={canvasRef} className="hidden"></canvas>
//           <button
//             onClick={captureImage}
//             className={`mt-4 rounded-lg text-white px-6 py-3 transition-all ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-500 hover:bg-blue-600"
//             }`}
//             aria-label="Capture Image"
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Capture Image"}
//           </button>
//           {capturedImage && (
//             <img
//               src={capturedImage}
//               alt="Captured"
//               className="mt-4 w-28 h-28 rounded-lg border"
//             />
//           )}
//         </div>

//         {/* Student List Section */}
//          {/* Student List Section (Moved to PresentList component) */}
//          <PresentList regNos={regNos} />
//       </div>
//     </div>
//   );
// };


import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PresentList from "./PresentList";

export const TakeAttendance = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [regNos, setRegNos] = useState([]);

  const teacherId = localStorage.getItem("teacherId");
  const { courseName } = useParams();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
          setCapturedImage(URL.createObjectURL(blob));
          await sendImageForRecognition(blob);
        } else {
          console.error("Error capturing image.");
        }
      }, "image/jpeg");
    }
  };

  const sendImageForRecognition = async (imageBlob) => {
    if (!imageBlob) return console.error("No image captured!");

    const formData = new FormData();
    formData.append("image", imageBlob, "captured.jpg");
    formData.append("teacherId", teacherId);
    formData.append("subject", courseName);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/attendance/recognize", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      // if (data.regNo) {
      //   setRegNos((prevRegNos) => (!prevRegNos.includes(data.regNo) ? [...prevRegNos, data.regNo] : prevRegNos));
      // }else{
      //   alert("No regNo found in response data.");
      // }
      if (data.regNo) {
        setRegNos((prevRegNos) => {
          if (prevRegNos.includes(data.regNo)) {
            alert(`Reg No. ${data.regNo} is already marked as present!`);
            return prevRegNos;
          } else {
            return [...prevRegNos, data.regNo];
          }
        });
      } else {
        alert("No regNo found in response data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-[#0F172A] text-white">
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-[url('/path-to-face-recognition-bg.jpg')] bg-cover opacity-30 blur-lg"></div>

      {/* Content Wrapper */}
      <div className="relative flex w-full max-w-7xl bg-[#1E293B] bg-opacity-90 p-8 rounded-lg shadow-xl backdrop-blur-lg">
        {/* Camera Section */}
        <div className="flex flex-col items-center w-2/3 p-6 border-r border-gray-600">
          <h2 className="text-2xl font-bold text-[#06B6D4] mb-4">Face Recognition Attendance</h2>
          <video ref={videoRef} autoPlay className="w-full h-96 bg-gray-700 rounded-lg shadow-md"></video>
          <canvas ref={canvasRef} className="hidden"></canvas>
          <button
            onClick={captureImage}
            className={`mt-4 text-white px-6 py-3 rounded-lg transition-all ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#06B6D4] hover:bg-[#0284C7]"}`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Capture Image"}
          </button>
          {/* {capturedImage && <img src={capturedImage} alt="Captured" className="mt-4 w-28 h-28 rounded-lg border shadow-md" />} */}
        </div>

        {/* Student List Section */}
        <PresentList regNos={regNos} />
      </div>
    </div>
  );
};
