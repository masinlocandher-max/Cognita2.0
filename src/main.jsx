import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Home from './pages/Home'
import EntranceExam from './pages/EntranceExam'
import Exam from './pages/Exam'
import Learner from './pages/Learner'
import './styles.css'
import './learner.css'
import '../brand/code/cognita-brand.css'
import './brand-runtime.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/learner" element={<Learner />} />
          <Route path="/entrance-exam" element={<EntranceExam />} />
          <Route path="/entrance-exam/start" element={<Exam />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
