// ===== РЕЖИМ ПОЛНОГО ВРАЩЕНИЯ ВСЕХ ЭЛЕМЕНТОВ =====
class CrazyExplosions {
    constructor() {
        this.isActive = false;
        this.intervals = [];
        this.elements = [];
        this.init();
    }

    init() {
        console.log('💥💥💥 ЗАГРУЖЕН РЕЖИМ ПОЛНОГО ВРАЩЕНИЯ!');
        this.addUltraStyles();
    }

    addUltraStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* ОСНОВНАЯ АНИМАЦИЯ ДЛЯ ВСЕХ ЭЛЕМЕНТОВ */
            .crazy-rotation-mode * {
                animation: crazyRotate 0.8s linear infinite !important;
                transform-origin: center !important;
            }
            
            /* АНИМАЦИЯ ВРАЩЕНИЯ */
            @keyframes crazyRotate {
                0% { 
                    transform: rotate(0deg) scale(1) !important; 
                }
                25% { 
                    transform: rotate(90deg) scale(1.2) !important; 
                }
                50% { 
                    transform: rotate(180deg) scale(0.8) !important; 
                }
                75% { 
                    transform: rotate(270deg) scale(1.3) !important; 
                }
                100% { 
                    transform: rotate(360deg) scale(1) !important; 
                }
            }
            
            /* ДОПОЛНИТЕЛЬНЫЕ СТИЛИ ДЛЯ РАЗНЫХ ТИПОВ ЭЛЕМЕНТОВ */
            .crazy-rotation-mode div {
                animation-duration: 1.2s !important;
            }
            
            .crazy-rotation-mode p, .crazy-rotation-mode span {
                animation-duration: 0.6s !important;
            }
            
            .crazy-rotation-mode h1, .crazy-rotation-mode h2, .crazy-rotation-mode h3 {
                animation-duration: 1.5s !important;
            }
            
            .crazy-rotation-mode img {
                animation-duration: 2s !important;
            }
            
            .crazy-rotation-mode button, .crazy-rotation-mode a {
                animation-duration: 0.7s !important;
            }
            
            /* АНИМАЦИИ ДЛЯ ЭФФЕКТОВ */
            @keyframes ultraVortexSpin {
                0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
                100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
            }
            
            @keyframes epilepticFlash {
                0%, 100% { opacity: 0; }
                50% { opacity: 1; }
            }
            
            @keyframes colorPulse {
                0% { opacity: 0; transform: scale(1); }
                50% { opacity: 0.6; transform: scale(1.1); }
                100% { opacity: 0; transform: scale(1); }
            }
            
            @keyframes particleFly {
                0% { 
                    transform: translate(-50%, -50%) scale(1) rotate(0deg);
                    opacity: 1;
                }
                100% { 
                    transform: translate(var(--target-x), var(--target-y)) scale(0) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        this.elements.push(style);
    }

    enable() {
        if (this.isActive) return;
        this.isActive = true;
        
        console.log('🌀🚀 АКТИВИРУЕМ РЕЖИМ ПОЛНОГО ВРАЩЕНИЯ!');
        
        // ГЛАВНОЕ - ВКЛЮЧАЕМ ВРАЩЕНИЕ ВСЕХ ЭЛЕМЕНТОВ
        this.activateFullRotation();
        
        // ДОПОЛНИТЕЛЬНЫЕ ЭФФЕКТЫ
        this.startUltraNuclearFlashes();
        this.startEpilepticBackground();
        this.startUltraScreenShake();
        this.startParticleStorm();
        this.startColorTsunami();
        this.startRandomTransformChaos();
        this.startBackgroundVortex();
    }

    // 🔄 ГЛАВНЫЙ МЕТОД - ВКЛЮЧАЕМ ВРАЩЕНИЕ ВСЕХ ЭЛЕМЕНТОВ
    activateFullRotation() {
        // ДОБАВЛЯЕМ КЛАСС К BODY - ЭТО ЗАСТАВИТ ВРАЩАТЬСЯ ВСЕ ЭЛЕМЕНТЫ
        document.body.classList.add('crazy-rotation-mode');
        
        // ДОПОЛНИТЕЛЬНО ПРИМЕНЯЕМ СТИЛИ К КАЖДОМУ ЭЛЕМЕНТУ
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            element.style.transformOrigin = 'center';
            element.style.willChange = 'transform';
        });
        
        console.log(`🌀 Вращение активировано для ${allElements.length} элементов!`);
    }

    // 🌟 ЯДЕРНЫЕ ВСПЫШКИ
    startUltraNuclearFlashes() {
        const flashInterval = setInterval(() => {
            if (!this.isActive) return;
            
            // ГАРАНТИРОВАННАЯ ВСПЫШКА
            this.createUltraNuclearFlash();
            
        }, 100);
        
        this.intervals.push(flashInterval);
    }

    createUltraNuclearFlash() {
        const flash = document.createElement('div');
        
        const colors = [
            'radial-gradient(circle, #ff0000 0%, transparent 70%)',
            'radial-gradient(circle, #00ff00 0%, transparent 70%)', 
            'radial-gradient(circle, #0000ff 0%, transparent 70%)',
            'radial-gradient(circle, #ffff00 0%, transparent 70%)',
            'radial-gradient(circle, #ff00ff 0%, transparent 70%)'
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        flash.style.cssText = `
            position: fixed;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            width: ${100 + Math.random() * 200}px;
            height: ${100 + Math.random() * 200}px;
            background: ${randomColor};
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            mix-blend-mode: screen;
            filter: brightness(2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(flash);
        this.elements.push(flash);
        
        // АНИМАЦИЯ
        let opacity = 0;
        const duration = 300;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                opacity = Math.sin(progress * Math.PI);
                flash.style.opacity = opacity * 0.7;
                flash.style.transform = `translate(-50%, -50%) scale(${1 + progress})`;
                requestAnimationFrame(animate);
            } else {
                if (flash.parentNode) flash.parentNode.removeChild(flash);
                this.elements = this.elements.filter(el => el !== flash);
            }
        };
        
        animate();
    }

    // 🌪️ ЭПИЛЕПТИЧЕСКИЙ ФОН
    startEpilepticBackground() {
        const bg = document.createElement('div');
        bg.className = 'epileptic-bg';
        
        bg.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff, #ffff00, #ff00ff, #00ffff);
            background-size: 400% 400%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.2;
            mix-blend-mode: overlay;
            animation: epilepticFlash 0.3s infinite;
        `;
        
        document.body.appendChild(bg);
        this.elements.push(bg);
        
        // АНИМАЦИЯ ГРАДИЕНТА
        let position = 0;
        const bgInterval = setInterval(() => {
            if (!this.isActive) return;
            position = (position + 10) % 100;
            bg.style.backgroundPosition = `${position}% ${position}%`;
        }, 100);
        
        this.intervals.push(bgInterval);
    }

    // 🌀 ТРЯСКА ЭКРАНА
    startUltraScreenShake() {
        const shakeInterval = setInterval(() => {
            if (!this.isActive) return;
            
            const shakeX = (Math.random() - 0.5) * 30;
            const shakeY = (Math.random() - 0.5) * 30;
            const rotate = (Math.random() - 0.5) * 10;
            
            document.body.style.transform = `translate(${shakeX}px, ${shakeY}px) rotate(${rotate}deg)`;
            
        }, 80);
        
        this.intervals.push(shakeInterval);
    }

    // 💫 ШТОРМ ЧАСТИЦ
    startParticleStorm() {
        const stormInterval = setInterval(() => {
            if (!this.isActive) return;
            
            // СОЗДАЕМ НЕСКОЛЬКО ВЗРЫВОВ
            const explosionCount = 1 + Math.floor(Math.random() * 3);
            for (let i = 0; i < explosionCount; i++) {
                setTimeout(() => this.createParticleExplosion(), i * 100);
            }
            
        }, 500);
        
        this.intervals.push(stormInterval);
    }

    createParticleExplosion() {
        const particleCount = 15 + Math.floor(Math.random() * 20);
        const centerX = Math.random() * window.innerWidth;
        const centerY = Math.random() * window.innerHeight;
        
        for (let i = 0; i < particleCount; i++) {
            this.createParticle(centerX, centerY);
        }
    }

    createParticle(centerX, centerY) {
        const particle = document.createElement('div');
        
        const symbols = ['💥','⭐','✨','🔥','⚡','🎆','🌈','💫'];
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 150;
        const targetX = centerX + Math.cos(angle) * distance;
        const targetY = centerY + Math.sin(angle) * distance;
        const duration = 800 + Math.random() * 800;
        
        particle.textContent = randomSymbol;
        particle.style.cssText = `
            position: fixed;
            font-size: ${1 + Math.random() * 2}rem;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 9998;
            opacity: 1;
            transform: translate(-50%, -50%);
            filter: brightness(2);
            text-shadow: 0 0 10px yellow;
            --target-x: ${targetX}px;
            --target-y: ${targetY}px;
            animation: particleFly ${duration}ms ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        this.elements.push(particle);
        
        setTimeout(() => {
            if (particle.parentNode) particle.parentNode.removeChild(particle);
            this.elements = this.elements.filter(el => el !== particle);
        }, duration);
    }

    // 🌊 ЦУНАМИ ЦВЕТА
    startColorTsunami() {
        const tsunamiInterval = setInterval(() => {
            if (!this.isActive) return;
            
            this.createColorWave();
            
        }, 1500);
        
        this.intervals.push(tsunamiInterval);
    }

    createColorWave() {
        const wave = document.createElement('div');
        
        const hue = Math.random() * 360;
        wave.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(45deg, 
                hsl(${hue}, 100%, 50%) 0%, 
                hsl(${(hue + 180) % 360}, 100%, 50%) 100%);
            pointer-events: none;
            z-index: 9990;
            opacity: 0;
            mix-blend-mode: hard-light;
            animation: colorPulse 2s ease-in-out;
        `;
        
        document.body.appendChild(wave);
        this.elements.push(wave);
        
        setTimeout(() => {
            if (wave.parentNode) wave.parentNode.removeChild(wave);
            this.elements = this.elements.filter(el => el !== wave);
        }, 2000);
    }

    // 🎪 СЛУЧАЙНЫЕ ТРАНСФОРМАЦИИ
    startRandomTransformChaos() {
        const chaosInterval = setInterval(() => {
            if (!this.isActive) return;
            
            const elements = document.querySelectorAll('*');
            const randomElements = Array.from(elements)
                .filter(() => Math.random() > 0.8) // 20% элементов
                .slice(0, 10); // максимум 10 элементов
            
            randomElements.forEach(element => {
                const skewX = (Math.random() - 0.5) * 30;
                const skewY = (Math.random() - 0.5) * 30;
                const scale = 0.5 + Math.random();
                
                element.style.transform += ` skew(${skewX}deg, ${skewY}deg) scale(${scale})`;
                
                // Возвращаем обратно через время
                setTimeout(() => {
                    if (this.isActive) {
                        element.style.transform = element.style.transform
                            .replace(` skew(${skewX}deg, ${skewY}deg)`, '')
                            .replace(` scale(${scale})`, '');
                    }
                }, 500);
            });
            
        }, 300);
        
        this.intervals.push(chaosInterval);
    }

    // 🌀 ВОРОНКА НА ФОНЕ
    startBackgroundVortex() {
        const vortex = document.createElement('div');
        vortex.className = 'crazy-vortex';
        
        vortex.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 200vmax;
            height: 200vmax;
            background: conic-gradient(
                from 0deg,
                #ff0000, #ff6b00, #ffd000, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000
            );
            pointer-events: none;
            z-index: -2;
            opacity: 0.1;
            mix-blend-mode: overlay;
            transform: translate(-50%, -50%);
            animation: ultraVortexSpin 3s linear infinite;
        `;
        
        document.body.appendChild(vortex);
        this.elements.push(vortex);
    }

    disable() {
        if (!this.isActive) return;
        this.isActive = false;
        
        console.log('🛑 Выключаем режим вращения...');
        
        // ОСТАНАВЛИВАЕМ ВСЁ
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
        
        // УДАЛЯЕМ ЭЛЕМЕНТЫ
        this.elements.forEach(element => {
            if (element.parentNode) element.parentNode.removeChild(element);
        });
        this.elements = [];
        
        // ВОССТАНАВЛИВАЕМ РАЗУМ
        this.restoreSanity();
    }

    restoreSanity() {
        // УБИРАЕМ КЛАСС ВРАЩЕНИЯ
        document.body.classList.remove('crazy-rotation-mode');
        document.body.style.transform = '';
        
        // ВОЗВРАЩАЕМ ВСЕ ЭЛЕМЕНТЫ В НОРМАЛЬНОЕ СОСТОЯНИЕ
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            element.style.transform = '';
            element.style.transformOrigin = '';
            element.style.willChange = '';
            element.style.animation = '';
        });
        
        console.log('✅ Все элементы остановлены!');
    }
}

// СРАЗУ СОЗДАЕМ И ЗАПУСКАЕМ
window.ultraCrazyExplosions = new UltraCrazyExplosions();

// АВТОМАТИЧЕСКИ ВКЛЮЧАЕМ ЧЕРЕЗ 1 СЕКУНДУ
setTimeout(() => {
    console.log('🚀 АВТОМАТИЧЕСКИЙ ЗАПУСК РЕЖИМА ВРАЩЕНИЯ!');
    window.ultraCrazyExplosions.enable();
}, 1000);