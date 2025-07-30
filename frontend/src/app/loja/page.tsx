// app/loja/page.tsx
"use client";

export default function Loja() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <footer className="bg-gray-900 text-white py-6 text-center mt-12">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Impressão 3D Criativa. Todos os
          direitos reservados.
        </p>
      </footer>
    </main>
  );
}
