import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";

const LazyDashboard = lazy(() => import("../../pages/Dashboard"));
const LazyEditor = lazy(() => import("../../pages/Editor"));
const LazyLayout = lazy(() => import("../../pages/Layout"));

const ProtectedRoutes = () => {


  return (
    <div className="flex flex-col min-h-[100vh]">
      <Navbar />
      <Routes>
        <Route path="dashboard" element={<LazyDashboard />}/>
        <Route path="editor/:cvId" element={<LazyEditor />} />
        <Route path="layout" element={<LazyLayout />} />
      </Routes>
    </div>
  );
};

export default ProtectedRoutes;
