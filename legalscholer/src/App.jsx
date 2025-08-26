// src/App.jsx
import React from "react";
import AppRoutes from "@routes/AppRoutes";
import Navbar from "@components/layout/Navbar";


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
     
    </div>
  );
}

export default App;
