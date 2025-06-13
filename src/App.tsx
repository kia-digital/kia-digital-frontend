import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Pemeriksaan from "./pages/Pemeriksaan";
import Edukasi from "./pages/Edukasi";
import Calendar from "./pages/Calendar";
import AuthRedirect from "./components/AuthRedirect";
import Layout from "./components/Layout";
import ArtikelDetail from "./pages/Edukasi/ArtikelDetail_new";
import DetailPemeriksaanIbu from "./pages/DetailPemeriksaanIbu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/auth"
          element={
            <AuthRedirect>
              <Auth />
            </AuthRedirect>
          }
        />
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
            // </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/pemeriksaan"
          element={
            // <ProtectedRoute>
            <Layout>
              <Pemeriksaan />
            </Layout>
            // </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/pemeriksaan/anc"
          element={
            <Layout>
              <Pemeriksaan />
            </Layout>
          }
        />
        <Route
          path="/pemeriksaan/leopold"
          element={
            <Layout>
              <Pemeriksaan />
            </Layout>
          }
        />
        <Route
          path="/pemeriksaan/detail/:ibuId"
          element={
            <Layout>
              <DetailPemeriksaanIbu />
            </Layout>
          }
        />
        <Route
          path="/calendar"
          element={
            // <ProtectedRoute>
            <Layout>
              <Calendar />
            </Layout>
            // </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/edukasi"
          element={
            // <ProtectedRoute>
            <Layout>
              <Edukasi />
            </Layout>
            // </ProtectedRoute>
          }
        />
        {/* Route untuk detail artikel */}
        <Route
          path="/edukasi/:id"
          element={
            <Layout>
              <ArtikelDetail />
            </Layout>
          }
        />
        {/* 404 Route */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-pink-500 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-6">
                  Halaman tidak ditemukan
                </p>
                <Navigate to="/dashboard" replace />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
