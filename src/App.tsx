import './App.css'
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './components/ThemeProvider';
import { useTheme } from './hooks/useTheme';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./routes/Auth/Login";
import Dashboard from "./routes/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Landing from './components/LandingPage';
import Signup from './routes/Auth/SignUp';
import TicketsPage from './routes/tickets/TicketsPage';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#111827] transition-colors duration-300">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <TicketsPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Landing />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDark ? "dark" : "light"}
        toastClassName="custom-toast"
        progressClassName="custom-progress-bar"
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App
