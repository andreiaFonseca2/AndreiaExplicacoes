# Configuração do Supabase - Passo a Passo

## ⚠️ IMPORTANTE: Configure estas tabelas ANTES de usar o site

### 1. Aceder ao Supabase Dashboard

1. Vá a [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Faça login
3. Selecione o projeto: **XVKNFFvbNzYpSUw2t8DYdt**

---

## 2. Criar a Tabela KV Store

### Via SQL Editor (RECOMENDADO):

1. No menu lateral, clique em **SQL Editor**
2. Clique em **New Query**
3. Cole o seguinte código SQL:

```sql
-- Criar tabela kv_store
CREATE TABLE IF NOT EXISTS kv_store_0af0fbad (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);

-- Permitir acesso via service_role
ALTER TABLE kv_store_0af0fbad ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir todas operações via service_role
CREATE POLICY "Allow all operations via service_role"
ON kv_store_0af0fbad
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
```

4. Clique em **Run** (ou pressione Ctrl+Enter)
5. Deve aparecer "Success. No rows returned"

---

## 3. Criar o Storage Bucket

### Via Interface:

1. No menu lateral, clique em **Storage**
2. Clique em **Create a new bucket**
3. Preencha:
   - **Name**: `make-0af0fbad-materials`
   - **Public bucket**: ❌ Desmarcar (bucket privado)
   - **File size limit**: 50 MB
4. Clique em **Create bucket**

### Via SQL (Alternativa):

```sql
-- Criar bucket de storage
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('make-0af0fbad-materials', 'make-0af0fbad-materials', false, 52428800)
ON CONFLICT (id) DO NOTHING;
```

---

## 4. Verificar as Edge Functions

1. No menu lateral, clique em **Edge Functions**
2. Deve ver a função: **make-server**
3. Clique em **Deploy** se ainda não foi feito o deploy
4. Aguarde até o status ser **Active** (verde)

---

## 5. Configurar Secrets (Variáveis de Ambiente)

### API Key do Resend (para envio de emails):

1. No menu lateral, clique em **Edge Functions**
2. Clique em **Manage Secrets** (ou **Settings** → **Secrets**)
3. Adicione:
   - **Name**: `RESEND_API_KEY`
   - **Value**: [Sua chave do Resend - veja CONFIGURACAO_EMAIL.md]
4. Clique em **Save**

---

## 6. Testar a Configuração

### Teste 1: Health Check

Abra no browser:
```
https://XVKNFFvbNzYpSUw2t8DYdt.supabase.co/functions/v1/make-server-0af0fbad/health
```

Deve retornar:
```json
{"status":"ok"}
```

### Teste 2: Criar Primeiro Admin

1. Vá à página de **Registo** no site
2. Preencha os dados
3. **IMPORTANTE**: O primeiro utilizador será automaticamente admin
4. Depois de criar, vá ao SQL Editor do Supabase e execute:

```sql
-- Verificar se o utilizador foi criado
SELECT email, raw_user_meta_data->>'role' as role 
FROM auth.users;
```

### Teste 3: Login e Dashboard

1. Faça login com o utilizador criado
2. Se for admin, deve ser redirecionado para `/dashboard-admin`
3. Se for aluno, deve ser redirecionado para `/dashboard-aluno`

---

## 7. Resolver Problemas Comuns

### Erro: "Não autorizado" ao carregar materiais

**Causa**: Tabela kv_store não existe ou não tem as políticas corretas

**Solução**:
```sql
-- Recriar a tabela com permissões
DROP TABLE IF EXISTS kv_store_0af0fbad CASCADE;

CREATE TABLE kv_store_0af0fbad (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);

ALTER TABLE kv_store_0af0fbad ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations via service_role"
ON kv_store_0af0fbad
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
```

### Erro: "Erro ao carregar ficheiro"

**Causa**: Bucket não existe

**Solução**: Criar bucket via Storage (passo 3)

### Erro 403 no deploy

**Causa**: Código não está a compilar corretamente

**Solução**:
1. Vá a **Edge Functions** → **make-server**
2. Verifique os logs de deploy
3. Certifique-se que não há erros de sintaxe

### Edge Function não aparece

**Solução**:
1. Vá ao Figma Make
2. Settings → Integrations → Supabase
3. Clique em **Re-sync** ou **Reconnect**

---

## 8. Estrutura Final do Banco de Dados

Após a configuração, deve ter:

### Tabelas:
- ✅ `auth.users` (automática)
- ✅ `kv_store_0af0fbad` (criada manualmente)

### Storage Buckets:
- ✅ `make-0af0fbad-materials` (privado)

### Edge Functions:
- ✅ `make-server` (deployed e active)

### Secrets:
- ✅ `SUPABASE_URL` (automática)
- ✅ `SUPABASE_SERVICE_ROLE_KEY` (automática)
- ✅ `RESEND_API_KEY` (configurar manualmente)

---

## 9. Dados de Teste (Opcional)

Para testar o sistema com dados fictícios:

```sql
-- Criar alguns materiais de teste (após fazer upload via interface)
-- Isto é apenas para verificar se a estrutura está correta
SELECT * FROM kv_store_0af0fbad;

-- Ver utilizadores criados
SELECT email, raw_user_meta_data->>'name' as name, raw_user_meta_data->>'role' as role
FROM auth.users;
```

---

## ✅ Checklist Final

Antes de considerar a configuração completa:

- [ ] Tabela `kv_store_0af0fbad` criada
- [ ] Políticas de RLS configuradas na tabela
- [ ] Bucket `make-0af0fbad-materials` criado
- [ ] Edge Function `make-server` deployed e active
- [ ] Health check retorna `{"status":"ok"}`
- [ ] Primeiro utilizador admin criado e consegue fazer login
- [ ] RESEND_API_KEY configurada (para emails)
- [ ] Formulário de contactos funciona

---

## 📞 Suporte

Se continuar com problemas:

1. Verifique os logs da Edge Function no Supabase Dashboard
2. Abra o console do browser (F12) e veja os erros
3. Verifique se todas as variáveis de ambiente estão configuradas
4. Certifique-se que o projeto Supabase está no plano correto (gratuito é suficiente)
