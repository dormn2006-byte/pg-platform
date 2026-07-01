import { useEffect, useState } from "react";
import api, { IMAGE_BASE_URL } from "../../services/api";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerPGs = async () => {
      try {
        const { data } = await api.get("/bookings/owner-bookings");
        setStudents(data.bookings || []);
      } catch (error) {
        console.error("Students Page Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerPGs();
  }, []);

  const totalStudents = students.length;
  const approvedStudents = students.filter(student => student.status === "approved").length;
  const pendingStudents = students.filter(student => student.status === "pending").length;
  const rejectedStudents = students.filter(student => student.status === "rejected").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Students Management
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-900">
              Students & Occupancy
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-500">
              View students who have submitted booking requests for your PGs. Monitor booking status, contact details and booking activity in one place.
            </p>
          </div>

          <button className="rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]">
            + Add Booking
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-4">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Students</p>
          <h2 className="mt-3 text-4xl font-black text-gray-900">{totalStudents}</h2>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Approved Bookings</p>
          <h2 className="mt-3 text-4xl font-black text-green-600">{approvedStudents}</h2>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Pending Bookings</p>
          <h2 className="mt-3 text-4xl font-black text-red-500">{pendingStudents}</h2>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Rejected Bookings</p>
          <h2 className="mt-3 text-4xl font-black text-blue-600">{rejectedStudents}</h2>
        </div>
      </div>

      {/* Student Cards */}
      <div className="space-y-5">
        {loading ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            Loading...
          </div>
        ) : students.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            No PG Data Found
          </div>
        ) : (
          students.map((student) => (
            <div
              key={student.id}
              className="flex flex-col gap-5 rounded-[30px] border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:flex-row lg:items-center"
            >
              <div className="flex items-center gap-4 lg:w-[320px]">
                <img
                  src={student.profile_image ? `${IMAGE_BASE_URL}/uploads/${student.profile_image}` : "https://via.placeholder.com/150"}
                  alt={student.title}
                  className="h-20 w-20 rounded-2xl object-cover"
                />

                <div>
                  <h2 className="text-2xl font-black tracking-tight text-gray-900">
                    {student.student_name || "Student"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {student.student_email}
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {student.student_phone || "No Phone"}
                  </p>
                </div>
              </div>

              <div className="grid flex-1 gap-4 md:grid-cols-4">
                <div className="rounded-2xl bg-gray-100 p-4">
                  <p className="text-xs font-medium text-gray-500">Student Name</p>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">{student.student_name}</h3>
                </div>

                <div className="rounded-2xl bg-gray-100 p-4">
                  <p className="text-xs font-medium text-gray-500">Email</p>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">{student.student_email}</h3>
                </div>

                <div className="rounded-2xl bg-gray-100 p-4">
                  <p className="text-xs font-medium text-gray-500">PG Booked</p>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">{student.title}</h3>
                </div>

                <div className="rounded-2xl bg-gray-100 p-4">
                  <p className="text-xs font-medium text-gray-500">Booking Status</p>
                  <span className={`mt-3 inline-flex rounded-full border px-4 py-2 text-xs font-bold ${student.status === 'approved' ? 'bg-green-100 text-green-700 border-green-200' : student.status === 'rejected' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
                    {student.status}
                  </span>
                </div>
              </div>

              <div className="mt-3 rounded-2xl bg-gray-100 p-4">
                <p className="text-xs font-medium text-gray-500">Booked On</p>
                <h3 className="mt-2 text-sm font-bold text-gray-900">
                  {student.booking_date ? new Date(student.booking_date).toLocaleDateString() : "N/A"}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3 lg:w-[260px] lg:justify-end">
                <button className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white">
                  View Booking
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Students;