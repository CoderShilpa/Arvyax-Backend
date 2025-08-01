import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet } from "react-router-dom";
import './App.css'


function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* This is the layout wrapper */}
      <Outlet />
    </div>
  );
}

export default App;