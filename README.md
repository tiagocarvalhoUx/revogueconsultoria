# Revogue Consultoria

Landing page institucional da Revogue Consultoria, desenvolvida com Vue 3, Vite e Tailwind CSS.

## Requisitos

- Node.js 22
- npm 10 ou superior

## Desenvolvimento local

```bash
npm ci
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

O build é gerado na pasta `dist`.

## Deploy na Vercel

O arquivo `vercel.json` já configura:

- instalação com `npm ci`;
- build com `npm run build`;
- publicação da pasta `dist`;
- fallback para `index.html`.

Na Vercel, importe o repositório GitHub e mantenha o framework **Vite**. Nenhuma variável de ambiente é necessária para a versão atual.
