import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import PostDetail from './pages/PostDetail';
import PageDetail from './pages/PageDetail';
import Sponsor from './pages/Sponsor';
import Speakers from './pages/Speakers';
import Login from './pages/Login';
import Join from './pages/Join';
import ForgotPassword from './pages/ForgotPassword';
import SetPassword from './pages/SetPassword';
import Account from './pages/Account';
import PaymentResult from './pages/PaymentResult';
import AdminRedirect from './pages/AdminRedirect';
import { AttendeeAuthProvider } from './context/AttendeeAuthContext';

export default function App() {
  return (
    <BrowserRouter>
      <AttendeeAuthProvider>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/sponsor" element={<Sponsor />} />
            <Route path="/posts" element={<BlogList />} />
            <Route path="/post/:slug" element={<PostDetail />} />
            <Route path="/page/:slug" element={<PageDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/set-password/:token" element={<SetPassword mode="set" />} />
            <Route path="/reset-password/:token" element={<SetPassword mode="reset" />} />
            <Route path="/account" element={<Account />} />
            <Route path="/payment/success" element={<PaymentResult mode="success" />} />
            <Route path="/payment/cancelled" element={<PaymentResult mode="cancelled" />} />
          </Route>
          <Route path="/admin/*" element={<AdminRedirect />} />
        </Routes>
      </AttendeeAuthProvider>
    </BrowserRouter>
  );
}
