// ===== СИСТЕМА ЛАЙКОВ ДЛЯ УПОРОТЫХ ФОКУСОВ =====

class LikesSystem {
    constructor() {
        this.likesData = this.loadLikesData();
        this.init();
    }

    init() {
        console.log('👍 Система лайков инициализирована!');
        this.updateAllLikeCounts();
    }

    loadLikesData() {
        const saved = localStorage.getItem('madLikes');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Начальные данные для демо-фокусов
        return {
            1: { likes: 892, dislikes: 15, userRating: null },
            2: { likes: 1245, dislikes: 23, userRating: null },
            3: { likes: 956, dislikes: 45, userRating: null },
            4: { likes: 2100, dislikes: 67, userRating: null },
            5: { likes: 3150, dislikes: 89, userRating: null },
            6: { likes: 1870, dislikes: 45, userRating: null },
            7: { likes: 4250, dislikes: 120, userRating: null },
            8: { likes: 2780, dislikes: 156, userRating: null },
            9: { likes: 5120, dislikes: 234, userRating: null },
            10: { likes: 7450, dislikes: 89, userRating: null },
            11: { likes: 9870, dislikes: 12, userRating: null }
        };
    }

    saveLikesData() {
        localStorage.setItem('madLikes', JSON.stringify(this.likesData));
    }

    getVideoStats(videoId) {
        if (!this.likesData[videoId]) {
            this.likesData[videoId] = { likes: 0, dislikes: 0, userRating: null };
        }
        return this.likesData[videoId];
    }

    likeVideo(videoId) {
        const stats = this.getVideoStats(videoId);
        
        // Если уже лайкнул - снимаем лайк
        if (stats.userRating === 'liked') {
            stats.likes--;
            stats.userRating = null;
        } else {
            // Если дизлайкнул - снимаем дизлайк и ставим лайк
            if (stats.userRating === 'disliked') {
                stats.dislikes--;
            }
            stats.likes++;
            stats.userRating = 'liked';
        }
        
        this.saveLikesData();
        this.updateVideoLikeDisplay(videoId);
        this.checkAchievements();
        
        // Воспроизводим звук
        if (window.soundManager) {
            window.soundManager.play('like', { volume: 0.3 });
        }
        
        return stats;
    }

    dislikeVideo(videoId) {
        const stats = this.getVideoStats(videoId);
        
        // Если уже дизлайкнул - снимаем дизлайк
        if (stats.userRating === 'disliked') {
            stats.dislikes--;
            stats.userRating = null;
        } else {
            // Если лайкнул - снимаем лайк и ставим дизлайк
            if (stats.userRating === 'liked') {
                stats.likes--;
            }
            stats.dislikes++;
            stats.userRating = 'disliked';
        }
        
        this.saveLikesData();
        this.updateVideoLikeDisplay(videoId);
        
        // Воспроизводим звук
        if (window.soundManager) {
            window.soundManager.play('dislike', { volume: 0.3 });
        }
        
        return stats;
    }

    updateVideoLikeDisplay(videoId) {
        const stats = this.getVideoStats(videoId);
        
        // Обновляем в модальном окне
        const modal = document.querySelector('.video-modal');
        if (modal && modal.style.display === 'flex') {
            const likesCount = modal.querySelector('.likes-count');
            const dislikesCount = modal.querySelector('.dislikes-count');
            const likeBtn = modal.querySelector('.like-btn');
            const dislikeBtn = modal.querySelector('.dislike-btn');
            
            if (likesCount) likesCount.textContent = stats.likes;
            if (dislikesCount) dislikesCount.textContent = stats.dislikes;
            
            // Обновляем стили кнопок
            this.updateButtonStyles(likeBtn, dislikeBtn, stats.userRating);
        }
        
        // Обновляем на главной странице
        this.updateCardLikeDisplay(videoId);
    }

    updateButtonStyles(likeBtn, dislikeBtn, userRating) {
        // Сбрасываем стили
        likeBtn.style.background = 'transparent';
        likeBtn.style.color = 'var(--acid-green)';
        dislikeBtn.style.background = 'transparent';
        dislikeBtn.style.color = 'var(--neon-pink)';
        
        // Применяем стили в зависимости от выбора пользователя
        if (userRating === 'liked') {
            likeBtn.style.background = 'var(--acid-green)';
            likeBtn.style.color = 'black';
        } else if (userRating === 'disliked') {
            dislikeBtn.style.background = 'var(--neon-pink)';
            dislikeBtn.style.color = 'white';
        }
    }

    updateCardLikeDisplay(videoId) {
        const card = document.querySelector(`.video-card[data-id="${videoId}"]`);
        if (card) {
            const stats = this.getVideoStats(videoId);
            const likesElement = card.querySelector('.likes');
            if (likesElement) {
                likesElement.textContent = `🤯 ${stats.likes}`;
            }
        }
    }

    updateAllLikeCounts() {
        // Обновляем все карточки на странице
        document.querySelectorAll('.video-card').forEach(card => {
            const videoId = parseInt(card.dataset.id);
            if (videoId) {
                this.updateCardLikeDisplay(videoId);
            }
        });
    }

    checkAchievements() {
        // Проверяем достижения
        const totalLikes = Object.values(this.likesData).reduce((sum, stats) => sum + (stats.userRating === 'liked' ? 1 : 0), 0);
        
        if (totalLikes >= 5) {
            this.unlockAchievement('critic');
        }
        
        if (totalLikes >= 10) {
            this.unlockAchievement('super_critic');
        }
    }

    unlockAchievement(achievementId) {
        const achievements = {
            critic: {
                title: '👍 КРИТИК',
                description: 'Поставил 5 лайков! Ты настоящий ценитель упоротости!',
                icon: '👍'
            },
            super_critic: {
                title: '🏆 СУПЕР-КРИТИК', 
                description: 'Поставил 10 лайков! Ты гуру безумных фокусов!',
                icon: '🏆'
            }
        };
        
        const achievement = achievements[achievementId];
        if (achievement && !localStorage.getItem(`achievement_${achievementId}`)) {
            this.showAchievementPopup(achievement);
            localStorage.setItem(`achievement_${achievementId}`, 'unlocked');
        }
    }

    showAchievementPopup(achievement) {
        const popup = document.createElement('div');
        popup.className = 'achievement-popup';
        popup.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, var(--neon-pink), var(--mad-purple));
            color: white;
            padding: 1.5rem;
            border-radius: 15px;
            border: 3px dashed #000;
            box-shadow: 0 0 30px var(--neon-pink);
            z-index: 10001;
            max-width: 300px;
            animation: achievementSlideIn 0.5s ease, achievementSlideOut 0.5s ease 2.5s forwards;
            font-family: 'Comic Neue', cursive;
        `;
        
        popup.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                <span style="font-size: 2rem;">${achievement.icon}</span>
                <strong style="font-size: 1.2rem;">${achievement.title}</strong>
            </div>
            <p style="margin: 0; font-size: 0.9rem;">${achievement.description}</p>
        `;
        
        document.body.appendChild(popup);
        
        // Автоудаление через 3 секунды
        setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 3000);
    }

    // Получение статистики для отображения
    getPopularVideos() {
        return Object.entries(this.likesData)
            .sort(([,a], [,b]) => b.likes - a.likes)
            .slice(0, 5);
    }

    getUserStats() {
        const ratedVideos = Object.values(this.likesData).filter(stats => stats.userRating).length;
        const totalLikes = Object.values(this.likesData).reduce((sum, stats) => sum + (stats.userRating === 'liked' ? 1 : 0), 0);
        
        return {
            ratedVideos,
            totalLikes,
            completion: Math.round((ratedVideos / Object.keys(this.likesData).length) * 100)
        };
    }
}

// Глобальный экземпляр
window.likesSystem = new LikesSystem();