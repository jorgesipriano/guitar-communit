# Como subir seu projeto para o GitHub 🚀

Parece que o **Git** não está instalado ou configurado no seu computador (o comando `git` não foi reconhecido).

Você tem duas opções principais:

## Opção 1: Instalar o Git (Recomendado)

1.  **Baixe e Instale:**
    *   Acesse [git-scm.com](https://git-scm.com/downloads) e baixe a versão para Windows.
    *   Instale (pode ir clicando em "Next" nas opções padrão).

2.  **Configure seu usuário (no terminal/PowerShell):**
    ```bash
    git config --global user.name "Seu Nome"
    git config --global user.email "seu-email@exemplo.com"
    ```

3.  **Suba o projeto:**
    Abra o terminal na pasta do projeto (`c:\Users\User-PC\.gemini\antigravity\scratch\guitar-community`) e rode:

    ```bash
    git init
    git add .
    git commit -m "Meu projeto de violão"
    git branch -M main
    ```

4.  **Conecte com o GitHub:**
    *   Crie um **novo repositório** no site do GitHub (sem marcar "Initialize with README").
    *   Copie o link do repositório (algo como `https://github.com/seu-usuario/guitar-community.git`).
    *   Rode no terminal:
        ```bash
        git remote add origin https://github.com/seu-usuario/guitar-community.git
        git push -u origin main
        ```

---

## Opção 2: Upload Manual (Sem instalar nada)

Se não quiser instalar o Git agora, você pode fazer tudo pelo navegador:

1.  Crie um novo repositório no [GitHub](https://github.com/new).
2.  Na tela inicial do repositório, procure por um link ou botão dizendo **"uploading an existing file"**.
3.  Arraste todos os arquivos da sua pasta `guitar-community` para a área de upload no navegador.
4.  Clique em **"Commit changes"**.

> **Nota:** Eu já criei os arquivos `README.md` e `.gitignore` na sua pasta para deixar o projeto organizado!
