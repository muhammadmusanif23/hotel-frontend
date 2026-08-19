import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import ClientLayout from '../layouts/ClientLayout';
import AdminLayout from '../layouts/AdminLayout';
import Home from '../pages/client/Home';
import Hotels from '../pages/client/Hotels';
import HotelDetail from '../pages/client/HotelDetail';
import Checkout from '../pages/client/Checkout';
import PayPage from '../pages/client/PayPage';
import Confirmation from '../pages/client/Confirmation';
import MyBookings from '../pages/client/MyBookings';
import Login from '../pages/client/Login';
import Register from '../pages/client/Register';
import Dashboard from '../pages/admin/Dashboard';
import AdminHotels from '../pages/admin/Hotels';
import HotelForm from '../pages/admin/HotelForm';
import AdminRooms from '../pages/admin/Rooms';
import RoomForm from '../pages/admin/RoomForm';
import AdminBookings from '../pages/admin/Bookings';
import AdminPayments from '../pages/admin/Payments';
import AdminUsers from '../pages/admin/Users';
import AdminUserDetail from '../pages/admin/UserDetail';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/login" element={<Login admin />} />

      <Route
        path="/"
        element={
          <ClientLayout>
            <Home />
          </ClientLayout>
        }
      />
      <Route
        path="/hotels"
        element={
          <ClientLayout>
            <Hotels />
          </ClientLayout>
        }
      />
      <Route
        path="/hotels/:id"
        element={
          <ClientLayout>
            <HotelDetail />
          </ClientLayout>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <ClientLayout>
              <Checkout />
            </ClientLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/pay/:id"
        element={
          <ProtectedRoute>
            <ClientLayout>
              <PayPage />
            </ClientLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/confirmation/:id"
        element={
          <ProtectedRoute>
            <ClientLayout>
              <Confirmation />
            </ClientLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <ClientLayout>
              <MyBookings />
            </ClientLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/hotels"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <AdminHotels />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/hotels/new"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <HotelForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/hotels/:id/edit"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <HotelForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/hotels/:hotelId/rooms"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <AdminRooms />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/hotels/:hotelId/rooms/new"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <RoomForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/hotels/:hotelId/rooms/:id/edit"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <RoomForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <AdminBookings />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/payments"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <AdminPayments />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users/:id"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <AdminUserDetail />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
