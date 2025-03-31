// src/routes/index.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SelectionPage from '../pages/SelectionPage';
import TimeTablePage from '../pages/TimeTablePage';
import EasyCoursesPage from '../pages/EasyCoursesPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/selection" element={<SelectionPage />} />
        <Route path="/timetable" element={<TimeTablePage />} />
        <Route path="/easy-courses" element={<EasyCoursesPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;