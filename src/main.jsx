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
import FounderConsole from './pages/FounderConsole'
import AdmissionsReview from './pages/AdmissionsReview'
import LearningReview from './pages/LearningReview'
import ContactFallback from './pages/ContactFallback'
import './styles.css'
import './learner.css'
import './admissions.css'
import './founder-console.css'
import './student-app.css'
import './learning-review.css'
import './public-site.css'
import '../brand/code/cognita-brand.css'
import './brand-runtime.css'
import './institutional-refinement.css'
import './institutional-routing.css'

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
          <Route path="/operations" element={<FounderConsole />} />
          <Route path="/operations/admissions" element={<AdmissionsReview />} />
          <Route path="/operations/learning" element={<LearningReview />} />
          <Route path="*" element={<ContactFallback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
