// ===== ПСИХОДЕЛИЧЕСКИЕ ЭФФЕКТЫ ДЛЯ БЕЗУМНОГО РЕЖИМА =====

class PsychedelicEffects {
    constructor() {
        this.isActive = false;
        this.flashIntervals = [];
        this.elements = [];
        this.init();
    }

    init() {
        console.log('🌈 Психоделические эффекты загружены!');
    }

    enable() {
        if (this.isActive) return;
        this.isActive = true;
        
        console.log('🌀 ВКЛЮЧАЕМ ПСИХОДЕЛИЧЕСКИЙ РЕЖИМ!');
        
        // Запускаем все эффекты
        this.startRandomFlashes();
        this.startScreenFlashes();
        this.startTextEffects();
        this.startBackgroundEffects();
        this.startElementWobble();
        this.startColorCycling();
        this.startParticleStorm();
        
        // Добавляем звуковые эффекты
        this.startSoundEffects();
    }

    disable() {
        if (!this.isActive) return;
        this.isActive = false;
        
        console.log('😵 Выключаем психоделические эффекты');
        
        // Останавливаем все интервалы
        this.flashIntervals.forEach(interval => clearInterval(interval));
        this.flashIntervals = [];
        
        // Удаляем все созданные элементы
        this.elements.forEach(element => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        this.elements = [];
        
        // Восстанавливаем нормальные стили
        this.restoreNormalStyles();
    }

    // Случайные вспышки по всему экрану
    startRandomFlashes() {
        const flashInterval = setInterval(() => {
            if (!this.isActive) return;
            
            this.createRandomFlash();
        }, 300); // Вспышки каждые 300ms
        
        this.flashIntervals.push(flashInterval);
    }

    createRandomFlash() {
        const flash = document.createElement('div');
        flash.className = 'psychedelic-flash-random';
        
        const colors = [
            'radial-gradient(circle, #ff00ff 0%, transparent 70%)',
            'radial-gradient(circle, #00ffff 0%, transparent 70%)',
            'radial-gradient(circle, #ffff00 0%, transparent 70%)',
            'radial-gradient(circle, #39ff14 0%, transparent 70%)',
            'radial-gradient(circle, #ff6b35 0%, transparent 70%)',
            'radial-gradient(circle, #9d00ff 0%, transparent 70%)'
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomSize = 10 + Math.random() * 40;
        
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${randomColor};
            background-position: ${randomX}% ${randomY}%;
            background-size: ${randomSize}% ${randomSize}%;
            pointer-events: none;
            z-index: 9991;
            opacity: 0;
            mix-blend-mode: overlay;
        `;
        
        document.body.appendChild(flash);
        this.elements.push(flash);
        
        // Анимация вспышки
        this.animateRandomFlash(flash);
    }

    animateRandomFlash(flash) {
        let opacity = 0;
        const duration = 200 + Math.random() * 300;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                // Быстрое появление, быстрое исчезновение
                if (progress < 0.3) {
                    opacity = progress / 0.3;
                } else {
                    opacity = 1 - ((progress - 0.3) / 0.7);
                }
                
                flash.style.opacity = opacity;
                requestAnimationFrame(animate);
            } else {
                if (flash.parentNode) {
                    flash.parentNode.removeChild(flash);
                }
                this.elements = this.elements.filter(el => el !== flash);
            }
        };
        
        animate();
    }

    // Полноэкранные вспышки
    startScreenFlashes() {
        const screenFlashInterval = setInterval(() => {
            if (!this.isActive) return;
            if (Math.random() > 0.7) { // 30% шанс на большую вспышку
                this.createScreenFlash();
            }
        }, 1500);
        
        this.flashIntervals.push(screenFlashInterval);
    }

    createScreenFlash() {
        const flash = document.createElement('div');
        flash.className = 'psychedelic-screen-flash';
        
        const colors = [
            'linear-gradient(45deg, #ff00ff, #00ffff)',
            'linear-gradient(135deg, #ffff00, #ff00ff)',
            'linear-gradient(225deg, #39ff14, #ffff00)',
            'linear-gradient(315deg, #00ffff, #ff6b35)'
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${randomColor};
            pointer-events: none;
            z-index: 9990;
            opacity: 0;
            mix-blend-mode: overlay;
        `;
        
        document.body.appendChild(flash);
        this.elements.push(flash);
        
        // Анимация полноэкранной вспышки
        this.animateScreenFlash(flash);
    }

    animateScreenFlash(flash) {
        let opacity = 0;
        const duration = 500;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                if (progress < 0.2) {
                    opacity = progress / 0.2;
                } else if (progress < 0.5) {
                    opacity = 1;
                } else {
                    opacity = 1 - ((progress - 0.5) / 0.5);
                }
                
                flash.style.opacity = opacity * 0.3; // Полупрозрачная вспышка
                requestAnimationFrame(animate);
            } else {
                if (flash.parentNode) {
                    flash.parentNode.removeChild(flash);
                }
                this.elements = this.elements.filter(el => el !== flash);
            }
        };
        
        animate();
    }

    // Эффекты для текста
    startTextEffects() {
        const textInterval = setInterval(() => {
            if (!this.isActive) return;
            
            this.applyTextEffects();
        }, 100);
        
        this.flashIntervals.push(textInterval);
    }

    applyTextEffects() {
        const texts = document.querySelectorAll('h1, h2, h3, p, span, .video-title, .hero-title');
        
        texts.forEach(text => {
            if (Math.random() > 0.8) { // 20% шанс на эффект
                const hue = Math.random() * 360;
                const saturation = 100;
                const lightness = 50 + Math.random() * 30;
                
                text.style.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                text.style.textShadow = `
                    0 0 10px hsl(${hue}, ${saturation}%, ${lightness}%),
                    0 0 20px hsl(${hue}, ${saturation}%, ${lightness}%),
                    0 0 30px hsl(${hue}, ${saturation}%, ${lightness}%)
                `;
                
                // Возвращаем нормальный цвет через короткое время
                setTimeout(() => {
                    if (this.isActive) {
                        text.style.color = '';
                        text.style.textShadow = '';
                    }
                }, 200);
            }
        });
    }

    // Эффекты фона
    startBackgroundEffects() {
        const background = document.createElement('div');
        background.className = 'psychedelic-background-overlay';
        background.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -2;
            opacity: 0.1;
            mix-blend-mode: overlay;
        `;
        
        document.body.appendChild(background);
        this.elements.push(background);
        
        const backgroundInterval = setInterval(() => {
            if (!this.isActive) return;
            
            const hue = Math.random() * 360;
            background.style.background = `
                radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                hsl(${hue}, 100%, 50%) 0%, 
                hsl(${(hue + 120) % 360}, 100%, 50%) 50%, 
                transparent 70%)
            `;
        }, 500);
        
        this.flashIntervals.push(backgroundInterval);
    }

    // Дрожание элементов
    startElementWobble() {
        const wobbleInterval = setInterval(() => {
            if (!this.isActive) return;
            
            const elements = document.querySelectorAll('.video-card, .filter-btn, .mad-button');
            
            elements.forEach(element => {
                if (Math.random() > 0.7) {
                    const rotate = (Math.random() - 0.5) * 10;
                    const translateX = (Math.random() - 0.5) * 10;
                    const translateY = (Math.random() - 0.5) * 10;
                    
                    element.style.transform = `
                        rotate(${rotate}deg)
                        translate(${translateX}px, ${translateY}px)
                    `;
                    
                    setTimeout(() => {
                        if (this.isActive) {
                            element.style.transform = '';
                        }
                    }, 100);
                }
            });
        }, 200);
        
        this.flashIntervals.push(wobbleInterval);
    }

    // Цикличная смена цветов
    startColorCycling() {
        let hue = 0;
        
        const colorInterval = setInterval(() => {
            if (!this.isActive) return;
            
            hue = (hue + 2) % 360;
            
            // Применяем цветовой цикл к основным элементам
            document.documentElement.style.setProperty('--neon-pink', `hsl(${hue}, 100%, 50%)`);
            document.documentElement.style.setProperty('--electric-blue', `hsl(${(hue + 120) % 360}, 100%, 50%)`);
            document.documentElement.style.setProperty('--acid-green', `hsl(${(hue + 240) % 360}, 100%, 50%)`);
            
        }, 50);
        
        this.flashIntervals.push(colorInterval);
    }

    // Шторм частиц
    startParticleStorm() {
        const particleInterval = setInterval(() => {
            if (!this.isActive) return;
            if (Math.random() > 0.3) return; // 70% шанс пропустить создание частицы
            
            this.createParticle();
        }, 100);
        
        this.flashIntervals.push(particleInterval);
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'psychedelic-particle';
        
        const symbols = ['✨', '⭐', '💥', '🔆', '🎆', '🌠', '⚡', '🔮', '🎇'];
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        particle.textContent = randomSymbol;
        particle.style.cssText = `
            position: fixed;
            font-size: ${1 + Math.random() * 2}rem;
            left: ${Math.random() * 100}vw;
            top: -50px;
            pointer-events: none;
            z-index: 9992;
            opacity: ${0.5 + Math.random() * 0.5};
            animation: particleFall ${2 + Math.random() * 3}s linear forwards;
            filter: hue-rotate(${Math.random() * 360}deg);
        `;
        
        document.body.appendChild(particle);
        this.elements.push(particle);
        
        // Удаляем частицу после анимации
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
            this.elements = this.elements.filter(el => el !== particle);
        }, 5000);
    }

    // Звуковые эффекты
    startSoundEffects() {
        if (!window.soundManager) return;
        
        const soundInterval = setInterval(() => {
            if (!this.isActive) return;
            if (Math.random() > 0.9) { // 10% шанс на звук
                const sounds = ['flash', 'sparkle', 'magic'];
                const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
                
                window.soundManager.play(randomSound, {
                    volume: 0.1 + Math.random() * 0.2,
                    rate: 0.8 + Math.random() * 0.4
                });
            }
        }, 1000);
        
        this.flashIntervals.push(soundInterval);
    }

    restoreNormalStyles() {
        // Восстанавливаем нормальные цвета
        document.documentElement.style.removeProperty('--neon-pink');
        document.documentElement.style.removeProperty('--electric-blue');
        document.documentElement.style.removeProperty('--acid-green');
        
        // Восстанавливаем трансформации элементов
        const elements = document.querySelectorAll('.video-card, .filter-btn, .mad-button');
        elements.forEach(element => {
            element.style.transform = '';
        });
    }
}

// Глобальный экземпляр
window.psychedelicEffects = new PsychedelicEffects();