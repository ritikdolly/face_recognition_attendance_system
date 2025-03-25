import { useState } from "react";
import { Pencil, Trash } from "lucide-react";

export const SessionsTable = () => {
    const [sessions, setSessions] = useState([
        { id: 1, course: "CS-311 AI", students: 30, status: "Active" },
        { id: 2, course: "CS-402 ML", students: 25, status: "Completed" },
      ]);
    
      const handleEdit = (id) => {
        console.log("Edit session", id);
      };
    
      const handleDelete = (id) => {
        setSessions(sessions.filter((session) => session.id !== id));
      };
    
      return (
        <div className="p-6 bg-purple-800 min-h-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-purple-700 text-center">SESSIONS</h2>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-purple-600 text-white">
                    <th className="p-3">ID</th>
                    <th className="p-3">COURSE</th>
                    <th className="p-3">NO. OF STUDENTS</th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session) => (
                    <tr key={session.id} className="border-b hover:bg-gray-100">
                      <td className="p-3 text-center">{session.id}</td>
                      <td className="p-3 text-center">{session.course}</td>
                      <td className="p-3 text-center">{session.students}</td>
                      <td className="p-3 text-center">{session.status}</td>
                      <td className="p-3 text-center flex justify-center gap-3">
                        <button onClick={() => handleEdit(session.id)} className="text-blue-500 hover:text-blue-700">
                          <Pencil size={20} />
                        </button>
                        <button onClick={() => handleDelete(session.id)} className="text-red-500 hover:text-red-700">
                          <Trash size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
}
