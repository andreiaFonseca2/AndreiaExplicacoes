import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Home as HomeIcon } from "lucide-react";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Página Não Encontrada</h2>
        <p className="text-gray-600 mb-8">
          A página que procura não existe ou foi movida.
        </p>
        <Button onClick={() => navigate('/')} size="lg">
          <HomeIcon className="w-5 h-5 mr-2" />
          Voltar à Página Inicial
        </Button>
      </div>
    </div>
  );
}