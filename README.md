
# MyPlant | Site de Brindes Ecológicos (Estilo Elo7)

Este projeto foi desenvolvido para a venda de **Kits de Plantio Personalizados**, com integração completa ao Supabase para gestão de dados e Google Gemini API para assistência criativa.

## 🚀 Como Deployar (Hostinger / Vercel / Netlify)

### 1. Preparação do Banco de Dados
- Crie um projeto no [Supabase](https://supabase.com/).
- Vá em **SQL Editor** e execute o conteúdo do arquivo `schema.sql` que está na raiz deste projeto.
- Cadastre seus primeiros produtos através da aba **AdminDashboard** no site (senha padrão: `@myplant2026`).

### 2. Variáveis de Ambiente
Você precisará configurar as seguintes variáveis no seu ambiente de hospedagem ou no arquivo `.env`:

```env
API_KEY=sua_chave_do_google_ai_studio
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

### 3. Publicação no GitHub
- Utilize a função **"Export to GitHub"** do Google AI Studio.
- Escolha o repositório e o branch desejado.
- Se for publicar na Hostinger, gere o build (`npm run build`) e faça o upload da pasta `dist` conforme as instruções anteriores.

## 🛠️ Funcionalidades Admin
- **Gestão de Produtos**: CRUD completo sincronizado com Supabase.
- **Pedidos**: Visualização de vendas e status.
- **Integrações**: Configurações preparadas para Bling ERP e Melhor Envio.

## 🌿 Tecnologias
- **Frontend**: React + Tailwind CSS + Lucide Icons.
- **Backend/DB**: Supabase (PostgreSQL).
- **IA**: Google Gemini 3 Flash (Assistente Flora e Sugestões de Tags).

---
Desenvolvido com foco em UX e conversão para brindes sustentáveis.
