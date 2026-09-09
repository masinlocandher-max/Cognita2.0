import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Home from './pages/Home'
import Apply from './pages/Apply'
import EntranceExam from './pages/EntranceExam'
import Exam from './pages/Exam'
import Programs from './pages/Programs'
import Payment from './pages/Payment'
import AccountSetup from './pages/AccountSetup'
import StudentApp from './pages/StudentApp'
import AdmissionsReview from './pages/AdmissionsReview'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Policies from './pages/Policies'
import NotFound from './pages/NotFound'
import './fonts.css'
import './styles.css'
import './learner.css'
import './admissions.css'
import '../brand/code/cognita-brand.css'
import './brand-runtime.css'
import './institutional.css'
import './editorial.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/entrance-exam" element={<EntranceExam />} />
          <Route path="/entrance-exam/start" element={<Exam />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/account-setup" element={<AccountSetup />} />
          <Route path="/app" element={<StudentApp />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/operations/admissions" element={<AdmissionsReview />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
