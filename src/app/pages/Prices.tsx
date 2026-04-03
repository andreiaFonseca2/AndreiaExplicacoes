import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { BookOpen, Home as HomeIcon, Monitor, Calculator } from "lucide-react";

const PRICES = {
  basico: {
    presencial: 17,
    domicilio: 19,
    online: 15,
  },
  secundario: {
    presencial: 21,
    domicilio: 23,
    online: 19,
  },
};

export function Prices() {
  const [level, setLevel] = useState<'basico' | 'secundario'>('basico');
  const [format, setFormat] = useState<'presencial' | 'domicilio' | 'online'>('presencial');
  const [hoursInput, setHoursInput] = useState<string>('1'); // horas por semana (string para permitir vazio)

  // Converte para número (0 se inválido ou vazio)
  const hoursNumber = hoursInput === '' ? 0 : Number(hoursInput);
  const validHoursPerWeek = isNaN(hoursNumber) ? 0 : hoursNumber;
  const weeksPerMonth = 4; // assume 4 semanas por mês
  const validHoursPerMonth = validHoursPerWeek * weeksPerMonth;

  const pricePerHour = PRICES[level][format];
  const totalPrice = pricePerHour * validHoursPerMonth;

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permite apenas dígitos ou vazio
    if (value === '' || /^\d+$/.test(value)) {
      setHoursInput(value);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Preços</h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Preços transparentes e justos para todas as modalidades
        </p>

        {/* Price Simulator */}
        <Card className="mb-12 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Calculator className="w-6 h-6" />
              Simulador de Preços
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <Label htmlFor="level" className="text-base font-semibold mb-2 block">
                  Nível de Ensino
                </Label>
                <Select value={level} onValueChange={(value: 'basico' | 'secundario') => setLevel(value)}>
                  <SelectTrigger id="level">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basico">Ensino Básico</SelectItem>
                    <SelectItem value="secundario">Ensino Secundário</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="format" className="text-base font-semibold mb-2 block">
                  Formato das Aulas
                </Label>
                <Select value={format} onValueChange={(value: 'presencial' | 'domicilio' | 'online') => setFormat(value)}>
                  <SelectTrigger id="format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="presencial">Presencial</SelectItem>
                    <SelectItem value="domicilio">Ao Domicílio</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="hours" className="text-base font-semibold mb-2 block">
                  Horas por Semana
                </Label>
                <Input
                  id="hours"
                  type="text"
                  value={hoursInput}
                  onChange={handleHoursChange}
                  placeholder="0"
                  className="text-lg"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Preço por Hora</p>
                  <p className="text-3xl font-bold text-blue-600">{pricePerHour}€</p>
                </div>
                <div className="text-4xl font-bold text-gray-300">×</div>
                <div>
                  <p className="text-gray-600 mb-1">Horas por Semana</p>
                  <p className="text-3xl font-bold text-blue-600">{validHoursPerWeek}h</p>
                </div>
                <div className="text-4xl font-bold text-gray-300">× 4 semanas</div>
                <div className="bg-blue-600 text-white rounded-lg p-4 min-w-[200px] text-center">
                  <p className="text-sm mb-1 opacity-90">Total Mensal</p>
                  <p className="text-4xl font-bold">{totalPrice}€</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Tables */}
        <h2 className="text-3xl font-bold text-center mb-8">Tabela de Preços</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Ensino Básico */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardTitle className="text-2xl">Ensino Básico</CardTitle>
              <p className="text-blue-100">2º e 3º Ciclos</p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    <span className="font-semibold">Presencial</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">17€/h</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <HomeIcon className="w-6 h-6 text-green-600" />
                    <span className="font-semibold">Ao Domicílio</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">19€/h</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-6 h-6 text-purple-600" />
                    <span className="font-semibold">Online</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">15€/h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ensino Secundário */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
              <CardTitle className="text-2xl">Ensino Secundário</CardTitle>
              <p className="text-indigo-100">10º, 11º e 12º Anos</p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    <span className="font-semibold">Presencial</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">21€/h</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <HomeIcon className="w-6 h-6 text-green-600" />
                    <span className="font-semibold">Ao Domicílio</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">23€/h</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-6 h-6 text-purple-600" />
                    <span className="font-semibold">Online</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">19€/h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className="bg-gray-50">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Informações Adicionais</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>Primeira aula experimental gratuita </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>Descontos disponíveis para pacotes (2h/semana) - entrar em contacto</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>Material didático incluído (fichas, exercícios e resumos)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>Pagamento após cada aula ou mensalmente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>Cancelamento com 24h de antecedência sem custos</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}