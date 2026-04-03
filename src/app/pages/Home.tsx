import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { BookOpen, Home as HomeIcon, Monitor, Calculator } from "lucide-react";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Explicações de Matemática
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Aulas personalizadas para ensino básico e secundário. 
          Escolha o formato que melhor se adapta a si: presencial, online ou ao domicílio.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" onClick={() => navigate('/precos')} className="text-lg px-8">
            Ver Preços
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/contactos')} className="text-lg px-8">
            Contactar
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Presencial</h3>
              <p className="text-gray-600">
                Aulas no meu local, ambiente focado e material didático disponível.
              </p>
              <p className="text-2xl font-bold text-blue-600 mt-4">
                Desde 17€/hora
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <HomeIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ao Domicílio</h3>
              <p className="text-gray-600">
                Deslocação à sua casa para maior comodidade e conforto.
              </p>
              <p className="text-2xl font-bold text-green-600 mt-4">
                Desde 19€/hora
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Monitor className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Online</h3>
              <p className="text-gray-600">
                Aulas por videochamada com partilha de ecrã e quadro digital.
              </p>
              <p className="text-2xl font-bold text-purple-600 mt-4">
                Desde 15€/hora
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Why Choose Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Porquê Escolher as Minhas Explicações?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <Calculator className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Metodologia Personalizada</h3>
              <p className="text-gray-600">
                Adapto as aulas às necessidades específicas de cada aluno, identificando dificuldades e trabalhando-as de forma eficaz.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Calculator className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Material de Apoio</h3>
              <p className="text-gray-600">
                Acesso a fichas de trabalho, resumos e exercícios adicionais.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Calculator className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Horários Flexíveis</h3>
              <p className="text-gray-600">
                Disponibilidade para agendar aulas em horários que se adequem à sua rotina.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Calculator className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Acompanhamento Contínuo</h3>
              <p className="text-gray-600">
                Monitorização do progresso e feedback regular sobre a evolução do aluno.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Pronto para melhorar as suas notas?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Entre em contacto para agendar a sua primeira aula experimental.
        </p>
        <Button 
          size="lg" 
          variant="secondary"
          onClick={() => navigate('/contactos')}
          className="text-lg px-8"
        >
          Contactar Agora
        </Button>
      </div>
    </div>
  );
}