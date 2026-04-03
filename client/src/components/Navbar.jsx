import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      {/* Container jo mobile me column aur PC me row ban jayega */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-black text-blue-600 tracking-wide">
          Resume<span className="text-gray-800">Builder</span>
        </Link>
        
        {/* Links */}
        <div className="flex gap-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-semibold transition">Home</Link>
          <Link to="/builder" className="text-gray-600 hover:text-blue-600 font-semibold transition">Builder</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;