# 🔧 Como Resolver o Erro 403 no Deploy

## 🚨 O QUE É O ERRO 403?

O erro **"XHR for '/api/integrations/supabase/.../edge_functions/make-server/deploy' failed with status 403"** acontece quando o Figma Make tenta fazer deploy da Edge Function **ANTES** da base de dados estar configurada.

---

## ✅ SOLUÇÃO DEFINITIVA - 2 Passos

### PASSO 1: Criar a Tabela no Supabase (OBRIGATÓRIO)

A Edge Function **precisa** da tabela `kv_store_0af0fbad` para funcionar. Sem ela, o deploy falha.

**Como fazer:**

1. Abra o Supabase Dashboard: https://supabase.com/dashboard/project/rnfjhzpmduezitzzxbsp

2. Vá ao **SQL Editor** (menu lateral esquerdo)
   
   Link direto: https://supabase.com/dashboard/project/rnfjhzpmduezitzzxbsp/sql/new

3. Clique em **New Query**

4. Copie e cole este código SQL:

```sql
-- Criar tabela KV Store
CREATE TABLE IF NOT EXISTS kv_store_0af0fbad (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar índice para buscas por prefixo
CREATE INDEX IF NOT EXISTS idx_kv_store_key_prefix 
ON kv_store_0af0fbad (key text_pattern_ops);

-- Ativar Row Level Security
ALTER TABLE kv_store_0af0fbad ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir TODAS operações via service_role
CREATE POLICY "Service role has full access"
ON kv_store_0af0fbad
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Criar bucket de storage
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES (
  'make-0af0fbad-materials',
  'make-0af0fbad-materials',
  false,
  52428800
)
ON CONFLICT (id) DO NOTHING;
```

5. Clique em **RUN** (ou pressione Ctrl+Enter)

6. Aguarde a mensagem: **"Success. No rows returned"**

✅ **TABELA CRIADA!** Agora pode prosseguir.

---

### PASSO 2: Aguardar e Tentar Novamente

Depois de criar a tabela:

1. **AGUARDE 30 SEGUNDOS** (tempo para o Supabase processar)

2. O Figma Make irá **automaticamente tentar fazer deploy novamente**

3. Se ainda aparecer erro 403, **recarregue a página** do Figma Make

4. Aguarde mais 1-2 minutos

---

## 🔍 POR QUE ISSO ACONTECE?

O código da Edge Function faz isto quando é carregado:

```typescript
const kvGetByPrefix = async (prefix: string): Promise<any[]> => {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("kv_store_0af0fbad")  // <-- PRECISA DESTA TABELA!
    .select("key, value")
    .like("key", prefix + "%");
  // ...
};
```

Se a tabela `kv_store_0af0fbad` **não existir**, o Deno (ambiente da Edge Function) retorna erro 403 porque não consegue validar o código.

---

## 🎯 CHECKLIST DE VERIFICAÇÃO

Antes de tentar o deploy, certifique-se que:

- [ ] Acedeu ao Supabase Dashboard do projeto correto
- [ ] Executou o código SQL completo (não apenas uma parte)
- [ ] Viu a mensagem "Success" no SQL Editor
- [ ] Aguardou pelo menos 30 segundos após executar o SQL
- [ ] A tabela `kv_store_0af0fbad` existe (pode verificar em Database → Tables)
- [ ] O bucket `make-0af0fbad-materials` existe (pode verificar em Storage)

---

## 🧪 COMO VERIFICAR SE A TABELA EXISTE?

No Supabase Dashboard:

1. Vá a **Database** → **Tables** (menu lateral)

2. Procure por: `kv_store_0af0fbad`

3. Se aparecer na lista, está tudo OK ✅

4. Se **NÃO aparecer**, execute o SQL novamente

---

## 🔄 ALTERNATIVA: Deploy Manual

Se o deploy automático continuar falhando:

1. No Supabase Dashboard, vá a **Edge Functions**

2. Procure por: `make-server`

3. Clique no nome da função

4. Clique em **Deploy**

5. Aguarde o status mudar para **Active** (verde)

---

## ⚠️ ERROS COMUNS

### "relation 'kv_store_0af0fbad' does not exist"

**Causa**: A tabela não foi criada

**Solução**: Execute o código SQL do Passo 1

### "permission denied for table kv_store_0af0fbad"

**Causa**: As políticas RLS não foram configuradas corretamente

**Solução**: Execute este SQL adicional:

```sql
DROP POLICY IF EXISTS "Service role has full access" ON kv_store_0af0fbad;

CREATE POLICY "Service role has full access"
ON kv_store_0af0fbad
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
```

### Deploy fica em "Deploying..." para sempre

**Causa**: Código com erro de sintaxe ou problema de rede

**Solução**: 
1. Aguarde 5 minutos
2. Recarregue a página do Figma Make
3. Verifique os logs da Edge Function no Supabase

---

## 📞 AINDA TEM PROBLEMAS?

Se após seguir todos os passos o erro persistir:

1. **Verifique os logs da Edge Function**:
   - Supabase Dashboard → Edge Functions → make-server → Logs
   - Procure por mensagens de erro específicas

2. **Tente deploy via CLI** (avançado):
   ```bash
   supabase functions deploy make-server
   ```

3. **Verifique permissões**:
   - Certifique-se que tem permissões de admin no projeto Supabase
   - Verifique se o projeto não está pausado ou suspenso

4. **Re-sincronize o Figma Make**:
   - Disconnect e reconnect a integração do Supabase
   - Aguarde alguns minutos
   - Tente novamente

---

## ✅ RESUMO

**TL;DR** (versão curta):

1. Vá ao Supabase SQL Editor
2. Execute o código SQL que cria a tabela `kv_store_0af0fbad`
3. Aguarde 30 segundos
4. O deploy funcionará automaticamente

**O erro 403 é simplesmente porque a tabela não existe ainda.** Depois de criá-la, tudo funciona! 🎉