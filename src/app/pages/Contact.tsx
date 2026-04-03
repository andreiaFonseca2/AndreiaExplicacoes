import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      toast.error("Por favor introduza um email válido");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/5f00616bdbcb18bc00c9a8e2a400c2c9", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _replyto: formData.email,        // para evitar threads no Gmail
          _captcha: "false",
          _subject: `Nova mensagem de ${formData.name} - ${Date.now()}`, // assunto único
          _next: "https://localhost:5173", // evita redirecionamento
        }),
      });

      if (response.ok) {
        toast.success("Mensagem enviada com sucesso!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("FormSubmit error:", errorData);
        toast.error("Erro ao enviar mensagem. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro de rede. Verifique a sua ligação.");
    }

    setIsSubmitting(false);
  };

  // FAQ data
  const faqs = [
    {
      question: "Quanto tempo dura uma aula?",
      answer:
        "Normalmente as aulas têm 1 hora de duração. No entanto, é possível ajustar para 1h30 ou 2h, especialmente para preparação de testes ou conteúdos mais extensos. A primeira aula experimental é gratuita.",
    },
    {
      question: "Como se processa o pagamento?",
      answer:
        "O pagamento pode ser feito após cada aula (em numerário, MB Way ou transferência bancária) ou mensalmente, conforme a sua preferência.",
    },
    {
      question: "Quais os horários disponíveis?",
      answer:
        "Os horários são flexíveis. Atualmente, as aulas podem ser agendadas de segunda a sexta-feira, das 14h às 20h, e aos sábados das 9h às 14h.",
    },
    {
      question: "Onde ocorrem as aulas?",
      answer:
        "As aulas podem ser presenciais (na zona da Parede), ao domicílio (entre Oeiras e Cascais) ou online (Zoom/Google Meet).",
    },
    {
      question: "Como funciona a primeira aula experimental?",
      answer:
        "A primeira aula é gratuita e dura 1 hora. Serve para conhecer o método de ensino, avaliar o nível do aluno e definir objetivos.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Contactos
        </h1>

        <p className="text-xl text-gray-600 text-center mb-12">
          Entre em contacto para agendar a sua primeira aula
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact info */}
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-3">
                <Mail className="w-5 h-5" />
                <span>and.m.explicacoes@gmail.com</span>
              </div>
              <div className="flex gap-3">
                <MapPin className="w-5 h-5" />
                <span>Oeiras - Cascais</span>
              </div>
            </CardContent>
          </Card>

          {/* Formulário */}
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <Send className="w-5 h-5" />
                Enviar mensagem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Nome</Label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    required
                    type="email"
                    placeholder="exemplo@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Telefone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Mensagem</Label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                <Button disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      A enviar...
                    </>
                  ) : (
                    "Enviar"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Perguntas Frequentes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, idx) => (
              <Card
                key={idx}
                className="shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                  <CardTitle className="text-blue-800 text-lg flex gap-2">
                    ❓ {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}