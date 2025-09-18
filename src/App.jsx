import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout'
import Dashboard from './Pages/Dashboard/Dashboard'
import Profile from './Pages/Profile/Profile'
import Supports from './Pages/Support/Supports'
import PaymentSettings from './Pages/PaymentSettings/PaymentSettings'
import EditProfile from './Pages/Profile/EditProfile'
import Message from './Pages/Message/Message'
import Spendings from './Pages/Spendings/Spendings'
import Orders from "./Pages/Orders/Orders"
import OrderDetails from './Pages/Orders/OrderDetails'
import { Check } from 'lucide-react'
import CheckOut from './Pages/Message/CheckOut'
import ScrollToTop from './GlobalComponents/ScrollToTop'

const App = () => {
  return (
     <Router>
      <ScrollToTop/>
      <Routes>
        {/* Routes with layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
           <Route path="/profile/edit" element={<EditProfile />} />
          {/* <Route path="/portfolio" element={<Portfolio/>} />
          <Route path="/portfolio/upload-your-work" element={<UploadYourWork/>} />
          <Route path="/portfolio/upload-your-work/sell-your-work" element={<SellYourWork/>} /> */}
          <Route path="/messages" element={<Message />} />
          <Route path="/messages/checkout" element={<CheckOut />} />
          <Route path="/support" element={<Supports />} />
          <Route path="/payment-settings" element={<PaymentSettings />} />
          <Route path="/spendings" element={<Spendings/>} />
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/orders/order-details' element={<OrderDetails/>}/>
        </Route>
        {/* Routes without layout */}
        
      </Routes>
    </Router>
  )
}

export default App
