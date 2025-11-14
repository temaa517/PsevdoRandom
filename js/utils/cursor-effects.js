// ===== МАГИЧЕСКИЙ КУРСОР ФОКУСНИКА =====

class MagicCursor {
    constructor() {
        this.cursor = null;
        this.isInitialized = false;
        this.mouseX = 0;
        this.mouseY = 0;
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
        // Основной курсор - шляпа фокусника
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
        // Движение курсора
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.moveCursor(e);
        });

        // Клики - магическая вспышка
        document.addEventListener('click', (e) => {
            this.onClick(e);
        });

        // Наведение на интерактивные элементы
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

    moveCursor(e) {
        // Основной курсор
        this.cursor.style.left = (this.mouseX - 12) + 'px';
        this.cursor.style.top = (this.mouseY - 12) + 'px';

    }


    onClick(e) {
        // Магическая вспышка при клике
        this.createMagicCircle(e.clientX, e.clientY);
        
        // Анимация шляпы
        this.cursor.style.transform = 'scale(1.3) rotate(15deg)';
        this.cursor.style.filter = 'drop-shadow(0 0 15px var(--neon-pink))';
        
        
        setTimeout(() => {
            this.cursor.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
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

    onHoverStart(element) {
        // Эффект при наведении - шляпа подпрыгивает
        this.cursor.style.transform = 'translateY(-8px) scale(1.2)';
        this.cursor.style.textShadow = '0 0 15px var(--acid-green)';
        
    }

    onHoverEnd() {
        // Возвращаем обычный вид
        this.cursor.style.transform = 'translateY(0) scale(1)';
        this.cursor.style.textShadow = '0 0 10px var(--neon-pink)';
    
    }

    isInteractive(element) {
        return element.matches('a, button, .video-card, .filter-btn, .mad-button, [onclick]') ||
               element.closest('a, button, .video-card, .filter-btn, .mad-button');
    }

    animate() {
        // Плавное плавание шляпы
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

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    window.magicCursor = new MagicCursor();
    document.body.style.cursor = 'none';
});