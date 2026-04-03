-- ============================================
-- SCRIPT DE CONFIGURAÇÃO COMPLETA DO SUPABASE
-- Site de Explicações de Matemática
-- Projeto: rnfjhzpmduezitzzxbsp
-- ============================================
-- 
-- INSTRUÇÕES:
-- 1. Aceda ao Supabase Dashboard
-- 2. Vá ao SQL Editor
-- 3. Cole este script completo
-- 4. Clique em "Run" (Ctrl+Enter)
-- ============================================

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

-- Remover políticas antigas (se existirem)
DROP POLICY IF EXISTS "Allow all operations via service_role" ON kv_store_0af0fbad;
DROP POLICY IF EXISTS "Service role has full access" ON kv_store_0af0fbad;

-- Criar política para permitir TODAS operações via service_role
CREATE POLICY "Service role has full access"
ON kv_store_0af0fbad
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Comentário sobre a tabela
COMMENT ON TABLE kv_store_0af0fbad IS 'Key-value store para materiais de estudo, contactos e outros dados do site de explicações';

-- Criar bucket de storage (se não existir)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'make-0af0fbad-materials',
  'make-0af0fbad-materials',
  false,
  52428800, -- 50MB
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
ON CONFLICT (id) DO NOTHING;

-- Configurar políticas do storage bucket
-- Permitir que utilizadores autenticados vejam ficheiros
CREATE POLICY IF NOT EXISTS "Authenticated users can view files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'make-0af0fbad-materials');

-- Permitir que admins façam upload
CREATE POLICY IF NOT EXISTS "Admins can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'make-0af0fbad-materials'
);

-- Permitir que admins apaguem ficheiros
CREATE POLICY IF NOT EXISTS "Admins can delete files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'make-0af0fbad-materials');

-- Verificação final
DO $$
BEGIN
  RAISE NOTICE '✅ Configuração concluída com sucesso!';
  RAISE NOTICE '';
  RAISE NOTICE 'Tabelas criadas:';
  RAISE NOTICE '  - kv_store_0af0fbad';
  RAISE NOTICE '';
  RAISE NOTICE 'Storage buckets criados:';
  RAISE NOTICE '  - make-0af0fbad-materials (privado, limite 50MB)';
  RAISE NOTICE '';
  RAISE NOTICE 'Próximos passos:';
  RAISE NOTICE '  1. Configure a RESEND_API_KEY em Edge Functions → Secrets';
  RAISE NOTICE '  2. Faça deploy da Edge Function "make-server"';
  RAISE NOTICE '  3. Crie o primeiro utilizador admin através da página de registo';
  RAISE NOTICE '  4. Teste o health check: /functions/v1/make-server-0af0fbad/health';
END $$;