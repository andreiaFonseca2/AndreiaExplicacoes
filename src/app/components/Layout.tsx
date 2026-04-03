import { Outlet, Link, useLocation } from "react-router";
import { Calculator } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              <Calculator className="w-8 h-8" />
              <span>Andreia Explicações</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                to="/" 
                className={`font-medium transition-colors ${
                  isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Início
              </Link>
              <Link 
                to="/precos" 
                className={`font-medium transition-colors ${
                  isActive('/precos') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Preços
              </Link>
              <Link 
                to="/sobre-mim" 
                className={`font-medium transition-colors ${
                  isActive('/sobre-mim') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Sobre Mim
              </Link>
              <Link 
                to="/contactos" 
                className={`font-medium transition-colors ${
                  isActive('/contactos') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Contactos
              </Link>
            </nav>
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex flex-wrap gap-4 mt-4 pt-4 border-t">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Início
            </Link>
            <Link 
              to="/precos" 
              className={`text-sm font-medium transition-colors ${
                isActive('/precos') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Preços
            </Link>
            <Link 
              to="/sobre-mim" 
              className={`text-sm font-medium transition-colors ${
                isActive('/sobre-mim') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Sobre Mim
            </Link>
            <Link 
              to="/contactos" 
              className={`text-sm font-medium transition-colors ${
                isActive('/contactos') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Contactos
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="font-semibold text-blue-600 mb-2">Andreia Explicações</p>
            <p className="text-sm">© 2026 - Explicações de Matemática</p>
            <p className="text-sm mt-2">Presencial • Online • Ao Domicílio</p>
          </div>
        </div>
      </footer>
    </div>
  );
}