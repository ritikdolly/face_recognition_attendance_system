/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";

export const TakeAttendance = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [students, setStudents] = useState(['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown']);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    return () => {
      // Cleanup: Stop camera when unmounting
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setCapturedImage(canvas.toDataURL('image/jpg'));
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="flex w-full max-w-6xl bg-white overflow-hidden">
        
        {/* Camera Section */}
        <div className="flex flex-col items-center w-2/3 p-6">
          <video ref={videoRef} autoPlay className="w-full h-96 bg-gray-300 rounded-lg shadow-md"></video>
          <canvas ref={canvasRef} className="hidden"></canvas>
          <button 
            onClick={captureImage} 
            className="mt-4 rounded-lg bg-blue-500 text-white px-6 py-3 hover:bg-blue-600 transition-all"
            aria-label="Capture Image"
          >
            Capture Image
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Student List</h2>
          <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg shadow-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white text-center">
                  <th className="p-3">S No.</th>
                  <th className="p-3">Student Name</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="border-t text-center border-gray-300 odd:bg-gray-50 even:bg-white">
                    <td className="p-3 font-medium">{index + 1}</td>
                    <td className="p-3">{student}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-lg font-medium text-gray-800 mt-4">Total Students: {students.length}</p>
          <button 
            type="submit" 
            className="mt-4 rounded-lg bg-green-500 text-white px-8 py-3 hover:bg-green-600 transition-all shadow-md"
            aria-label="Submit Attendance"
          >
            Submit
          </button>
        </div>
        
      </div>
    </div>
  );
};
