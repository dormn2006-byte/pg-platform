import { useEffect, useState } from "react";
import API from "../../services/api";

const OwnerPayments = () => {
  const [payments, setPayments] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await API.get("/payments/owner-payments");
        if (res.data.success) {
          setPayments(res.data.payments || []);
          setTotalRevenue(res.data.totalRevenue || 0);
        }
      } catch (err) {
        console.error("Fetch Owner Payments Error:", err);
        setError("Failed to load revenue details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm font-bold text-gray-500">
        Loading payment ledger...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 p-6 text-center text-sm font-bold text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8 font-sans max-w-[1400px] mx-auto">
      
      {/* Header & Total Earnings */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="rounded-lg bg-black/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-600">
            PG Owner Revenue
          </span>
          <h1 className="text-3xl font-black text-gray-900 mt-2">Received Payments</h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time track of all students who have paid rent or booking fees for your PGs.
          </p>
        </div>

        <div className="rounded-[24px] bg-black p-6 text-white shadow-xl min-w-[260px]">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Total Revenue Collected</p>
          <p className="text-3xl font-black text-[#93B733] mt-2">
            ₹{Number(totalRevenue).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Student Transactions</h2>
          <span className="text-xs font-semibold text-gray-500">
            Total Completed: {payments.length}
          </span>
        </div>

        {payments.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <div className="mb-4 text-6xl">💳</div>
            <h3 className="text-xl font-black text-gray-900">No Payments Received Yet</h3>
            <p className="mt-2 text-sm text-gray-500 max-w-md">
              You do not have any active paying guests or completed transactions yet. When a student books and pays for your PG via Razorpay, their payment details will appear here automatically.
            </p>
          </div>
        ) : (
          /* Payments Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-6">Student Info</th>
                  <th className="py-4 px-6">Booked PG</th>
                  <th className="py-4 px-6">Amount Paid</th>
                  <th className="py-4 px-6">Payment Reference</th>
                  <th className="py-4 px-6">Date & Time</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
                {payments.map((item) => (
                  <tr key={item.payment_id} className="transition hover:bg-gray-50/80">
                    <td className="py-4 px-6">
                      <p className="font-bold text-gray-900 text-sm">{item.student_name}</p>
                      <p className="text-gray-400 text-[11px]">{item.student_email}</p>
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-800">{item.pg_title}</td>
                    <td className="py-4 px-6 font-black text-[#93B733] text-sm">
                      ₹{Number(item.amount).toLocaleString()}
                    </td>
                    <td className="py-4 px-6 font-mono text-[11px] text-gray-500">
                      {item.razorpay_payment_id || "N/A"}
                    </td>
                    <td className="py-4 px-6 text-gray-500">
                      {new Date(item.payment_date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold text-green-700 border border-green-200">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span> Paid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default OwnerPayments;