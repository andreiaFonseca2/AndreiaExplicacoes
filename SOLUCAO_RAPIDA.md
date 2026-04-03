# ⚡ SOLUÇÃO RÁPIDA - ERRO 403

## 📍 Está Aqui Porque Viu Este Erro:

```
Error while deploying: XHR for "/api/integrations/supabase/.../edge_functions/make-server/deploy" failed with status 403
```

---

## ✅ SOLUÇÃO EM 3 CLIQUES:

### 1️⃣ Abrir Link
Clique aqui: https://supabase.com/dashboard/project/rnfjhzpmduezitzzxbsp/sql/new

### 2️⃣ Copiar e Colar
- Abra o arquivo `supabase-setup.sql` (está na raiz deste projeto)
- Selecione TODO o conteúdo (Ctrl+A)
- Copie (Ctrl+C)
- Cole no SQL Editor do Supabase (Ctrl+V)

### 3️⃣ Executar
- Clique no botão verde **"RUN"** (ou Ctrl+Enter)
- Aguarde ver: "Success. No rows returned"
- **AGUARDE 2 MINUTOS** completos sem fazer nada

---

## 🎉 PRONTO!

Depois desses 2 minutos:
- Recarregue a página do Figma Make (F5)
- O erro 403 deve desaparecer
- O deploy acontecerá automaticamente

---

## 🤔 POR QUE ISSO FUNCIONA?

O erro acontece porque o código precisa de uma tabela no banco de dados que ainda não existe.

Ao executar o SQL:
- ✅ Cria a tabela `kv_store_0af0fbad`
- ✅ Cria o bucket de storage
- ✅ Configura as permissões

Depois disso, o deploy funciona perfeitamente!

---

## 🚨 AINDA TEM PROBLEMAS?

Leia estes arquivos nesta ordem:

1. **LEIA_ISTO_PRIMEIRO.txt** - Instruções básicas
2. **RESOLVER_ERRO_403.md** - Solução detalhada
3. **INICIO_RAPIDO.md** - Configuração completa

---

## 📞 VERIFICAR SE FUNCIONOU

Depois de 2 minutos, abra este link:

https://rnfjhzpmduezitzzxbsp.supabase.co/functions/v1/make-server-0af0fbad/health

Se mostrar `{"status":"ok"}` está tudo OK! ✅

Se der erro 404 ou timeout, aguarde mais 1-2 minutos.

---

**Resumindo**: Execute o `supabase-setup.sql` no Supabase, aguarde 2 minutos, e pronto! 🚀
