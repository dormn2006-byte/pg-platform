import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import PgDetails from "../pages/PgDetails";
import ExplorePGs from "../pages/ExplorePGs";

import Auth from "../pages/auth/Auth";


import PGAdminLayout from "../layouts/PGAdminLayout";
import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "../admin/pgAdmin/Dashboard";
import AddPG from "../admin/pgAdmin/AddPG";
import MyPGs from "../admin/pgAdmin/MyPGs";
import Bookings from "../admin/pgAdmin/Bookings";
import Students from "../admin/pgAdmin/Students";
import BookingDetails from "../admin/pgAdmin/BookingDetails";
import About from "../pages/About";
import FAQ from "../pages/faq";
import EditPG from "../admin/pgAdmin/components/EditPG";
import SuperAdminDashboard from "../admin/superAdmin/SuperAdminDashboard";
import ManageOwners from "../admin/superAdmin/ManageOwners";
import ManagePGs from "../admin/superAdmin/ManagePGs";
import ManageStudents from "../admin/superAdmin/ManageStudents";
import OwnerDetails from "../admin/superAdmin/OwnerDetails";
import PGDetails from "../admin/superAdmin/PGDetails";
import StudentDetails from "../admin/superAdmin/StudentDetails";
import MyBookings from "../pages/MyBookings";
import OwnerBookings from "../pages/OwnerBookings";
import StudentDashboard from "../pages/StudentDashboard";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pgs" element={<ExplorePGs />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/pg/:id" element={<PgDetails />} />

        {/* Auth Routes */}
        <Route path="/auth" element={<Auth />} />

        <Route
          path="/superadmin/dashboard"
          element={
            <ProtectedRoute role="superadmin">
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />
       <Route
  path="/superadmin/manage-owners"
  element={
    <ProtectedRoute role="superadmin">
      <ManageOwners />
    </ProtectedRoute>
  }
/>

<Route
  path="/superadmin/manage-pgs"
  element={
    <ProtectedRoute role="superadmin">
      <ManagePGs />
    </ProtectedRoute>
  }
/>
<Route
  path="/owner/bookings"
  element={
    <ProtectedRoute role="owner">
      <OwnerBookings />
    </ProtectedRoute>
  }
/>
<Route
  path="/student/dashboard"
  element={
    <ProtectedRoute role="student">
      <StudentDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/superadmin/manage-students"
  element={
    <ProtectedRoute role="superadmin">
      <ManageStudents />
    </ProtectedRoute>
  }
/>

<Route
  path="/superadmin/owner-details"
  element={
    <ProtectedRoute role="superadmin">
      <OwnerDetails />
    </ProtectedRoute>
  }
/>

<Route
  path="/superadmin/pg-details"
  element={
    <ProtectedRoute role="superadmin">
      <PGDetails />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-bookings"
  element={
    <ProtectedRoute role="student">
      <MyBookings />
    </ProtectedRoute>
  }
/>

<Route
  path="/superadmin/student-details"
  element={
    <ProtectedRoute role="superadmin">
      <StudentDetails />
    </ProtectedRoute>
  }
/>
        <Route
          path="/admin/bookings/:bookingId"
          element={<BookingDetails />}
        />

        
        {/* Protected Owner Routes */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute role="owner">
              <PGAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-pg" element={<AddPG />} />
          <Route path="my-pgs" element={<MyPGs />} />
          <Route path="edit-pg/:id" element={<EditPG />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="students" element={<Students />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;