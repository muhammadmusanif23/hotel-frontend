import api from './api';

export const registerUser = (payload) => api.post('/auth/register', payload).then((r) => r.data);
export const loginUser = (payload) => api.post('/auth/login', payload).then((r) => r.data);
export const fetchMe = () => api.get('/auth/me').then((r) => r.data);

export const fetchHotels = (params) => api.get('/hotels', { params }).then((r) => r.data);
export const fetchHotel = (id, params) => api.get(`/hotels/${id}`, { params }).then((r) => r.data);
export const fetchRoomAvailability = (id, params) =>
  api.get(`/rooms/${id}/availability`, { params }).then((r) => r.data);

export const createBooking = (payload) => api.post('/bookings', payload).then((r) => r.data);
export const fetchMyBookings = () => api.get('/bookings/me').then((r) => r.data);
export const fetchBooking = (id) => api.get(`/bookings/${id}`).then((r) => r.data);
export const cancelBooking = (id) => api.patch(`/bookings/${id}/cancel`).then((r) => r.data);
export const updateBooking = (id, payload) => api.patch(`/bookings/${id}`, payload).then((r) => r.data);

export const createPaymentIntent = (bookingId) =>
  api.post('/payments/create-intent', { bookingId }).then((r) => r.data);
export const mockConfirmPayment = (bookingId) =>
  api.post('/payments/mock-confirm', { bookingId }).then((r) => r.data);

export const adminDashboard = () => api.get('/admin/dashboard').then((r) => r.data);
export const adminHotels = () => api.get('/admin/hotels').then((r) => r.data);
export const adminCreateHotel = (payload) => api.post('/admin/hotels', payload).then((r) => r.data);
export const adminUpdateHotel = (id, payload) => api.put(`/admin/hotels/${id}`, payload).then((r) => r.data);
export const adminDeleteHotel = (id) => api.delete(`/admin/hotels/${id}`).then((r) => r.data);
export const adminRooms = (hotelId) => api.get(`/admin/hotels/${hotelId}/rooms`).then((r) => r.data);
export const adminCreateRoom = (hotelId, payload) =>
  api.post(`/admin/hotels/${hotelId}/rooms`, payload).then((r) => r.data);
export const adminUpdateRoom = (hotelId, id, payload) =>
  api.put(`/admin/hotels/${hotelId}/rooms/${id}`, payload).then((r) => r.data);
export const adminDeleteRoom = (hotelId, id) =>
  api.delete(`/admin/hotels/${hotelId}/rooms/${id}`).then((r) => r.data);
export const adminBookings = (params) => api.get('/admin/bookings', { params }).then((r) => r.data);
export const adminUpdateBookingStatus = (id, status) =>
  api.patch(`/admin/bookings/${id}/status`, { status }).then((r) => r.data);
export const adminPayments = (params) => api.get('/admin/payments', { params }).then((r) => r.data);
export const adminRefundPayment = (id) => api.patch(`/admin/payments/${id}/refund`).then((r) => r.data);
export const adminUsers = () => api.get('/admin/users').then((r) => r.data);
export const adminUser = (id) => api.get(`/admin/users/${id}`).then((r) => r.data);
export const adminUpload = (files) => {
  const form = new FormData();
  [...files].forEach((file) => form.append('images', file));
  return api.post('/admin/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data);
};
