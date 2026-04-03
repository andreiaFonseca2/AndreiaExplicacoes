# Configuração do Envio de Emails

## Como configurar o envio de emails para and.m.explicacoes@gmail.com

O sistema está configurado para enviar emails automaticamente quando alguém preencher o formulário de contactos. As mensagens serão enviadas para **and.m.explicacoes@gmail.com**.

### 🔴 IMPORTANTE: CONFIGURAÇÃO OBRIGATÓRIA

**Se não configurar a RESEND_API_KEY, os emails NÃO serão enviados!**

### Passo 1: Criar conta no Resend (GRÁTIS)

1. Aceda a [resend.com](https://resend.com)
2. Clique em **Sign Up** (Criar conta)
3. Use o email **and.m.explicacoes@gmail.com** para criar a conta
4. Confirme o email que receberá

### Passo 2: Obter a API Key

1. Após login, vá ao dashboard
2. No menu lateral, clique em **API Keys**
3. Clique no botão **Create API Key**
4. Dê um nome: "Explicações Site"
5. **COPIE a chave** que começa com `re_...` (aparece apenas UMA VEZ!)

### Passo 3: Configurar no Supabase

**OPÇÃO A - Via Interface do Figma Make:**
1. Vá a **Settings** → **Secrets**
2. Encontre `RESEND_API_KEY`
3. Cole a chave do Resend
4. Clique em **Save**

**OPÇÃO B - Via Supabase Dashboard:**
1. Aceda ao [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione o seu projeto
3. Vá a **Edge Functions** → **Secrets**
4. Adicione nova secret:
   - Nome: `RESEND_API_KEY`
   - Valor: (cole a chave do Resend)
5. Clique em **Save**

### Passo 4: Testar

1. Vá à página de **Contactos** no site
2. Preencha o formulário com dados de teste
3. Clique em **Enviar Mensagem**
4. Você deve ver: "✅ Mensagem enviada! Receberá resposta em breve no seu email."
5. Verifique **and.m.explicacoes@gmail.com** (inbox ou spam)

### 📧 Formato do Email que Receberá

```
De: onboarding@resend.dev
Para: and.m.explicacoes@gmail.com
Assunto: Nova Mensagem de Contacto - [Nome da Pessoa]

📧 Nova Mensagem de Contacto

👤 Nome: João Silva
📧 Email: joao@example.com
📱 Telefone: +351 912 345 678

💬 Mensagem:
[Mensagem da pessoa]

Recebido em 10/03/2026, 15:30:45
```

## 🔍 Como Verificar se está Configurado

### No Browser (Console do Navegador):

1. Abra o site e vá à página de Contactos
2. Pressione **F12** para abrir as ferramentas de desenvolvimento
3. Vá ao separador **Console**
4. Preencha e envie o formulário
5. Procure pelas mensagens com `[CONTACT]`:
   - ✅ `[CONTACT] RESEND_API_KEY configured: YES` → Configurado!
   - ❌ `[CONTACT] RESEND_API_KEY configured: NO` → NÃO configurado!
   - ✅ `[CONTACT] ✅ Email sent successfully` → Email enviado!

### Mensagens que Pode Ver:

**✅ Sucesso:**
```
✅ Mensagem enviada! Receberá resposta em breve no seu email.
```

**⚠️ Falta Configuração:**
```
⚠️ Email não configurado - configure RESEND_API_KEY
```

**❌ Erro no Envio:**
```
Mensagem guardada, mas erro ao enviar email
```

## 🛠️ Resolução de Problemas

### Problema: "RESEND_API_KEY configured: NO"

**Solução:**
1. Certifique-se que criou a API Key no Resend
2. Adicione a secret `RESEND_API_KEY` no Supabase
3. **Importante:** Após adicionar a secret, aguarde 1-2 minutos
4. **Reinicie** a Edge Function (ou faça um novo deploy)

### Problema: Email não chega

**Verificações:**
1. ✅ Vá ao [dashboard do Resend](https://resend.com/emails)
2. ✅ Verifique se o email aparece na lista de "Emails Sent"
3. ✅ Verifique a pasta de **Spam** em and.m.explicacoes@gmail.com
4. ✅ Se estiver no Spam, marque como "Não é spam"

### Problema: "Invalid API Key"

**Solução:**
1. Verifique se copiou a chave completa (começa com `re_`)
2. Crie uma nova API Key no Resend
3. Atualize a secret no Supabase

### Problema: Limite de emails atingido

**Plano Gratuito do Resend:**
- 100 emails/dia
- 3.000 emails/mês

**Solução:**
- Aguarde até o próximo dia (limite é diário)
- Ou faça upgrade no plano do Resend

## 📊 Monitorizar Emails

No [dashboard do Resend](https://resend.com/emails), pode ver:
- ✅ Emails enviados com sucesso
- ❌ Emails que falharam
- 📊 Estatísticas de entregas
- 📧 Conteúdo de cada email enviado

## 🎯 Próximos Passos (Opcional)

### Configurar Domínio Próprio

Para emails profissionais (ex: `noreply@seudominio.com`):

1. No Resend, vá a **Domains**
2. Clique em **Add Domain**
3. Adicione o seu domínio (ex: `seudominio.com`)
4. Configure os registos DNS conforme instruções
5. Aguarde verificação (até 48h)

Depois, atualize o código em `/supabase/functions/server/index.tsx`:
```typescript
from: 'noreply@seudominio.com',  // Em vez de 'onboarding@resend.dev'
```

## 📝 Notas Importantes

- ✅ As mensagens são **sempre guardadas** no sistema (KV store)
- ✅ Mesmo que o email falhe, a mensagem não se perde
- ✅ O sistema tenta enviar email mas continua a funcionar se falhar
- ✅ Todos os logs estão disponíveis no console do browser (F12)