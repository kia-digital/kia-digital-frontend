import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Pemeriksaan from "./pages/Pemeriksaan";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect";
import Layout from "./components/Layout";
import PageHeader from "./components/PageHeader";

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
            <ProtectedRoute>
              <Layout>
                <Pemeriksaan />
              </Layout>
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Layout>
                <PageHeader
                  title="Kalender"
                  subtitle="Halaman Kalender sedang dalam pengembangan."
                  showLembarPemantauan={false}
                  showUserAvatar={true}
                />
              </Layout>
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/edukasi"
          element={
            <ProtectedRoute>
              <Layout>
                <PageHeader
                  title="Edukasi"
                  subtitle="Halaman Edukasi sedang dalam pengembangan."
                  showLembarPemantauan={false}
                  showUserAvatar={true}
                />
              </Layout>
            </ProtectedRoute>
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
