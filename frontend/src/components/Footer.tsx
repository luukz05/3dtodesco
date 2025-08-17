// Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 text-center mt-auto">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} 3D Todesco. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}
