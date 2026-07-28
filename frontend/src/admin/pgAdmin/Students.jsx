import { useEffect, useState } from "react";
import { Filter, Users, CheckCircle, Clock, XCircle, Mail, Phone, Calendar, Building2, Search } from "lucide-react";
import api, { IMAGE_BASE_URL } from "../../services/api";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Local states for UI filtering
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  // Apply BOTH search and status filters instantly
  const filteredStudents = students.filter((student) => {
    const matchesStatus = statusFilter === "all" ? true : student.status === statusFilter;
    
    // Safely check if the search term exists in the student's name or email
    const studentName = student.student_name || "Student";
    const studentEmail = student.student_email || "";
    
    const matchesSearch = 
      studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      studentEmail.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 md:space-y-8">
      
      {/* Compact Header */}
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600 md:text-xs">
              Students Management
            </p>
            <h1 className="mt-1.5 text-2xl font-black tracking-tight text-gray-900 md:text-3xl">
              Students & Occupancy
            </h1>
            <p className="mt-1.5 text-xs text-gray-500 md:text-sm">
              View students who have submitted booking requests, monitor occupancy status, and access contact details.
            </p>
          </div>

          <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-xs font-bold text-white transition hover:scale-[1.02] md:px-6 md:text-sm">
            + Add Booking
          </button>
        </div>
      </div>

      {/* Space-Optimized Stats (2x2 on Mobile, 1x4 on Desktop) */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 md:rounded-3xl">
          <div className="flex items-center gap-2">
            <Users className="text-gray-400" size={16} />
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 md:text-xs">Total Students</p>
          </div>
          <h2 className="mt-2 text-2xl font-black text-gray-900 sm:text-3xl md:mt-3 md:text-4xl">{totalStudents}</h2>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 md:rounded-3xl">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-emerald-500" size={16} />
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 md:text-xs">Approved</p>
          </div>
          <h2 className="mt-2 text-2xl font-black text-emerald-600 sm:text-3xl md:mt-3 md:text-4xl">{approvedStudents}</h2>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 md:rounded-3xl">
          <div className="flex items-center gap-2">
            <Clock className="text-amber-500" size={16} />
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 md:text-xs">Pending</p>
          </div>
          <h2 className="mt-2 text-2xl font-black text-amber-500 sm:text-3xl md:mt-3 md:text-4xl">{pendingStudents}</h2>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 md:rounded-3xl">
          <div className="flex items-center gap-2">
            <XCircle className="text-rose-500" size={16} />
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 md:text-xs">Rejected</p>
          </div>
          <h2 className="mt-2 text-2xl font-black text-rose-500 sm:text-3xl md:mt-3 md:text-4xl">{rejectedStudents}</h2>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Real-time Search Bar */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search students by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm font-semibold text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black placeholder:text-gray-400 shadow-sm"
          />
        </div>

        {/* Swipeable Status Filter Menu */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          <Filter className="mr-1 shrink-0 text-gray-400" size={18} />
          
          <button 
            onClick={() => setStatusFilter("all")}
            className={`shrink-0 rounded-full px-5 py-2 text-xs font-bold transition-all ${statusFilter === "all" ? "bg-black text-white shadow-md" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            All Students
          </button>
          <button 
            onClick={() => setStatusFilter("pending")}
            className={`shrink-0 rounded-full px-5 py-2 text-xs font-bold transition-all ${statusFilter === "pending" ? "bg-amber-500 text-white shadow-md" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setStatusFilter("approved")}
            className={`shrink-0 rounded-full px-5 py-2 text-xs font-bold transition-all ${statusFilter === "approved" ? "bg-emerald-500 text-white shadow-md" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            Approved
          </button>
          <button 
            onClick={() => setStatusFilter("rejected")}
            className={`shrink-0 rounded-full px-5 py-2 text-xs font-bold transition-all ${statusFilter === "rejected" ? "bg-rose-500 text-white shadow-md" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* Optimized Student Cards List */}
      <div className="space-y-4 md:space-y-5">
        {loading ? (
          <div className="rounded-3xl border border-gray-200 bg-white py-12 text-center shadow-sm">
            <p className="text-sm font-bold text-gray-500">Loading students...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white py-16 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
              <Users className="text-gray-400" size={24} />
            </div>
            <p className="text-base font-black text-gray-900">No students found</p>
            <p className="mt-1 text-xs text-gray-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          filteredStudents.map((student) => (
            <div
              key={student.id}
              className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow-md sm:p-5 lg:flex-row lg:items-center lg:justify-between"
            >
              {/* Left Profile Section */}
              <div className="flex items-center gap-4 lg:w-[40%] shrink-0">
                <img
                  src={student.profile_image ? `${IMAGE_BASE_URL}/uploads/${student.profile_image}` : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=200&auto=format&fit=crop"}
                  alt={student.title}
                  className="h-16 w-16 shrink-0 rounded-2xl object-cover sm:h-20 sm:w-20 shadow-sm"
                />

                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-base font-black tracking-tight text-gray-900 sm:text-lg">
                    {student.student_name || "Student"}
                  </h2>
                  <div className="mt-1.5 flex flex-col gap-1 sm:mt-2">
                    <p className="flex items-center gap-1.5 truncate text-[11px] font-medium text-gray-500 sm:text-xs">
                      <Mail size={12} className="shrink-0 text-gray-400" />
                      {student.student_email || "No Email"}
                    </p>
                    <p className="flex items-center gap-1.5 truncate text-[11px] font-medium text-gray-500 sm:text-xs">
                      <Phone size={12} className="shrink-0 text-gray-400" />
                      {student.student_phone || "No Phone"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Data Section (Span Mode) */}
              <div className="grid grid-cols-2 gap-2 rounded-2xl bg-gray-50 p-4 sm:grid-cols-3 sm:gap-4 lg:w-[55%] border border-gray-100">
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">PG Booked</p>
                  <p className="mt-1 flex items-center gap-1.5 truncate text-sm font-bold text-gray-900">
                    <Building2 size={14} className="shrink-0 text-gray-400" />
                    <span className="truncate">{student.title || "PG Name"}</span>
                  </p>
                </div>

                <div className="col-span-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Booked On</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-gray-900">
                    <Calendar size={14} className="shrink-0 text-gray-400" />
                    {student.booking_date ? new Date(student.booking_date).toLocaleDateString() : "N/A"}
                  </p>
                </div>

                <div className="col-span-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Status</p>
                  <span className={`mt-1.5 inline-flex rounded-md px-2.5 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm ${
                    student.status === "approved" ? "bg-emerald-100 text-emerald-700" : 
                    student.status === "rejected" ? "bg-rose-100 text-rose-700" : 
                    "bg-amber-100 text-amber-700"
                  }`}>
                    {student.status || "pending"}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Students;