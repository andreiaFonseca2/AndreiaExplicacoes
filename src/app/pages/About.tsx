import { Card, CardContent } from "../components/ui/card";
import { GraduationCap, Award, BookOpen, Target } from "lucide-react";

export function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Sobre Mim
        </h1>

        {/* Profile Section */}
        <Card className="mb-12 shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="md:flex">
              <div className="md:w-2/5 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-8">
                <img
                  src="../../../img/AndreiaFoto.jpeg"
                  alt="Explicadora de Matemática"
                  className="rounded-lg shadow-xl w-full h-[300px] object-cover"
                />
              </div>

              <div className="md:w-3/5 p-8">
                <h2 className="text-3xl font-bold mb-4 text-blue-600">
                  Andreia Fonseca
                </h2>

          


                <p className="text-gray-600 leading-relaxed text-justify">
                  Sou uma jovem universitária com experiência a dar explicações
                    de matemática a alunos do ensino básico e secundário.
                </p>

<br></br>

                <p className="text-gray-600 leading-relaxed text-justify">
                  Quando era aluna, também tive dificuldades a matemática — 
                  cheguei a ter nota negativa. Mas com dedicação e a ajuda 
                  certa, consegui dar a volta: passei de um 7 para um 17 num
                   só ano. Por isso, sei exatamente como é sentir que “não se
                    percebe nada”… e também sei que é possível melhorar, com o
                    acompanhamento certo.
                </p>

<br></br>
                <p className="text-gray-600 leading-relaxed text-justify">
                  Mais tarde, fui convidada a dar explicações num centro de 
                  estudos, onde tive ótimos resultados com os alunos que 
                  acompanhei. Muitos pais vieram agradecer-me pelo progresso
                   dos filhos, o que reforçou ainda mais a minha vontade de
                    ensinar.
                </p>



                <p className="text-gray-600 leading-relaxed text-justify">
                  Agora, dou explicações por minha conta, online ou presenciais 
                  na zona da Parede, ou ainda ao domicílio. A minha abordagem é 
                  prática, paciente e adaptada ao ritmo de cada aluno. Mais do que
                   decorar fórmulas, ajudo os alunos a entenderem a matemática com
                    confiança.
                </p>
                <br></br>

                <p className="text-gray-600 leading-relaxed text-justify">
                  Se procura alguém com experiência, empatia e gosto genuíno por ensinar, estou aqui para ajudar!
                </p>


              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formação */}
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-blue-600" />
          Formação Académica
        </h2>

        <div className="space-y-4 mb-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg">
                Secundário em economia 
              </h3>

              
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg">
                Licenciatura em Informática e gestão de empresas
              </h3>

              <p className="text-gray-600">
                ISCTE - universidade de lisboa • 2022-2026
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Experiência */}
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-600" />
          Experiência
        </h2>

        <div className="space-y-4 mb-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg">
                Explicador Particular
              </h3>

              <p className="text-gray-600">
                2022 - Presente
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Abordagem */}
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Target className="w-8 h-8 text-blue-600" />
          A Minha Abordagem
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <Award className="w-8 h-8 mb-3 text-blue-600" />

              <h3 className="font-semibold">
                Personalização
              </h3>

              <p>
                Plano de estudo adaptado ao aluno.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Award className="w-8 h-8 mb-3 text-green-600" />

              <h3 className="font-semibold">
                Prática
              </h3>

              <p>
                Exercícios orientados passo a passo.
              </p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}