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
import KategoriTrimester1 from "./pages/Edukasi/KategoriTrimester1";
import KategoriTrimester2 from "./pages/Edukasi/KategoriTrimester2";
import KategoriTrimester3 from "./pages/Edukasi/KategoriTrimester3";
import KategoriImunisasi from "./pages/Edukasi/KategoriImunisasi";
import KategoriAsupanGizi from "./pages/Edukasi/KategoriAsupanGizi";
import KategoriKesehatanMental from "./pages/Edukasi/KategoriKesehatanMental";

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
        />
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
        <Route
          path="/edukasi/trimester-1"
          element={
            <Layout>
              <KategoriTrimester1 />
            </Layout>
          }
        />
        <Route
          path="/edukasi/trimester-2"
          element={
            <Layout>
              <KategoriTrimester2 />
            </Layout>
          }
        />
        <Route
          path="/edukasi/trimester-3"
          element={
            <Layout>
              <KategoriTrimester3 />
            </Layout>
          }
        />
        <Route
          path="/edukasi/imunisasi"
          element={
            <Layout>
              <KategoriImunisasi />
            </Layout>
          }
        />
        <Route
          path="/edukasi/asupan-gizi"
          element={
            <Layout>
              <KategoriAsupanGizi />
            </Layout>
          }
        />
        <Route
          path="/edukasi/kesehatan-mental"
          element={
            <Layout>
              <KategoriKesehatanMental />
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
