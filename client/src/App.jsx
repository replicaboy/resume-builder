import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Builder from './components/Builder'; // <-- Asli Builder import kiya!

// Responsive Home Page
const Home = () => (
  <div className="min-h-[85vh] flex flex-col items-center justify-center p-6 text-center">
    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 leading-tight">
      Build Your Perfect <br className="hidden md:block" /> 
      <span className="text-blue-600">Resume Instantly</span>
    </h1>
    <p className="text-gray-600 mb-8 text-sm md:text-lg max-w-2xl">
      Create a professional resume in minutes. Works perfectly on your phone, tablet, and desktop!
    </p>
    <a 
      href="/builder" 
      className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition transform inline-block"
    >
      Create Resume Now
    </a>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;