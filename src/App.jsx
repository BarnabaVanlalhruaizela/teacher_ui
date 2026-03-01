import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import TeacherRoutes from './routes/TeacherRoutes';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <TeacherRoutes />
    </BrowserRouter>
  );
}

export default App;