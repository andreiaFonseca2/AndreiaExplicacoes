import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export function FAQ() {
  const faqs = [
    {
      question: "Quanto tempo dura uma aula?",
      answer: "Normalmente as aulas têm 1 hora de duração. No entanto, é possível ajustar para 1h30 ou 2h, especialmente para preparação de exames ou conteúdos mais extensos. A primeira aula experimental é gratuita e tem 30 minutos."
    },
    {
      question: "Como se processa o pagamento?",
      answer: "O pagamento pode ser feito após cada aula (em numerário, MB Way ou transferência bancária) ou mensalmente, conforme a sua preferência. Para pacotes mensais, é solicitado um pagamento adiantado referente ao mês."
    },
    {
      question: "Quais os horários disponíveis?",
      answer: "Os horários são flexíveis. Atualmente, as aulas podem ser agendadas de segunda a sexta-feira, das 14h às 20h, e aos sábados das 9h às 14h. Horários fora deste período podem ser negociados conforme a disponibilidade."
    },
    {
      question: "Onde ocorrem as aulas?",
      answer: "As aulas podem ser presenciais (no meu espaço na Grande Lisboa), ao domicílio (na área da Grande Lisboa) ou online (via Zoom/Google Meet). Pode escolher o formato que preferir."
    },
    {
      question: "Prepara para exames nacionais?",
      answer: "Sim! Tenho experiência na preparação para exames nacionais de matemática do 9º ano, 12º ano e provas de ingresso. As aulas focam-se nos conteúdos específicos, resolução de provas anteriores e estratégias de estudo."
    },
    {
      question: "Como funciona a primeira aula experimental?",
      answer: "A primeira aula é gratuita e dura 30 minutos. Serve para conhecer o método de ensino, avaliar o nível do aluno e definir os objetivos. Não há qualquer compromisso após esta aula."
    },
    {
      question: "Qual a política de cancelamento?",
      answer: "Os cancelamentos devem ser comunicados com pelo menos 24 horas de antecedência. Caso contrário, a aula será cobrada na totalidade. Em situações de doença ou imprevisto, podemos remarcar sem custos."
    },
    {
      question: "Fornece material didático?",
      answer: "Sim, disponibilizo fichas de exercícios, resumos teóricos e provas modelo adaptadas ao currículo do aluno. Todo o material é incluído no preço das aulas."
    },
    {
      question: "As aulas são individuais ou em grupo?",
      answer: "Atualmente, trabalho apenas com aulas individuais para garantir um acompanhamento personalizado. Em casos específicos, podem ser organizadas sessões em pequenos grupos (máximo 2 alunos) com preços ajustados."
    },
    {
      question: "Há descontos para pacotes mensais?",
      answer: "Sim. Para quem opta por 8 ou mais horas mensais, ofereço um desconto de 10% no total. Contacte-me para simular o valor exato."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Perguntas Frequentes
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Tire todas as suas dúvidas sobre as aulas de matemática
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <CardTitle className="text-xl text-blue-800 flex items-start gap-2">
                  <span className="text-blue-600 text-2xl">❓</span>
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold mb-2">Ainda tem dúvidas?</h3>
              <p className="mb-4">
                Entre em contacto directamente e terei todo o prazer em esclarecer as suas questões.
              </p>
              <a
                href="/contacto"
                className="inline-block bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contactar
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}