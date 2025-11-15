// ===== МАГИЧЕСКИЙ КУРСОР ФОКУСНИКА С ЗВУКАМИ =====

class MagicCursor {
    constructor() {
        this.cursor = null;
        this.isInitialized = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.lastPlayTime = 0; // Для ограничения частоты звуков
        this.soundCooldown = 100; // Минимальная задержка между звуками (мс)
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.createCursor();
        this.bindEvents();
        this.animate();
        
        this.isInitialized = true;
        console.log('🎩 Магический курсор активирован!');
    }

    createCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'magic-cursor';
        this.cursor.innerHTML = '🎩';
        this.cursor.style.cssText = `
            position: fixed;
            font-size: 24px;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));
            text-shadow: 0 0 10px var(--neon-pink);
        `;
        document.body.appendChild(this.cursor);
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.moveCursor(e);
            this.observeModals();
        });

        document.addEventListener('click', (e) => {
            this.onClick(e);
        });

        document.addEventListener('mouseover', (e) => {
            if (this.isInteractive(e.target)) {
                this.onHoverStart(e.target);
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (this.isInteractive(e.target)) {
                this.onHoverEnd();
            }
        });

        document.addEventListener('mouseleave', () => this.hide());
        document.addEventListener('mouseenter', () => this.show());
    }
    observeModals() {
            // Наблюдатель за появлением модальных окон
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            if (node.classList && (
                                node.classList.contains('video-modal') ||
                                node.classList.contains('epilepsy-warning') ||
                                node.classList.contains('modal')
                            )) {
                                this.show(); // Показываем курсор в модалке
                            }
                        }
                    });
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    moveCursor(e) {
        this.cursor.style.left = (this.mouseX - 12) + 'px';
        this.cursor.style.top = (this.mouseY - 12) + 'px';
        
        // Случайные звуки при движении (редко)
        if (Math.random() > 0.995 && this.canPlaySound()) {
            this.playSound('whoosh', { volume: 0.1, rate: 0.8 + Math.random() * 0.4 });
        }
        this.checkModalInteraction(e);
    }

    onClick(e) {
        // Визуальные эффекты
        this.createMagicCircle(e.clientX, e.clientY);
        this.cursor.style.transform = 'scale(1.3) rotate(15deg)';
        this.cursor.style.filter = 'drop-shadow(0 0 15px var(--neon-pink))';
        
        // Звук клика
        this.playSound('click', { 
            volume: 0.4,
            rate: 0.9 + Math.random() * 0.2 // Случайная высота тона
        });

        setTimeout(() => {
            this.cursor.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    }

    checkModalInteraction(e) {
            const modal = document.querySelector('.video-modal, .epilepsy-warning, .modal');
            if (modal && modal.style.display !== 'none') {
                // Курсор над модалкой - применяем стили для модалки
                this.cursor.style.zIndex = '10001'; // Выше модалки
            } else {
                // Обычная страница
                this.cursor.style.zIndex = '9999';
            }
        }

    onHoverStart(element) {
        this.cursor.style.transform = 'translateY(-8px) scale(1.2)';
        this.cursor.style.textShadow = '0 0 15px var(--acid-green)';
        
        // Звук при наведении на интерактивный элемент
        this.playSound('spell', { 
            volume: 0.3,
            rate: 1.2 // Более высокий тон для "магического" ощущения
        });
    }

    onHoverEnd() {
        this.cursor.style.transform = 'translateY(0) scale(1)';
        this.cursor.style.textShadow = '0 0 10px var(--neon-pink)';
    }

    createMagicCircle(x, y) {
        const circle = document.createElement('div');
        circle.className = 'magic-circle';
        circle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            border: 2px solid var(--acid-green);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(circle);

        let size = 20;
        const grow = () => {
            size += 8;
            circle.style.width = size + 'px';
            circle.style.height = size + 'px';
            circle.style.opacity = 1 - (size - 20) / 80;
            circle.style.borderWidth = (2 - (size - 20) / 40) + 'px';

            if (size < 100) {
                requestAnimationFrame(grow);
            } else {
                if (circle.parentNode) {
                    circle.parentNode.removeChild(circle);
                }
            }
        };

        grow();
    }

    playSound(name, options = {}) {
        if (!this.canPlaySound()) return;
        
        if (window.soundManager) {
            window.soundManager.play(name, options);
            this.lastPlayTime = Date.now();
        }
    }

    canPlaySound() {
        return Date.now() - this.lastPlayTime > this.soundCooldown;
    }

    isInteractive(element) {
        const interactiveSelectors = 'a, button, .video-card, .filter-btn, .mad-button, [onclick], .close-video, .reveal-btn, .like-btn, .dislike-btn, .play-pause, .progress-container';
        
        return element.matches(interactiveSelectors) ||
               element.closest(interactiveSelectors);
    }

    animate() {
        const float = () => {
            if (this.cursor) {
                const floatY = Math.sin(Date.now() * 0.003) * 3;
                this.cursor.style.transform = `translateY(${floatY}px)`;
            }
            requestAnimationFrame(float);
        };
        float();
    }

    hide() {
        this.cursor.style.opacity = '0';
    }

    show() {
        this.cursor.style.opacity = '1';
    }

    destroy() {
        if (this.cursor && this.cursor.parentNode) {
            this.cursor.parentNode.removeChild(this.cursor);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.magicCursor = new MagicCursor();
    document.body.style.cursor = 'none';
});