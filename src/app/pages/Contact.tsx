import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Mail, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    emailConfirm: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    emailConfirm: "",
    phone: "",
  });

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string) => {
    if (phone === "") return true;
    return /^(\+351\s?)?(9[1236]\d{7}|2\d{8})$/.test(phone.replace(/\s/g, ""));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    if (value && !isValidEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "Email inválido. Ex: exemplo@gmail.com" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleEmailConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, emailConfirm: value });
    if (value && value !== formData.email) {
      setErrors((prev) => ({ ...prev, emailConfirm: "Os emails não coincidem." }));
    } else {
      setErrors((prev) => ({ ...prev, emailConfirm: "" }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, phone: value });
    if (value && !isValidPhone(value)) {
      setErrors((prev) => ({ ...prev, phone: "Número inválido. Ex: 912 345 678" }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Email inválido. Ex: exemplo@gmail.com" }));
      return;
    }
    if (formData.email !== formData.emailConfirm) {
      setErrors((prev) => ({ ...prev, emailConfirm: "Os emails não coincidem." }));
      return;
    }
    if (!isValidPhone(formData.phone)) {
      setErrors((prev) => ({ ...prev, phone: "Número inválido. Ex: 912 345 678" }));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/suporteexplicacoes@gmail.com", {
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
          _replyto: formData.email,
          _captcha: "false",
          _subject: `Nova mensagem de ${formData.name}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", emailConfirm: "", phone: "", message: "" });
        setErrors({ email: "", emailConfirm: "", phone: "" });
      } else {
        toast.error("Erro ao enviar mensagem. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro de rede. Verifique a sua ligação.");
    }

    setIsSubmitting(false);
  };

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
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                  <h3 className="text-xl font-semibold text-green-700">
                    Mensagem enviada com sucesso!
                  </h3>
                  <p className="text-gray-600">
                    Obrigada pelo contacto, responderemos em breve.
                  </p>
                  <button
                    className="mt-4 text-blue-600 underline text-sm"
                    onClick={() => setSubmitted(false)}
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
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
                      onChange={handleEmailChange}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label>Confirmar Email</Label>
                    <Input
                      required
                      type="email"
                      placeholder="exemplo@gmail.com"
                      value={formData.emailConfirm}
                      onChange={handleEmailConfirmChange}
                      className={errors.emailConfirm ? "border-red-500" : ""}
                    />
                    {errors.emailConfirm && (
                      <p className="text-red-500 text-sm mt-1">{errors.emailConfirm}</p>
                    )}
                  </div>

                  <div>
                    <Label>
                      Telefone{" "}
                      <span className="text-gray-400 text-xs">(opcional)</span>
                    </Label>
                    <Input
                      placeholder="912 345 678"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
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

                  <Button
                    disabled={isSubmitting || !!errors.email || !!errors.emailConfirm || !!errors.phone}
                    className="w-full"
                  >
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
              )}
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