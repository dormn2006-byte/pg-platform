import { useEffect, useState, useCallback, useMemo } from "react";
import { Users, Mail, Phone, Building2, Search, CheckCircle2, Clock, XCircle } from "lucide-react";
import api from "../../services/api";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/bookings/owner-bookings");
      setStudents(data.bookings || []);
    } catch (error) {
      console.error("Students Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Dynamic status counts
  const counts = useMemo(() => ({
    all: students.length,
    approved: students.filter((s) => s.status === "approved").length,
    pending: students.filter((s) => s.status === "pending").length,
    rejected: students.filter((s) => s.status === "rejected").length,
  }), [students]);

  // Filtered List
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const studentName = s.student_name || "";
      const studentEmail = s.student_email || "";
      const matchesSearch =
        studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        studentEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "all" ? true : s.status?.toLowerCase() === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [students, searchTerm, activeTab]);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      
      {/* Big Bold Action Bar & Filter Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-3xl border border-gray-200 dark:border-white/15 bg-white dark:bg-[#0c1220] p-5 shadow-sm">
        
        {/* Large Status Filter Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {[
            { id: "all", label: "All Students", count: counts.all },
            { id: "approved", label: "Active Tenants", count: counts.approved },
            { id: "pending", label: "Pending Approval", count: counts.pending },
            { id: "rejected", label: "Declined Applications", count: counts.rejected },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 rounded-2xl px-5 py-3.5 text-sm font-black transition-all shrink-0 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
              }`}
            >
              <span>{tab.label}</span>
              <span className={`rounded-xl px-2.5 py-0.5 text-xs font-black ${
                activeTab === tab.id ? "bg-white/20 text-white" : "bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-gray-200"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Large Search Field */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search student name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 py-3.5 pl-12 pr-4 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-[#141b2d]"
          />
        </div>
      </div>

      {/* Student Cards Showcase - Big, Clear & Bold */}
      {loading ? (
        <div className="rounded-3xl border border-gray-200 dark:border-white/15 bg-white dark:bg-[#0c1220] p-16 text-center shadow-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 dark:border-gray-800 border-t-blue-500 mx-auto mb-4"></div>
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Loading student directory...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="rounded-3xl border border-gray-200 dark:border-white/15 bg-white dark:bg-[#0c1220] p-16 text-center shadow-sm">
          <Users size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-black text-gray-900 dark:text-white">No students found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Adjust search or filters to see resident records.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((s) => (
            <div
              key={s.id}
              className="group flex flex-col rounded-3xl border border-gray-200 dark:border-white/15 bg-white dark:bg-[#0c1220] overflow-hidden p-6 shadow-md hover:shadow-2xl transition-all duration-300 justify-between space-y-5"
            >
              {/* Header Details */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-xl font-black text-white shadow-md">
                    {(s.student_name || "S").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white leading-tight truncate">
                      {s.student_name || "Student Applicant"}
                    </h3>
                    <span className="text-xs font-bold text-gray-400">ID #{s.student_id || s.id}</span>
                  </div>
                </div>

                <span className={`rounded-xl px-3.5 py-1.5 text-xs font-black uppercase tracking-wider border ${
                  s.status === "approved"
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                    : s.status === "rejected"
                    ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                    : "bg-amber-500/20 text-amber-400 border-amber-500/40"
                }`}>
                  {s.status === "approved" ? "ACTIVE RESIDENT" : s.status?.toUpperCase() || "PENDING"}
                </span>
              </div>

              {/* PG Assignment Info Box */}
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-bold uppercase text-[10px]">Property Stay</span>
                  <span className="font-black text-blue-500 flex items-center gap-1.5 text-sm">
                    <Building2 size={15} />
                    {s.title || s.pg_title || "PG Accommodations"}
                  </span>
                </div>

                {s.student_email && (
                  <div className="flex items-center justify-between text-xs border-t border-gray-200/60 dark:border-white/10 pt-2.5">
                    <span className="text-gray-400 font-bold uppercase text-[10px]">Email</span>
                    <span className="font-bold text-gray-900 dark:text-gray-200 truncate max-w-[180px]">
                      {s.student_email}
                    </span>
                  </div>
                )}

                {s.student_phone && (
                  <div className="flex items-center justify-between text-xs border-t border-gray-200/60 dark:border-white/10 pt-2.5">
                    <span className="text-gray-400 font-bold uppercase text-[10px]">Contact</span>
                    <span className="font-bold text-gray-900 dark:text-gray-200">
                      {s.student_phone}
                    </span>
                  </div>
                )}
              </div>

              {/* Big Action Buttons */}
              <div className="flex items-center gap-3 pt-1">
                {s.student_phone && (
                  <a
                    href={`tel:${s.student_phone}`}
                    className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-500 py-3.5 text-xs font-black text-white transition shadow-md shadow-blue-500/20"
                  >
                    <Phone size={16} />
                    <span>Call Tenant</span>
                  </a>
                )}

                {s.student_email && (
                  <a
                    href={`mailto:${s.student_email}`}
                    className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 py-3.5 text-xs font-bold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition"
                  >
                    <Mail size={16} />
                    <span>Email</span>
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Students;