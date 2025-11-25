document.addEventListener('DOMContentLoaded', () => {
    // State
    const state = {
        isLoggedIn: false,
        currentView: 'community'
    };

    // Elements
    const navCommunity = document.getElementById('nav-community');
    const navRepertoire = document.getElementById('nav-repertoire');
    const navLessons = document.getElementById('nav-lessons');
    const viewCommunity = document.getElementById('view-community');
    const viewRepertoire = document.getElementById('view-repertoire');
    const viewLogin = document.getElementById('view-login');
    const viewLessons = document.getElementById('view-lessons');
    const loginForm = document.getElementById('login-form');
    const btnLogout = document.getElementById('btn-logout');

    // Navigation Logic
    function switchView(viewName) {
        // Hide all views
        [viewCommunity, viewRepertoire, viewLogin, viewLessons].forEach(el => {
            el.classList.remove('active');
            setTimeout(() => {
                if (!el.classList.contains('active')) el.style.display = 'none';
            }, 500); // Wait for fade out
        });

        // Update Nav State
        navCommunity.classList.toggle('active', viewName === 'community');
        navRepertoire.classList.toggle('active', viewName === 'repertoire');
        navLessons.classList.toggle('active', viewName === 'lessons' || viewName === 'login');

        // Show target view
        let targetView;
        if (viewName === 'community') {
            targetView = viewCommunity;
        } else if (viewName === 'repertoire') {
            targetView = viewRepertoire;
        } else if (viewName === 'lessons') {
            targetView = state.isLoggedIn ? viewLessons : viewLogin;
        } else if (viewName === 'login') {
            targetView = viewLogin;
        }

        // Handle display block then opacity for fade in
        if (targetView) {
            targetView.style.display = 'block';
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                targetView.classList.add('active');
            }, 50);
        }

        state.currentView = viewName;
    }

    // Event Listeners
    navCommunity.addEventListener('click', () => switchView('community'));
    navRepertoire.addEventListener('click', () => switchView('repertoire'));

    navLessons.addEventListener('click', () => {
        if (state.isLoggedIn) {
            switchView('lessons');
        } else {
            switchView('login');
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Mock Login Success
        state.isLoggedIn = true;

        // Add loading effect or just switch
        const btn = loginForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Entrando...';

        setTimeout(() => {
            btn.innerText = originalText;
            switchView('lessons');
            loginForm.reset();
        }, 1000);
    });

    btnLogout.addEventListener('click', () => {
        state.isLoggedIn = false;
        switchView('community');
    });

    // Initial Render
    // Ensure correct initial display state
    viewLogin.style.display = 'none';
    viewLessons.style.display = 'none';

    // Helper to get initials
    function getInitials(name) {
        if (!name) return '?';
        return name
            .split(' ')
            .map(n => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    }

    // Global function for posting comments (attached to window for onclick access)
    window.postComment = function (postId) {
        const input = document.querySelector(`.comment-input[data-post-id="${postId}"]`);
        const nameInput = document.querySelector(`.name-input[data-post-id="${postId}"]`);

        const text = input.value.trim();
        const name = nameInput.value.trim() || 'Anônimo';
        const initials = getInitials(name);

        if (!text) return;

        const commentsList = document.getElementById(`comments-${postId}`);

        // Create Comment Element
        const commentEl = document.createElement('div');
        commentEl.className = 'comment';
        commentEl.innerHTML = `
            <div class="avatar small">${initials}</div>
            <div class="comment-content">
                <span class="comment-author">${name}</span>
                <p>${text}</p>
            </div>
        `;

        // Add to list with animation
        commentEl.style.opacity = '0';
        commentsList.appendChild(commentEl);

        // Trigger reflow
        void commentEl.offsetWidth;

        commentEl.style.transition = 'opacity 0.5s ease';
        commentEl.style.opacity = '1';

        // Clear input
        input.value = '';
    };

    // Allow "Enter" key to submit comments
    document.querySelectorAll('.comment-input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const postId = input.dataset.postId;
                window.postComment(postId);
            }
        });
    });

    // Create Post Logic
    const btnCreatePost = document.getElementById('btn-create-post');
    const newPostContent = document.getElementById('new-post-content');
    const newPostName = document.getElementById('new-post-name');
    const newPostTag = document.getElementById('new-post-tag');
    const newPostImage = document.getElementById('new-post-image');
    const newPostLink = document.getElementById('new-post-link');

    if (btnCreatePost) {
        btnCreatePost.addEventListener('click', () => {
            const text = newPostContent.value.trim();
            const name = newPostName.value.trim() || 'Anônimo';
            const tag = newPostTag.value;
            const imageUrl = newPostImage.value.trim();
            const linkUrl = newPostLink.value.trim();
            const initials = getInitials(name);

            if (!text && !imageUrl && !linkUrl) return;

            // Generate unique ID
            const postId = Date.now();

            // Build Media HTML
            let mediaHtml = '';
            if (imageUrl) {
                mediaHtml += `
                    <div class="post-media">
                        <img src="${imageUrl}" alt="Imagem do post" onerror="this.style.display='none'">
                    </div>
                `;
            }
            if (linkUrl) {
                mediaHtml += `
                    <a href="${linkUrl}" target="_blank" class="post-link-preview">
                        <i data-lucide="link"></i>
                        <span>${linkUrl}</span>
                    </a>
                `;
            }

            // Create Post HTML
            const postArticle = document.createElement('article');
            postArticle.className = 'post';
            postArticle.id = `post-${postId}`;
            postArticle.style.opacity = '0';
            postArticle.style.transform = 'translateY(-20px)';

            postArticle.innerHTML = `
                <div class="post-header">
                    <div class="user-info">
                        <div class="avatar">${initials}</div>
                        <div>
                            <span class="username">${name}</span>
                            <span class="date">Agora mesmo</span>
                        </div>
                    </div>
                    <span class="tag">${tag}</span>
                </div>
                <div class="post-content">
                    <h3>${tag === 'Dica' ? 'Nova Dica Compartilhada 💡' : tag === 'Pergunta' ? 'Dúvida da Comunidade ❓' : tag === 'Louvor' ? 'Louvor & Adoração 🙌' : 'Atualização 📢'}</h3>
                    <p>${text}</p>
                    ${mediaHtml}
                </div>
                <div class="post-actions">
                    <button class="action-btn"><i data-lucide="heart"></i> Curtir</button>
                    <button class="action-btn"><i data-lucide="message-circle"></i> Comentar</button>
                    <button class="action-btn"><i data-lucide="share-2"></i> Compartilhar</button>
                </div>
                <div class="comments-section">
                    <div class="comments-list" id="comments-${postId}">
                        <!-- Comments will go here -->
                    </div>
                    <div class="comment-input-wrapper">
                        <div class="avatar small">?</div>
                        <input type="text" class="name-input small" placeholder="Nome" data-post-id="${postId}">
                        <input type="text" placeholder="Escreva um comentário..." class="comment-input" data-post-id="${postId}">
                        <button class="btn-send" onclick="postComment(${postId})"><i data-lucide="send"></i></button>
                    </div>
                </div>
            `;

            // Insert after the create-post-card (which is the first child)
            const createPostCard = document.querySelector('.create-post-card');
            createPostCard.after(postArticle);

            // Re-initialize Lucide icons for the new elements
            lucide.createIcons();

            // Add event listener for the new comment input
            const newCommentInput = postArticle.querySelector('.comment-input');
            newCommentInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    window.postComment(postId);
                }
            });

            // Animation
            requestAnimationFrame(() => {
                postArticle.style.transition = 'all 0.5s ease';
                postArticle.style.opacity = '1';
                postArticle.style.transform = 'translateY(0)';
            });

            // Clear input
            newPostContent.value = '';
            newPostImage.value = '';
            newPostLink.value = '';
        });
    }

    // Repertoire Search Logic
    const searchInput = document.getElementById('repertoire-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const songs = document.querySelectorAll('.song-card');

            songs.forEach(song => {
                const title = song.querySelector('.song-title').textContent.toLowerCase();
                const artist = song.querySelector('.song-artist').textContent.toLowerCase();
                const tag = song.querySelector('.song-tag').textContent.toLowerCase();

                if (title.includes(searchTerm) || artist.includes(searchTerm) || tag.includes(searchTerm)) {
                    song.style.display = 'block';
                } else {
                    song.style.display = 'none';
                }
            });
        });
    }
});

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            }, err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
