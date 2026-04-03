# ⚡ Início Rápido - 5 Minutos

## 🚨 IMPORTANTE: O erro 403 acontece porque a Edge Function precisa ser deployada APÓS configurar a base de dados

## Configuração em 3 Passos (ORDEM CORRETA)

### ✅ PASSO 1: Configurar Supabase (2 minutos)

1. Abra: https://supabase.com/dashboard/project/rnfjhzpmduezitzzxbsp/sql/new
2. Copie TODO o conteúdo do arquivo `supabase-setup.sql`
3. Cole no editor SQL
4. Clique em **RUN** (botão verde ou Ctrl+Enter)
5. Aguarde a mensagem: ✅ "Configuração concluída com sucesso!"

⚠️ **NÃO pule este passo! A tabela kv_store_0af0fbad PRECISA existir antes do deploy**

### ✅ PASSO 2: Aguardar e Deploy da Edge Function (1 minuto)

1. **AGUARDE 1-2 MINUTOS** após executar o SQL
2. Recarregue a página do Figma Make (pressione F5)
3. O sistema tentará fazer deploy automaticamente
4. Vá a: https://supabase.com/dashboard/project/rnfjhzpmduezitzzxbsp/functions
5. Localize: **make-server**
6. Aguarde o status **Active** (bolinha verde)

💡 **Dica**: Se der erro 403, significa que o Figma Make está tentando fazer deploy antes da tabela ser criada. Aguarde alguns segundos e o sistema tentará novamente automaticamente.

### ✅ PASSO 3: Criar Admin (2 minutos)

1. Abra o seu site
2. Clique em **Registar**
3. Preencha:
   - Nome: (seu nome completo)
   - Email: (seu email)
   - Password: (mínimo 6 caracteres)
4. Clique em **Criar Conta**
5. Faça **Login**

**🎉 PRONTO! O site está funcional!**

---

## 📧 OPCIONAL: Configurar Emails (3 minutos extras)

Para receber emails do formulário de contactos:

### 1. Criar conta Resend (1 minuto)
- Vá a: https://resend.com/signup
- Use o email: `and.m.explicacoes@gmail.com`
- Confirme o email

### 2. Obter API Key (1 minuto)
- Login no Resend
- Vá a: **API Keys** (menu lateral)
- Clique em **Create API Key**
- Nome: "Explicações Site"
- **COPIE** a chave (começa com `re_...`)

### 3. Adicionar no Supabase (1 minuto)
- Vá a: https://supabase.com/dashboard/project/rnfjhzpmduezitzzxbsp/settings/functions
- Clique em **Secrets**
- Adicione:
  - Name: `RESEND_API_KEY`
  - Value: (cole a chave copiada)
- Clique em **Save**

**✉️ Emails configurados! Agora receberá mensagens em and.m.explicacoes@gmail.com**

---

## 🧪 Testar se Está Tudo OK

### Teste 1: Health Check
Abra no browser:
```
https://rnfjhzpmduezitzzxbsp.supabase.co/functions/v1/make-server-0af0fbad/health
```
✅ Deve mostrar: `{"status":"ok"}`

### Teste 2: Login Admin
1. Vá ao site → **Login**
2. Entre com o email/password criados
3. ✅ Deve ser redirecionado para `/dashboard-admin`

### Teste 3: Upload de Ficheiro
1. No Dashboard Admin
2. Arraste um ficheiro PDF
3. Categoria: **Fichas**
4. Clique em **Carregar Ficheiro**
5. ✅ Deve aparecer na lista

### Teste 4: Formulário de Contactos
1. Vá a **Contactos**
2. Preencha o formulário
3. Clique em **Enviar Mensagem**
4. ✅ Deve mostrar "Mensagem enviada com sucesso"
5. ✅ Email deve chegar em and.m.explicacoes@gmail.com (se configurado)

---

## 🚨 Problemas?

### "Erro ao carregar materiais"
👉 Execute o `supabase-setup.sql` novamente

### Página em branco após login
👉 Limpe os cookies do browser e faça login novamente

### Edge Function com erro 403
👉 Aguarde 2-3 minutos e tente o deploy novamente

### Emails não chegam
👉 Verifique se RESEND_API_KEY está configurada
👉 Veja a pasta de SPAM

---

## 📚 Guias Completos

Para mais detalhes:
- **README.md** - Visão geral completa
- **SETUP_SUPABASE.md** - Configuração detalhada do Supabase  
- **CONFIGURACAO_EMAIL.md** - Configuração completa de emails

---

## ✨ Está Pronto!

Agora pode:
- ✅ Fazer login como admin
- ✅ Carregar materiais de estudo
- ✅ Criar utilizadores alunos
- ✅ Receber mensagens de contacto
- ✅ Usar todas as funcionalidades do site

**Bom trabalho! 🎉**