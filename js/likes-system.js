// ===== СИСТЕМА ЛАЙКОВ ДЛЯ УПОРОТЫХ ФОКУСОВ =====
// Каждому пользователю (браузеру) разрешён один голос за видео: лайк ИЛИ дизлайк.

class LikesSystem {
    constructor() {
        this.userId = this.ensureUserId();
        this.baseCounts = this.loadBaseCounts();
        this.userVotes = this.loadUserVotes();
        this.init();
    }

    init() {
        console.log('👍 Система лайков инициализирована!');
        this.updateAllLikeCounts();
    }

    ensureUserId() {
        let userId = localStorage.getItem('madUserId');
        if (!userId) {
            userId = `user-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
            localStorage.setItem('madUserId', userId);
        }
        return userId;
    }

    loadBaseCounts() {
        // Чистим старое хранилище если оно осталось
        localStorage.removeItem('madLikes');

        const saved = localStorage.getItem('madLikesBase');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.warn('Не удалось прочитать сохранённые лайки, сбрасываем.', e);
            }
        }

        const defaults = this.generateDefaultCounts();
        localStorage.setItem('madLikesBase', JSON.stringify(defaults));
        return defaults;
    }

    generateDefaultCounts() {
        // Базовые цифры ~10 лайков и 3-4 дизлайка на каждое видео
        return {
            1: { likes: 10, dislikes: 3 },
            2: { likes: 10, dislikes: 4 },
            3: { likes: 10, dislikes: 3 },
            4: { likes: 10, dislikes: 3 },
            5: { likes: 10, dislikes: 4 },
            6: { likes: 10, dislikes: 3 },
            7: { likes: 10, dislikes: 4 },
            8: { likes: 10, dislikes: 3 },
            9: { likes: 10, dislikes: 4 },
            10: { likes: 10, dislikes: 3 },
            11: { likes: 10, dislikes: 3 },
            12: { likes: 10, dislikes: 4 },
            13: { likes: 10, dislikes: 3 },
            14: { likes: 10, dislikes: 4 },
            15: { likes: 10, dislikes: 3 },
        };
    }

    loadUserVotes() {
        const saved = localStorage.getItem('madUserVotes');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.warn('Не удалось прочитать пользовательские голоса, сбрасываем.', e);
            }
        }
        return {};
    }

    saveUserVotes() {
        localStorage.setItem('madUserVotes', JSON.stringify(this.userVotes));
    }

    getVideoStats(videoId) {
        const base = this.baseCounts[videoId] || { likes: 10, dislikes: 3 };
        const userRating = this.userVotes[videoId] || null;

        return {
            likes: base.likes + (userRating === 'liked' ? 1 : 0),
            dislikes: base.dislikes + (userRating === 'disliked' ? 1 : 0),
            userRating,
        };
    }

    likeVideo(videoId) {
        const current = this.userVotes[videoId];

        // Один голос на пользователя: повторный клик по лайку ничего не меняет
        if (current === 'liked') {
            return this.getVideoStats(videoId);
        }

        this.userVotes[videoId] = 'liked';
        this.saveUserVotes();

        this.updateVideoLikeDisplay(videoId);
        this.checkAchievements();

        if (window.soundManager) {
            window.soundManager.play('like', { volume: 0.3 });
        }

        return this.getVideoStats(videoId);
    }

    dislikeVideo(videoId) {
        const current = this.userVotes[videoId];

        // Один голос на пользователя: повторный клик по дизлайку ничего не меняет
        if (current === 'disliked') {
            return this.getVideoStats(videoId);
        }

        this.userVotes[videoId] = 'disliked';
        this.saveUserVotes();

        this.updateVideoLikeDisplay(videoId);

        if (window.soundManager) {
            window.soundManager.play('dislike', { volume: 0.3 });
        }

        return this.getVideoStats(videoId);
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

            this.updateButtonStyles(likeBtn, dislikeBtn, stats.userRating);
        }

        this.updateCardLikeDisplay(videoId);
    }

    updateButtonStyles(likeBtn, dislikeBtn, userRating) {
        if (!likeBtn || !dislikeBtn) return;

        likeBtn.style.background = 'transparent';
        likeBtn.style.color = 'var(--acid-green)';
        dislikeBtn.style.background = 'transparent';
        dislikeBtn.style.color = 'var(--neon-pink)';

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
        document.querySelectorAll('.video-card').forEach(card => {
            const videoId = parseInt(card.dataset.id, 10);
            if (videoId) {
                this.updateCardLikeDisplay(videoId);
            }
        });
    }

    checkAchievements() {
        const totalLikes = Object.values(this.userVotes).reduce(
            (sum, vote) => sum + (vote === 'liked' ? 1 : 0),
            0
        );

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
                icon: '👍',
            },
            super_critic: {
                title: '🏆 СУПЕР-КРИТИК',
                description: 'Поставил 10 лайков! Ты гуру безумных фокусов!',
                icon: '🏆',
            },
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

        setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 3000);
    }

    getPopularVideos() {
        return Object.entries(this.baseCounts)
            .map(([id, base]) => {
                const stats = this.getVideoStats(Number(id));
                return [id, stats.likes, base];
            })
            .sort(([, likesA], [, likesB]) => likesB - likesA)
            .slice(0, 5);
    }

    getUserStats() {
        const ratedVideos = Object.values(this.userVotes).filter(Boolean).length;
        const totalLikes = Object.values(this.userVotes).reduce(
            (sum, vote) => sum + (vote === 'liked' ? 1 : 0),
            0
        );

        return {
            ratedVideos,
            totalLikes,
            completion: Math.round((ratedVideos / Object.keys(this.baseCounts).length) * 100),
        };
    }
}

// Глобальный экземпляр
window.likesSystem = new LikesSystem();