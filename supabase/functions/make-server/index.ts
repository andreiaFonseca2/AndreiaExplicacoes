import { Hono } from "npm:hono@4";
import { cors } from "npm:hono@4/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

app.use("/*", cors());

const getSupabase = () => createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

app.get("/make-server-0af0fbad/health", (c) => c.json({ status: "ok" }));

app.post("/make-server-0af0fbad/signup", async (c) => {
  try {
    const { email, password, name, role } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: "Email, password e nome são obrigatórios" }, 400);
    }

    const supabase = getSupabase();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role: role || 'student' },
      email_confirm: true
    });

    if (error) {
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      message: "Utilizador criado com sucesso",
      user: { id: data.user.id, email: data.user.email }
    });
  } catch (error) {
    return c.json({ error: "Erro ao criar utilizador" }, 500);
  }
});

app.post("/make-server-0af0fbad/upload-material", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const supabase = getSupabase();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    if (user.user_metadata?.role !== 'admin') {
      return c.json({ error: "Apenas administradores podem carregar ficheiros" }, 403);
    }

    const { fileName, fileData, fileType, category, description } = await c.req.json();
    
    if (!fileName || !fileData || !category) {
      return c.json({ error: "Dados incompletos" }, 400);
    }

    const fileBuffer = Uint8Array.from(atob(fileData), c => c.charCodeAt(0));
    const filePath = `${category}/${Date.now()}-${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('make-0af0fbad-materials')
      .upload(filePath, fileBuffer, { contentType: fileType });

    if (uploadError) {
      return c.json({ error: uploadError.message }, 500);
    }

    const materialId = `material_${Date.now()}`;
    const { error: dbError } = await supabase
      .from("kv_store_0af0fbad")
      .upsert({ 
        key: materialId, 
        value: {
          fileName,
          filePath,
          fileType,
          category,
          description: description || '',
          uploadedAt: new Date().toISOString(),
          uploadedBy: user.id
        }
      });

    if (dbError) {
      return c.json({ error: dbError.message }, 500);
    }

    return c.json({ message: "Ficheiro carregado com sucesso", materialId });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

app.get("/make-server-0af0fbad/materials", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const supabase = getSupabase();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data, error } = await supabase
      .from("kv_store_0af0fbad")
      .select("key, value")
      .like("key", "material_%");

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    const materials = await Promise.all(
      (data || []).map(async (item: any) => {
        const { data: urlData } = await supabase.storage
          .from('make-0af0fbad-materials')
          .createSignedUrl(item.value.filePath, 3600);

        return {
          id: item.key,
          fileName: item.value.fileName,
          category: item.value.category,
          description: item.value.description,
          uploadedAt: item.value.uploadedAt,
          url: urlData?.signedUrl || '',
          fileType: item.value.fileType
        };
      })
    );

    return c.json({ materials });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

app.delete("/make-server-0af0fbad/materials/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const supabase = getSupabase();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError || user.user_metadata?.role !== 'admin') {
      return c.json({ error: "Não autorizado" }, 403);
    }

    const materialId = c.req.param('id');
    const { data, error } = await supabase
      .from("kv_store_0af0fbad")
      .select("value")
      .eq("key", materialId)
      .single();

    if (error || !data) {
      return c.json({ error: "Material não encontrado" }, 404);
    }

    await supabase.storage
      .from('make-0af0fbad-materials')
      .remove([data.value.filePath]);

    await supabase
      .from("kv_store_0af0fbad")
      .delete()
      .eq("key", materialId);

    return c.json({ message: "Material eliminado com sucesso" });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

app.post("/make-server-0af0fbad/contact", async (c) => {
  try {
    const { name, email, phone, message } = await c.req.json();
    
    if (!name || !email || !message) {
      return c.json({ error: "Nome, email e mensagem são obrigatórios" }, 400);
    }

    const supabase = getSupabase();
    const contactId = `contact_${Date.now()}`;
    
    await supabase.from("kv_store_0af0fbad").upsert({
      key: contactId,
      value: { name, email, phone: phone || '', message, submittedAt: new Date().toISOString() }
    });

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      return c.json({ message: "Mensagem guardada com sucesso" });
    }

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: ['and.m.explicacoes@gmail.com'],
          subject: `Nova Mensagem de Contacto - ${name}`,
          html: `
            <h2>Nova Mensagem de Contacto</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phone || 'Não fornecido'}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${message}</p>
          `,
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        return c.json({ message: "Mensagem guardada, mas erro ao enviar email" }, 500);
      }
      
      return c.json({ message: "Mensagem enviada com sucesso", emailSent: true });
      
    } catch (emailError) {
      return c.json({ message: "Mensagem guardada, mas erro ao enviar email" }, 500);
    }
  } catch (error) {
    return c.json({ error: "Erro ao enviar mensagem" }, 500);
  }
});

Deno.serve(app.fetch);
