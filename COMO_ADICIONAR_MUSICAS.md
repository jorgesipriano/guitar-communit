# Como Adicionar Músicas ao Repertório 🎵

Este guia explica como você pode adicionar novas músicas, cifras e links na seção "Repertório" do site **Adoração Cristã**.

## Passo a Passo

Como o site é construído em HTML simples, você precisará editar o arquivo `index.html`.

### 1. Encontre a Seção de Repertório
Abra o arquivo `index.html` e procure por `<!-- Repertoire Section -->`.
Dentro dela, você verá uma lista de músicas dentro de `<div class="repertoire-grid">`.

### 2. Copie o Modelo de uma Música
Cada música é um bloco de código parecido com este:

```html
<!-- Song Card -->
<div class="song-card">
    <span class="song-tag">Adoração</span>
    <h3 class="song-title">Nome da Música</h3>
    <p class="song-artist">Nome do Artista</p>
    <div class="song-actions">
        <!-- Link da Cifra -->
        <a href="LINK_DA_CIFRA_AQUI" target="_blank" class="btn-icon" title="Ver Cifra">
            <i data-lucide="music-2"></i>
        </a>
        <!-- Link do YouTube/Spotify -->
        <a href="LINK_DO_VIDEO_AQUI" target="_blank" class="btn-icon" title="Ouvir">
            <i data-lucide="play"></i>
        </a>
        <button class="btn-icon" title="Salvar"><i data-lucide="bookmark"></i></button>
    </div>
</div>
```

### 3. Adicione a Nova Música
1.  Copie o código acima.
2.  Cole logo após a última música existente (mas antes do fechamento `</div>` da `repertoire-grid`).
3.  **Edite as informações:**
    *   **Tag:** Mude `<span class="song-tag">Adoração</span>` para o tema desejado (ex: Júbilo, Comunhão).
    *   **Título:** Mude `<h3 class="song-title">Nome da Música</h3>`.
    *   **Artista:** Mude `<p class="song-artist">Nome do Artista</p>`.
    *   **Links:**
        *   No `href="..."` do primeiro `<a>`, coloque o link do Cifra Club ou similar.
        *   No `href="..."` do segundo `<a>`, coloque o link do YouTube ou Spotify.

### Exemplo Prático

Se você quiser adicionar "Ousado Amor":

```html
<div class="song-card">
    <span class="song-tag">Adoração</span>
    <h3 class="song-title">Ousado Amor</h3>
    <p class="song-artist">Isaías Saad</p>
    <div class="song-actions">
        <a href="https://www.cifraclub.com.br/isaias-saad/ousado-amor/" target="_blank" class="btn-icon" title="Ver Cifra">
            <i data-lucide="music-2"></i>
        </a>
        <a href="https://www.youtube.com/watch?v=..." target="_blank" class="btn-icon" title="Ouvir">
            <i data-lucide="play"></i>
        </a>
        <button class="btn-icon" title="Salvar"><i data-lucide="bookmark"></i></button>
    </div>
</div>
```

## Dica
Sempre que fizer uma alteração, salve o arquivo `index.html` e faça o upload para o GitHub (ou use os comandos `git add`, `git commit`, `git push`) para que o site atualize.
