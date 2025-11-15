// ===== УПОРОТЫЙ ВИДЕО-ПЛЕЕР =====

class VideoPlayer {
    constructor() {
        this.modal = null;
        this.currentVideo = null;
        this.isPlaying = false;
        this.init();
    }

    init() {
        this.createModal();
        console.log('🎥 Упоротый видеоплеер загружен!');
    }

    createModal() {
        // Создаём модальное окно
        this.modal = document.createElement('div');
        this.modal.className = 'video-modal';
        this.modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            font-family: 'Comic Neue', cursive;
        `;

        this.modal.innerHTML = `
            <div class="video-modal-content" style="
                background: var(--dark-bg);
                border-radius: 20px;
                max-width: 900px;
                width: 95%;
                max-height: 90vh;
                overflow-y: auto;
                border: 3px solid var(--neon-pink);
                box-shadow: 0 0 50px var(--neon-pink);
                position: relative;
            ">
                <!-- Заголовок и кнопка закрытия -->
                <div class="video-header" style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem;
                    border-bottom: 2px dashed var(--electric-blue);
                ">
                    <h2 class="video-title" style="
                        color: var(--acid-green);
                        font-family: 'Comic Neue', cursive;
                        font-size: 1.8rem;
                        margin: 0;
                        text-shadow: 0 0 10px var(--acid-green);
                    "></h2>
                    <button class="close-video" style="
                        background: var(--neon-pink);
                        border: none;
                        color: white;
                        font-size: 1.5rem;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 0 15px var(--neon-pink);
                    ">×</button>
                </div>

                <!-- Видео контейнер -->
                <div class="video-container" style="
                    position: relative;
                    background: #000;
                ">
                    <video class="magic-video" style="
                        width: 100%;
                        height: auto;
                        display: block;
                    " controls>
                        Твой браузер не поддерживает видео 😢
                    </video>
                    
                    <!-- Кастомные контролы -->
                    <div class="custom-controls" style="
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: linear-gradient(transparent, rgba(0,0,0,0.8));
                        padding: 1rem;
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    ">
                        <button class="play-pause" style="
                            background: var(--electric-blue);
                            border: none;
                            color: white;
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            cursor: pointer;
                            font-size: 1.2rem;
                            box-shadow: 0 0 10px var(--electric-blue);
                        ">▶</button>
                        
                        <div class="progress-container" style="
                            flex: 1;
                            height: 6px;
                            background: rgba(255,255,255,0.3);
                            border-radius: 3px;
                            cursor: pointer;
                            position: relative;
                        ">
                            <div class="progress-bar" style="
                                height: 100%;
                                background: var(--acid-green);
                                border-radius: 3px;
                                width: 0%;
                                box-shadow: 0 0 10px var(--acid-green);
                            "></div>
                        </div>
                        
                        <div class="time-display" style="
                            color: white;
                            font-family: 'Comic Neue', cursive;
                            font-size: 0.9rem;
                            min-width: 100px;
                        ">00:00 / 00:00</div>
                    </div>
                </div>

                <!-- Информация о фокусе -->
                <div class="video-info" style="
                    padding: 1.5rem;
                ">
                    <div class="video-meta" style="
                        display: flex;
                        gap: 2rem;
                        margin-bottom: 1rem;
                        flex-wrap: wrap;
                    ">
                        <span class="video-category" style="
                            background: var(--mad-purple);
                            padding: 0.3rem 1rem;
                            border-radius: 20px;
                            color: white;
                            font-size: 0.9rem;
                        "></span>
                        <span class="video-difficulty" style="
                            background: var(--crazy-orange);
                            padding: 0.3rem 1rem;
                            border-radius: 20px;
                            color: white;
                            font-size: 0.9rem;
                        "></span>
                        <span class="video-views" style="
                            color: var(--electric-blue);
                            font-size: 0.9rem;
                        "></span>
                    </div>
                    
                    <p class="video-description" style="
                        color: #ccc;
                        line-height: 1.6;
                        margin-bottom: 1.5rem;
                    "></p>

                    <!-- Кнопка разоблачения -->
                    <div class="reveal-section">
                        <button class="reveal-btn" style="
                            background: linear-gradient(45deg, var(--neon-pink), var(--mad-purple));
                            border: none;
                            color: white;
                            padding: 1rem 2rem;
                            border-radius: 25px;
                            cursor: pointer;
                            font-family: 'Comic Neue', cursive;
                            font-weight: bold;
                            font-size: 1.1rem;
                            box-shadow: 0 0 20px var(--neon-pink);
                            transition: all 0.3s ease;
                            margin-bottom: 1.5rem;
                        ">🎩 РАЗОБЛАЧИТЬ ФОКУС!</button>
                        
                        <div class="tutorial-content" style="
                            display: none;
                            background: rgba(255,255,255,0.1);
                            padding: 1.5rem;
                            border-radius: 15px;
                            border-left: 4px solid var(--acid-green);
                        ">
                            <h3 class="tutorial-title" style="
                                color: var(--acid-green);
                                margin-bottom: 1rem;
                                font-family: 'Comic Neue', cursive;
                            "></h3>
                            <ol class="tutorial-steps" style="
                                color: #ccc;
                                line-height: 1.8;
                                padding-left: 1.5rem;
                            "></ol>
                        </div>
                    </div>

                    <!-- Лайки и комменты -->
                    <div class="video-actions" style="
                        display: flex;
                        gap: 1rem;
                        margin-top: 1.5rem;
                        padding-top: 1.5rem;
                        border-top: 1px dashed var(--electric-blue);
                    ">
                        <button class="like-btn" style="
                            background: transparent;
                            border: 2px solid var(--acid-green);
                            color: var(--acid-green);
                            padding: 0.5rem 1rem;
                            border-radius: 20px;
                            cursor: pointer;
                            font-family: 'Comic Neue', cursive;
                            transition: all 0.3s ease;
                        ">🤯 Мозг взорван (<span class="likes-count">0</span>)</button>
                        
                        <button class="dislike-btn" style="
                            background: transparent;
                            border: 2px solid var(--neon-pink);
                            color: var(--neon-pink);
                            padding: 0.5rem 1rem;
                            border-radius: 20px;
                            cursor: pointer;
                            font-family: 'Comic Neue', cursive;
                            transition: all 0.3s ease;
                        ">😐 Мозг не взорван (<span class="dislikes-count">0</span>)</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(this.modal);
        this.bindEvents();
    }

    bindEvents() {
        // Кнопка закрытия
        this.modal.querySelector('.close-video').addEventListener('click', () => {
            this.close();
        });

        // Закрытие по клику вне модалки
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Кнопка разоблачения
        this.modal.querySelector('.reveal-btn').addEventListener('click', () => {
            this.toggleTutorial();
        });

        // Кнопки лайков
        this.modal.querySelector('.like-btn').addEventListener('click', () => {
            this.handleLike();
        });

        this.modal.querySelector('.dislike-btn').addEventListener('click', () => {
            this.handleDislike();
        });

        // Управление видео
        this.setupVideoControls();
    }

    setupVideoControls() {
        const video = this.modal.querySelector('.magic-video');
        const playPauseBtn = this.modal.querySelector('.play-pause');
        const progressBar = this.modal.querySelector('.progress-bar');
        const progressContainer = this.modal.querySelector('.progress-container');
        const timeDisplay = this.modal.querySelector('.time-display');
        const controls = this.modal.querySelector('.custom-controls');

        // Показ/скрытие контролов
        video.addEventListener('mouseenter', () => {
            controls.style.opacity = '1';
        });

        video.addEventListener('mouseleave', () => {
            if (!this.isPlaying) {
                controls.style.opacity = '0';
            }
        });

        // Play/Pause
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = '❚❚';
                this.isPlaying = true;
            } else {
                video.pause();
                playPauseBtn.textContent = '▶';
                this.isPlaying = false;
            }
        });

        // Прогресс бар
        video.addEventListener('timeupdate', () => {
            const percent = (video.currentTime / video.duration) * 100;
            progressBar.style.width = percent + '%';
            
            timeDisplay.textContent = 
                this.formatTime(video.currentTime) + ' / ' + 
                this.formatTime(video.duration);
        });

        // Клик по прогресс бару
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            video.currentTime = percent * video.duration;
        });
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    open(videoData) {
        this.currentVideo = videoData;
        this.updateModalContent(videoData);
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
        
        // Автовоспроизведение
        setTimeout(() => {
            const video = this.modal.querySelector('.magic-video');
            video.play().catch(e => console.log('Автовоспроизведение заблокировано'));
        }, 300);
    }

    close() {
        const video = this.modal.querySelector('.magic-video');
        video.pause();
        video.currentTime = 0;
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Возвращаем скролл
        this.isPlaying = false;
    }

    updateModalContent(videoData) {
        // Заголовок
        this.modal.querySelector('.video-title').textContent = videoData.title;
        
        // Видео
        const video = this.modal.querySelector('.magic-video');
        video.src = videoData.videoUrl;
        video.poster = videoData.previewImage;
        
        // Мета-информация
        this.modal.querySelector('.video-category').textContent = this.getCategoryName(videoData.category);
        this.modal.querySelector('.video-difficulty').textContent = this.getDifficultyText(videoData.difficulty);
        this.modal.querySelector('.video-views').textContent = `${videoData.stats.views.toLocaleString()} просмотров`;
        this.modal.querySelector('.video-description').textContent = videoData.description;
        
        // Лайки
        this.modal.querySelector('.likes-count').textContent = videoData.stats.likes;
        this.modal.querySelector('.dislikes-count').textContent = videoData.stats.dislikes;
        
        // Туториал
        this.modal.querySelector('.tutorial-title').textContent = videoData.tutorial.title;
        const stepsList = this.modal.querySelector('.tutorial-steps');
        stepsList.innerHTML = videoData.tutorial.steps.map(step => 
            `<li style="margin-bottom: 0.5rem;">${step}</li>`
        ).join('');
        
        // Скрываем туториал при открытии
        this.modal.querySelector('.tutorial-content').style.display = 'none';
        this.modal.querySelector('.reveal-btn').textContent = '🎩 РАЗОБЛАЧИТЬ ФОКУС!';
    }

    toggleTutorial() {
        const tutorial = this.modal.querySelector('.tutorial-content');
        const revealBtn = this.modal.querySelector('.reveal-btn');
        
        if (tutorial.style.display === 'none') {
            tutorial.style.display = 'block';
            revealBtn.textContent = '🙈 СКРЫТЬ СЕКРЕТ!';
            revealBtn.style.background = 'linear-gradient(45deg, var(--electric-blue), var(--acid-green))';
        } else {
            tutorial.style.display = 'none';
            revealBtn.textContent = '🎩 РАЗОБЛАЧИТЬ ФОКУС!';
            revealBtn.style.background = 'linear-gradient(45deg, var(--neon-pink), var(--mad-purple))';
        }
    }

    handleLike() {
        if (!this.currentVideo) return;
        
        this.currentVideo.stats.likes++;
        this.modal.querySelector('.likes-count').textContent = this.currentVideo.stats.likes;
        
        const btn = this.modal.querySelector('.like-btn');
        btn.style.background = 'var(--acid-green)';
        btn.style.color = 'black';
        
        // Сохраняем в LocalStorage
        this.saveRating('liked');
    }

    handleDislike() {
        if (!this.currentVideo) return;
        
        this.currentVideo.stats.dislikes++;
        this.modal.querySelector('.dislikes-count').textContent = this.currentVideo.stats.dislikes;
        
        const btn = this.modal.querySelector('.dislike-btn');
        btn.style.background = 'var(--neon-pink)';
        btn.style.color = 'white';
        
        // Сохраняем в LocalStorage
        this.saveRating('disliked');
    }

    saveRating(type) {
        if (!this.currentVideo) return;
        
        const ratings = JSON.parse(localStorage.getItem('videoRatings') || '{}');
        ratings[this.currentVideo.id] = type;
        localStorage.setItem('videoRatings', JSON.stringify(ratings));
    }

    getCategoryName(category) {
        const categories = {
            'food': '🍕 С ЕДОЙ',
            'home': '🏠 ДЛЯ ДОМА', 
            'danger': '⚠️ ОПАСНО',
            'wtf': '🤯 WTF'
        };
        return categories[category] || category;
    }

    getDifficultyText(difficulty) {
        const levels = {
            'easy': '🤪 ЛЕГКО',
            'medium': '😅 СРЕДНЕ',
            'hard': '🤯 СЛОЖНО'
        };
        return levels[difficulty] || difficulty;
    }
}

// Глобальный экземпляр
window.videoPlayer = new VideoPlayer();