"use client";


import { useModal } from "@/hooks/use-auth-modal";
import { useAuth } from "../contexts/authcontext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { open } = useModal();

  return (
    <nav className="w-full px-6 py-4 bg-white shadow flex items-center justify-between">
      <div className="text-2xl font-bold text-gray-800 cursor-pointer">
        <a href="/">DevCv</a>
      </div>

      <div className="space-x-4">
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="text-sm font-medium text-white bg-red-600 rounded px-4 py-2 hover:bg-red-700"
          >
            Sign Out
          </button>
        ) : (
          <>
            <button
              onClick={() => open("login")}
              className="text-sm font-medium text-gray-700 hover:text-black"
            >
              Login
            </button>
            <button
              onClick={() => open("signup")}
              className="text-sm font-medium text-white bg-black rounded px-4 py-2 hover:bg-gray-800"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
