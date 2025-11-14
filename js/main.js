// Инициализация безумного сайта
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎩 Упоротые фокусы инициализированы!');
    
    // Загрузка демо-видео
    loadDemoVideos();
    
    // Инициализация кнопок
    initButtons();
    
    // Инициализация фильтров
    initFilters();
});

// Загрузка демо-видео (временно)
function loadDemoVideos() {
    const videosGrid = document.getElementById('videos-grid');
    
    const demoVideos = [
        {
            id: 1,
            title: "Исчезновение пальца на руке",
            category: "wtf",
            description: "Магическое исчезновение части тела",
            difficulty: "easy",
            duration: "00:20"
        },
        {
            id: 2,
            title: "Фокус с исчезновением печенья",
            category: "food", 
            description: "Магическое исчезновение съедобного артефакта",
            difficulty: "easy",
            duration: "00:30"
        },
        {
            id: 3,
            title: "Банан вместо телефона",
            category: "food",
            description: "Звонки через фрукт - это реально!",
            difficulty: "hard",
            duration: "02:15"
        },
        {
            id: 4,
            title: "Опасное жонглирование яйцами",
            category: "danger",
            description: "Яйца летают, мозг закипает!",
            difficulty: "hard",
            duration: "01:45"
        }
    ];

    videosGrid.innerHTML = demoVideos.map(video => `
        <div class="video-card" data-category="${video.category}">
            <div class="video-thumbnail">
                <div class="video-duration">${video.duration}</div>
                <div class="video-overlay">
                    <span class="play-icon">▶</span>
                </div>
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <p class="video-description">${video.description}</p>
                <div class="video-meta">
                    <span class="difficulty ${video.difficulty}">${getDifficultyText(video.difficulty)}</span>
                    <span class="category">${video.category}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function getDifficultyText(difficulty) {
    const levels = {
        easy: "🤪 Легко",
        medium: "😅 Средне", 
        hard: "🤯 Сложно"
    };
    return levels[difficulty] || "🤔 Неизвестно";
}

function initButtons() {
    // Кнопка случайного фокуса
    document.getElementById('watch-random').addEventListener('click', function() {
        const cards = document.querySelectorAll('.video-card');
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        randomCard.style.animation = 'madHighlight 1s ease';
        setTimeout(() => {
            randomCard.style.animation = '';
        }, 1000);
        alert('🎩 Случайный фокус: ' + randomCard.querySelector('.video-title').textContent);
    });

    // Кнопка безумного режима
    document.getElementById('mad-mode').addEventListener('click', function() {
        document.body.classList.toggle('ultra-mad');
        this.textContent = document.body.classList.contains('ultra-mad') 
            ? 'НОРМАЛЬНЫЙ РЕЖИМ' 
            : 'БЕЗУМНЫЙ РЕЖИМ';
    });
}

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterBtns.forEach(b => b.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterVideos(filter);
        });
    });
}

function filterVideos(filter) {
    const videos = document.querySelectorAll('.video-card');
    
    videos.forEach(video => {
        if (filter === 'all' || video.dataset.category === filter) {
            video.style.display = 'block';
            video.style.animation = 'appear 0.5s ease';
        } else {
            video.style.display = 'none';
        }
    });
}

// Добавляем CSS анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes madHighlight {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(5deg); box-shadow: 0 0 30px var(--neon-pink); }
        100% { transform: scale(1) rotate(0deg); }
    }
    
    @keyframes appear {
        from { opacity: 0; transform: translateY(20px) rotate(-5deg); }
        to { opacity: 1; transform: translateY(0) rotate(0deg); }
    }
    
    .ultra-mad .floating-object {
        animation-duration: 5s !important;
        opacity: 0.3 !important;
    }
    
    .video-card {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        padding: 1rem;
        border: 2px solid transparent;
        transition: all 0.3s ease;
        transform: rotate(-1deg);
    }
    
    .video-card:hover {
        transform: rotate(2deg) scale(1.05);
        border-color: var(--electric-blue);
        box-shadow: 0 0 20px var(--electric-blue);
    }
    
    .video-thumbnail {
        background: linear-gradient(45deg, var(--mad-purple), var(--neon-pink));
        height: 200px;
        border-radius: 10px;
        position: relative;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
    }
    
    .video-duration {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0,0,0,0.7);
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 0.8rem;
    }
    
    .video-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: 10px;
    }
    
    .video-card:hover .video-overlay {
        opacity: 1;
    }
    
    .play-icon {
        background: rgba(255,255,255,0.9);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
        font-size: 1.5rem;
    }
    
    .video-title {
        font-family: var(--font-comic);
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        color: var(--acid-green);
    }
    
    .video-description {
        color: #ccc;
        font-size: 0.9rem;
        margin-bottom: 1rem;
    }
    
    .video-meta {
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
    }
    
    .difficulty.easy { color: var(--acid-green); }
    .difficulty.medium { color: var(--electric-blue); }
    .difficulty.hard { color: var(--neon-pink); }
    
    .category {
        background: rgba(255,255,255,0.2);
        padding: 2px 8px;
        border-radius: 10px;
    }
    
    .videos-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        padding: 2rem 0;
    }
`;
document.head.appendChild(style);