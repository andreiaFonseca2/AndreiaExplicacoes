# 📚 Site de Explicações de Matemática

Site completo para explicações de matemática com três modalidades: **Online**, **Presencial** e **Ao Domicílio**.

---

## 🚨 ERRO 403 NO DEPLOY?

Se está a ver o erro **"XHR for edge_functions/make-server/deploy failed with status 403"**:

👉 **Leia o arquivo `RESOLVER_ERRO_403.md` para solução rápida!**

**Resumo**: Precisa criar a tabela do Supabase primeiro. Copie o código de `supabase-setup.sql` e execute no SQL Editor do Supabase. Aguarde 30 segundos e o deploy acontecerá automaticamente.

---

## 🚀 Início Rápido

### 1️⃣ Configurar o Supabase (OBRIGATÓRIO)

**Opção A - Via Script SQL (RECOMENDADO):**
1. Aceda ao [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione o projeto: `rnfjhzpmduezitzzxbsp`
3. Vá a **SQL Editor** → **New Query** (ou use este link direto: https://supabase.com/dashboard/project/rnfjhzpmduezitzzxbsp/sql/new)
4. Copie e cole TODO o conteúdo do arquivo `supabase-setup.sql`
5. Clique em **Run** (Ctrl+Enter)
6. Aguarde a mensagem de sucesso ✅
7. **AGUARDE 1-2 MINUTOS** antes de continuar

**Opção B - Manual:**
- Siga o guia passo-a-passo em `SETUP_SUPABASE.md`

### 2️⃣ Deploy da Edge Function

**IMPORTANTE**: Só faça isto DEPOIS de executar o SQL e aguardar 1-2 minutos!

1. Recarregue a página do Figma Make (pressione F5)
2. O sistema tentará fazer deploy automaticamente
3. Para verificar manualmente:
   - Vá a: https://supabase.com/dashboard/project/rnfjhzpmduezitzzxbsp/functions
   - Localize a função `make-server`
   - Aguarde até o status ficar **Active** (verde)

### 3️⃣ Configurar Email (OPCIONAL mas recomendado)

Para receber emails do formulário de contactos em `and.m.explicacoes@gmail.com`:

1. Siga as instruções em `CONFIGURACAO_EMAIL.md`
2. Crie conta grátis no [Resend.com](https://resend.com)
3. Adicione a `RESEND_API_KEY` no Supabase

### 4️⃣ Criar Primeiro Administrador

1. Aceda ao site e vá à página **Registar**
2. Preencha os dados:
   - Nome completo
   - Email
   - Password (mínimo 6 caracteres)
3. Após criar, faça login
4. Será redirecionado para o dashboard de administrador

---

## 📋 Funcionalidades

### Para Visitantes:
- ✅ **Página Inicial** com apresentação dos serviços
- ✅ **Preços** com simulador interativo e tabela de preços
- ✅ **Sobre Mim** com foto e percurso pessoal
- ✅ **Contactos** com formulário que envia email

### Para Alunos (após login):
- ✅ **Dashboard** com acesso a materiais de estudo
- ✅ Download de **Fichas**, **Resumos** e **Exercícios**
- ✅ Materiais organizados por categoria
- ✅ Dicas de estudo

### Para Administrador:
- ✅ **Upload de ficheiros** sem código (PDF, Word, Excel, imagens)
- ✅ Organização por categorias (Fichas, Resumos, Exercícios)
- ✅ Gestão de materiais (eliminar ficheiros)
- ✅ Interface simples de arrastar e largar

---

## 🏗️ Estrutura do Projeto

```
/
├── src/
│   └── app/
│       ├── pages/               # Todas as páginas do site
│       │   ├── Home.tsx         # Página inicial
│       │   ├── Pricing.tsx      # Simulador e tabela de preços
│       │   ├── About.tsx        # Sobre mim
│       │   ├── Contact.tsx      # Formulário de contactos
│       │   ├── Login.tsx        # Login de utilizadores
│       │   ├── Signup.tsx       # Registo de utilizadores
│       │   ├── StudentDashboard.tsx  # Dashboard do aluno
│       │   └── AdminDashboard.tsx    # Dashboard do admin
│       ├── components/          # Componentes reutilizáveis
│       ├── context/             # Context API (Autenticação)
│       └── routes.ts            # Configuração das rotas
├── supabase/
│   └── functions/
│       └── server/
│           └── index.tsx        # Edge Function (backend)
├── supabase-setup.sql           # Script de configuração SQL
├── SETUP_SUPABASE.md            # Guia de configuração detalhado
├── CONFIGURACAO_EMAIL.md        # Como configurar envio de emails
└── README.md                    # Este arquivo
```

---

## 💰 Preços Configurados

### Ensino Básico:
- 💻 Online: **13€/hora**
- 🏫 Presencial: **15€/hora**
- 🏠 Ao Domicílio: **17€/hora**

### Ensino Secundário:
- 💻 Online: **18€/hora**
- 🏫 Presencial: **20€/hora**
- 🏠 Ao Domicílio: **22€/hora**

---

## 🔧 Tecnologias Utilizadas

- **Frontend**: React + TypeScript + Tailwind CSS
- **Routing**: React Router v7 (Data Mode)
- **Backend**: Supabase Edge Functions (Deno + Hono)
- **Autenticação**: Supabase Auth
- **Storage**: Supabase Storage (ficheiros privados)
- **Base de Dados**: Supabase PostgreSQL
- **Email**: Resend API
- **UI Components**: Shadcn/ui + Lucide Icons

---

## 📧 Envio de Emails

Quando alguém envia uma mensagem via formulário de contactos:

1. A mensagem é guardada na base de dados (KV Store)
2. Um email é enviado automaticamente para `and.m.explicacoes@gmail.com`
3. O email contém todos os dados: nome, email, telefone e mensagem
4. Formato profissional com HTML estilizado

**Nota**: Sem configurar RESEND_API_KEY, as mensagens são guardadas mas o email não é enviado.

---

## 🛡️ Segurança

- ✅ Row Level Security (RLS) ativado
- ✅ Storage bucket privado (apenas utilizadores autenticados)
- ✅ Autenticação via JWT tokens
- ✅ Validação de roles (admin vs student)
- ✅ CORS configurado corretamente
- ✅ Passwords com mínimo de 6 caracteres
- ✅ Email confirmation automática

---

## 📊 Base de Dados

### Tabela: `kv_store_0af0fbad`

Estrutura simples de chave-valor para guardar:
- Materiais de estudo (metadados)
- Mensagens de contacto
- Outras configurações

```sql
CREATE TABLE kv_store_0af0fbad (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Storage Bucket: `make-0af0fbad-materials`

- **Tipo**: Privado
- **Limite**: 50MB por ficheiro
- **Formatos aceites**: PDF, Word, Excel, Imagens
- **Acesso**: Apenas utilizadores autenticados

---

## 🐛 Resolução de Problemas

### Erro: "Erro ao carregar materiais"

**Solução**:
1. Verifique se a tabela `kv_store_0af0fbad` existe
2. Execute o script `supabase-setup.sql`
3. Verifique se a Edge Function está deployed

### Erro: "Não autorizado"

**Solução**:
1. Faça logout e login novamente
2. Limpe os cookies do browser
3. Verifique se o utilizador foi criado corretamente

### Erro 403 no deploy da Edge Function

**Solução**:
1. Verifique os logs da Edge Function no Supabase
2. Certifique-se que o código não tem erros de sintaxe
3. Aguarde alguns minutos e tente novamente

### Emails não chegam

**Solução**:
1. Verifique se `RESEND_API_KEY` está configurada
2. Veja o dashboard do Resend para verificar envios
3. Verifique a pasta de spam em `and.m.explicacoes@gmail.com`

---

## 📝 Checklist de Deploy

Antes de considerar o site pronto para produção:

- [ ] Script SQL executado com sucesso
- [ ] Edge Function deployed e active
- [ ] Health check retorna `{"status":"ok"}`
- [ ] Primeiro admin criado e consegue fazer login
- [ ] Upload de ficheiro funciona (testar com PDF)
- [ ] Download de ficheiro funciona
- [ ] Formulário de contactos envia mensagens
- [ ] RESEND_API_KEY configurada (emails funcionam)
- [ ] Todas as páginas carregam sem erros
- [ ] Site responsivo em mobile e desktop

---

## 🎯 Próximos Passos (Opcionais)

1. **Personalizar a página "Sobre Mim"**:
   - Adicionar foto pessoal
   - Editar percurso académico
   - Ajustar texto de apresentação

2. **Configurar domínio próprio** no Resend:
   - Para emails profissionais (ex: `noreply@seudominio.com`)
   - Ver `CONFIGURACAO_EMAIL.md` para instruções

3. **Adicionar mais materiais**:
   - Fazer login como admin
   - Ir ao Dashboard Admin
   - Upload de fichas, resumos e exercícios

4. **Criar utilizadores de teste**:
   - Registar alunos de teste
   - Verificar que têm acesso aos materiais

---

## 📞 Suporte

Para questões ou problemas:

1. Verifique os logs no browser (F12 → Console)
2. Verifique os logs da Edge Function no Supabase
3. Consulte os guias de configuração:
   - `SETUP_SUPABASE.md` - Configuração do Supabase
   - `CONFIGURACAO_EMAIL.md` - Configuração de emails
4. Execute novamente o `supabase-setup.sql` se necessário

---

## 📄 Licença

Este projeto é privado e foi criado especificamente para o serviço de explicações de matemática.

---

**Desenvolvido com ❤️ para Explicações de Matemática**

Email de contacto: and.m.explicacoes@gmail.com