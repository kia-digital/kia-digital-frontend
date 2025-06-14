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
import ProtectedRoute from "./components/ProtectedRoute";
import { isAuthenticated } from "./utils/auth";

function App() {
  return (
    <Router>
      <Routes>
        {/* Root route - redirect based on auth status */}
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
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
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/pemeriksaan"
          element={
            <ProtectedRoute>
              <Layout>
                <Pemeriksaan />
              </Layout>
            </ProtectedRoute>
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
            <ProtectedRoute>
              <Layout>
                <Calendar />
              </Layout>
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/edukasi"
          element={
            <ProtectedRoute>
              <Layout>
                <Edukasi />
              </Layout>
            </ProtectedRoute>
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
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
