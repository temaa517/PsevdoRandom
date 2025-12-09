// ===== БЕЗУМНЫЙ РЕЖИМ - ОСНОВНАЯ ЛОГИКА =====

class MadMode {
    constructor() {
        this.isActive = false;
        this.madButton = document.getElementById('mad-mode');
        this.crazyObjects = [];
        this.flashInterval = null;
        this.flashElements = [];
        this.init();
    }

    init() {
        this.safetyModal = null;
        this.evasiveBtn = null;
        this.spectrumOverlay = null;
        this.madBackground = null;

        this.createSafetyModal();
        this.madButton.addEventListener('click', () => this.requestToggle());
        console.log('🎩 Безумный режим загружен и готов к упоротости!');
    }

    requestToggle() {
        if (this.isActive) {
            this.disable();
        } else {
            this.showSafetyModal();
        }
    }

     enable() {
        this.isActive = true;
        document.body.classList.add('ultra-mad', 'nuclear-mad'); // Добавляем nuclear-mad
        document.body.classList.add('hyper-mad');
        this.madButton.textContent = '💥🚨 ЯДЕРНЫЙ ВЗРЫВ! 🚨💥';
        this.madButton.style.background = 'linear-gradient(45deg, #ff0000, #ffff00)';
        this.madButton.style.animation = 'emergencyFlash 0.3s infinite';
        this.madButton.style.fontSize = '1.2rem';
        
        // ВКЛЮЧАЕМ ВСЕ ЭФФЕКТЫ БЕЗУМИЯ
        this.disableBeautifulCursor();
        this.enableMadCursor();
        this.ensureMadBackground();
        this.accelerateFloatingObjects();
        this.addCrazyObjects();
        this.transformText();
        this.startCursorTrails();
        this.playMadSounds();
        this.addBodyShake();
        
        // Добавляем переливающийся фон
        this.startBackgroundMadness();
        
        // ЗАПУСКАЕМ ПСИХОДЕЛИЧЕСКИЕ ЭФФЕКТЫ
        this.startPsychedelicEffects();
        
        // 💥 ЗАПУСКАЕМ ЯДЕРНЫЕ ВЗРЫВЫ!
        this.startNuclearExplosions();
        
        console.log('💥🚀🌪️ АКТИВИРОВАН РЕЖИМ ЯДЕРНОГО БЕЗУМИЯ!');
    }

     disable() {
        this.isActive = false;
        document.body.classList.remove('ultra-mad', 'nuclear-mad', 'hyper-mad');
        this.madButton.textContent = 'БЕЗУМНЫЙ РЕЖИМ';
        this.madButton.style.background = '';
        this.madButton.style.animation = '';
        this.madButton.style.fontSize = '';
        
        // ВЫКЛЮЧАЕМ ВСЕ ЭФФЕКТЫ БЕЗУМИЯ
        this.enableBeautifulCursor();
        this.disableMadCursor();
        this.removeCrazyObjects();
        this.normalizeFloatingObjects();
        this.restoreText();
        this.stopCursorTrails();
        this.removeBodyShake();
        this.removeMadnessBackground();
        
        // ВЫКЛЮЧАЕМ ПСИХОДЕЛИЧЕСКИЕ ЭФФЕКТЫ
        this.stopPsychedelicEffects();
        
        // 💥 ВЫКЛЮЧАЕМ ЯДЕРНЫЕ ВЗРЫВЫ!
        this.stopNuclearExplosions();
        
        console.log('🛑💊 Ядерное безумие остановлено');
    }
    ensureMadBackground() {
        if (this.madBackground) return;
        let layer = document.querySelector('.mad-background');
        if (!layer) {
            layer = document.createElement('div');
            layer.className = 'mad-background';
            document.body.appendChild(layer);
        }
        this.madBackground = layer;
    }

    createSafetyModal() {
        if (this.safetyModal) return;

        const modal = document.createElement('div');
        modal.className = 'mad-consent-modal';
        modal.innerHTML = `
            <div class="mad-consent-backdrop"></div>
            <div class="mad-consent-window">
                <h3>⚠️ Вы эпилепсик?</h3>
                <p>Безумный режим — это вспышки, цвета, хаос. Продолжать?</p>
                <div class="mad-consent-actions">
                    <button class="mad-consent-btn mad-yes-btn">Да</button>
                    <button class="mad-consent-btn mad-no-btn">Нет, включай хаос</button>
                    <button class="mad-consent-link mad-cancel-btn">Отмена</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.safetyModal = modal;
        this.evasiveBtn = modal.querySelector('.mad-yes-btn');

        const startBtn = modal.querySelector('.mad-no-btn');
        const cancelBtn = modal.querySelector('.mad-cancel-btn');
        const backdrop = modal.querySelector('.mad-consent-backdrop');

        const hide = () => this.hideSafetyModal();

        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            hide();
            this.enable();
        });

        cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            hide();
        });

        backdrop.addEventListener('click', hide);

        const moveAway = (e) => this.moveEvasiveButton(e);
        this.evasiveBtn.addEventListener('mouseenter', moveAway);
        this.evasiveBtn.addEventListener('mousemove', moveAway);
        this.evasiveBtn.addEventListener('click', (e) => e.preventDefault());
    }

    showSafetyModal() {
        if (!this.safetyModal) return;
        this.safetyModal.classList.add('visible');
    }

    hideSafetyModal() {
        if (!this.safetyModal) return;
        this.safetyModal.classList.remove('visible');
    }

    moveEvasiveButton(e) {
        const container = this.safetyModal.querySelector('.mad-consent-window');
        if (!container || !this.evasiveBtn) return;
        const contRect = container.getBoundingClientRect();
        const btnRect = this.evasiveBtn.getBoundingClientRect();

        const padding = 12;
        const maxLeft = contRect.width - btnRect.width - padding;
        const maxTop = contRect.height - btnRect.height - padding;

        const nextLeft = Math.max(
            padding,
            Math.min(
                maxLeft,
                (e.offsetX || Math.random() * contRect.width) + Math.random() * 80 - 40
            )
        );
        const nextTop = Math.max(
            padding,
            Math.min(
                maxTop,
                (e.offsetY || Math.random() * contRect.height) + Math.random() * 60 - 30
            )
        );

        this.evasiveBtn.style.transform = `translate(${nextLeft}px, ${nextTop}px) rotate(${Math.random() * 10 - 5}deg)`;
    }

    startBackgroundMadness() {
        if (!this.spectrumOverlay) {
            this.spectrumOverlay = document.createElement('div');
            this.spectrumOverlay.className = 'mad-spectrum-overlay';
            document.body.appendChild(this.spectrumOverlay);
        }

        if (!this.flashElements.length) {
            this.createFlashElements();
        }

        if (!this.flashInterval) {
            this.flashInterval = setInterval(() => {
                this.createRandomFlash();
                if (Math.random() > 0.4) {
                    this.createBigFlash();
                }
            }, 600);
        }
    }

    removeMadnessBackground() {
        if (this.flashInterval) {
            clearInterval(this.flashInterval);
            this.flashInterval = null;
        }
        this.stopPsychedelicFlashes();

        if (this.spectrumOverlay && this.spectrumOverlay.parentNode) {
            this.spectrumOverlay.parentNode.removeChild(this.spectrumOverlay);
        }
        this.spectrumOverlay = null;
    }

     startPsychedelicEffects() {
        if (window.psychedelicEffects) {
            window.psychedelicEffects.enable();
        }
    }

    stopPsychedelicEffects() {
        if (window.psychedelicEffects) {
            window.psychedelicEffects.disable();
        }
    }

    startNuclearExplosions() {
        if (window.crazyExplosions) {
            window.crazyExplosions.enable();
        }
    }

    stopNuclearExplosions() {
        if (window.crazyExplosions) {
            window.crazyExplosions.disable();
        }
    }
    
    createFlashElements() {
        // Создаём несколько элементов для вспышек
        for (let i = 0; i < 5; i++) {
            const flash = document.createElement('div');
            flash.className = 'psychedelic-flash';
            flash.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9990;
                opacity: 0;
                mix-blend-mode: overlay;
            `;
            document.body.appendChild(flash);
            this.flashElements.push(flash);
        }
    }

    createRandomFlash() {
        const availableFlashes = this.flashElements.filter(flash => flash.style.opacity === '0');
        if (availableFlashes.length === 0) return;
        
        const flash = availableFlashes[Math.floor(Math.random() * availableFlashes.length)];
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
        const randomSize = 20 + Math.random() * 50;
        
        flash.style.background = randomColor;
        flash.style.backgroundPosition = `${randomX}% ${randomY}%`;
        flash.style.backgroundSize = `${randomSize}% ${randomSize}%`;
        
        // Анимация вспышки
        this.animateFlash(flash);
    }

    createBigFlash() {
        const availableFlashes = this.flashElements.filter(flash => flash.style.opacity === '0');
        if (availableFlashes.length === 0) return;
        
        const flash = availableFlashes[Math.floor(Math.random() * availableFlashes.length)];
        const colors = [
            'linear-gradient(45deg, #ff00ff, #00ffff)',
            'linear-gradient(135deg, #ffff00, #ff00ff)',
            'linear-gradient(225deg, #39ff14, #ffff00)',
            'linear-gradient(315deg, #00ffff, #ff6b35)'
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        flash.style.background = randomColor;
        flash.style.backgroundSize = '200% 200%';
        flash.style.backgroundPosition = '50% 50%';
        
        // Большая вспышка на весь экран
        this.animateBigFlash(flash);
    }

    animateFlash(flash) {
        let opacity = 0;
        let scale = 0.5;
        const duration = 400 + Math.random() * 400;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                // Быстрое появление, медленное исчезновение
                if (progress < 0.3) {
                    opacity = progress / 0.3;
                    scale = 0.5 + (progress / 0.3) * 0.5;
                } else {
                    opacity = 1 - ((progress - 0.3) / 0.7);
                    scale = 1 - ((progress - 0.3) / 0.7) * 0.3;
                }
                
                flash.style.opacity = opacity;
                flash.style.transform = `scale(${scale})`;
                requestAnimationFrame(animate);
            } else {
                flash.style.opacity = '0';
                flash.style.transform = 'scale(1)';
            }
        };
        
        animate();
    }

    animateBigFlash(flash) {
        let opacity = 0;
        const duration = 800;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                // Медленное появление и исчезновение
                if (progress < 0.5) {
                    opacity = progress / 0.5;
                } else {
                    opacity = 1 - ((progress - 0.5) / 0.5);
                }
                
                flash.style.opacity = opacity;
                requestAnimationFrame(animate);
            } else {
                flash.style.opacity = '0';
            }
        };
        
        animate();
    }

    stopPsychedelicFlashes() {
        // Останавливаем интервалы
        if (this.flashInterval) {
            clearInterval(this.flashInterval);
            this.flashInterval = null;
        }
        
        // Удаляем элементы вспышек
        this.flashElements.forEach(flash => {
            if (flash.parentNode) {
                flash.parentNode.removeChild(flash);
            }
        });
        this.flashElements = [];
    }

    disableBeautifulCursor() {
        // Временно скрываем красивый курсор
        if (window.cursorEffects) {
            window.cursorEffects.hide();
        }
    }

    enableBeautifulCursor() {
        // Показываем красивый курсор обратно
        if (window.cursorEffects) {
            window.cursorEffects.show();
        }
    }

    enableMadCursor() {
        // Включаем безумный курсор (дрожание и т.д.)
        document.body.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><text x="8" y="24" font-size="20">🪄</text></svg>'), auto`;
    }

    disableMadCursor() {
        // Возвращаем кастомный курсор
        document.body.style.cursor = 'none';
    }

    accelerateFloatingObjects() {
        document.querySelectorAll('.floating-object').forEach(obj => {
            obj.style.animationDuration = '2s';
        });
    }

    normalizeFloatingObjects() {
        document.querySelectorAll('.floating-object').forEach(obj => {
            obj.style.animationDuration = '20s';
            obj.style.opacity = '0.1';
        });
    }

    addCrazyObjects() {
        const crazyEmojis = ['🚽', '🧻', '🍌', '🪣', '🔥', '💥', '🤪', '👻', '💩', '🎪'];
        
        crazyEmojis.forEach((emoji, index) => {
            const obj = document.createElement('div');
            obj.className = 'floating-object crazy';
            obj.textContent = emoji;
            obj.style.left = Math.random() * 100 + '%';
            obj.style.top = Math.random() * 100 + '%';
            obj.style.animation = `crazyFloat ${1 + Math.random() * 3}s infinite linear`;
            obj.style.fontSize = (2 + Math.random() * 2) + 'rem';
            obj.style.zIndex = '1000';
            
            document.querySelector('.mad-background').appendChild(obj);
            this.crazyObjects.push(obj);
        });
    }

    removeCrazyObjects() {
        this.crazyObjects.forEach(obj => {
            if (obj && obj.parentNode) {
                obj.parentNode.removeChild(obj);
            }
        });
        this.crazyObjects = [];
    }

    transformText() {
        const transformations = [
            text => text.toUpperCase(),
            text => text.split('').map(char => Math.random() > 0.8 ? char + '!' : char).join(''),
            text => text.replace(/[а-я]/gi, char => Math.random() > 0.5 ? char : char.toUpperCase()),
            text => text + ' 🤪',
            text => 'УПОРОТЫЙ: ' + text,
            text => text.split('').reverse().join('')
        ];
        
        document.querySelectorAll('h1, h2, h3, p, span, .filter-btn').forEach(element => {
            if (Math.random() > 0.4 && element.textContent.length > 3) {
                const original = element.textContent;
                element.setAttribute('data-original-mad', original);
                
                const transform = transformations[Math.floor(Math.random() * transformations.length)];
                element.textContent = transform(original);
            }
        });
    }

    restoreText() {
        document.querySelectorAll('[data-original-mad]').forEach(element => {
            element.textContent = element.getAttribute('data-original-mad');
            element.removeAttribute('data-original-mad');
        });
    }

    startCursorTrails() {
        this.cursorTrailHandler = (e) => {
            if (Math.random() > 0.7) {
                createCursorTrail(e.pageX, e.pageY);
            }
        };
        document.addEventListener('mousemove', this.cursorTrailHandler);
    }

    stopCursorTrails() {
        if (this.cursorTrailHandler) {
            document.removeEventListener('mousemove', this.cursorTrailHandler);
        }
        document.querySelectorAll('.cursor-trail').forEach(trail => trail.remove());
    }

    playMadSounds() {
        this.clickHandler = () => {
            if (Math.random() > 0.5) {
                // В будущем можно добавить реальные звуки
                console.log('🔊 Безумный звук!');
            }
        };
        document.addEventListener('click', this.clickHandler);
    }

    showMadAlert() {
        const alert = document.createElement('div');
        alert.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff00ff, #00ffff);
            color: white;
            padding: 2rem;
            border-radius: 20px;
            border: 5px dashed #39ff14;
            font-family: 'Comic Neue', cursive;
            font-size: 1.5rem;
            text-align: center;
            z-index: 10000;
            animation: madShake 0.3s infinite;
        `;
        alert.innerHTML = '🚨 ВКЛЮЧЕН РЕЖИМ УПОРОТОСТИ! 🚨<br>Держитесь крепче!';
        
        document.body.appendChild(alert);
        setTimeout(() => {
            document.body.removeChild(alert);
        }, 3000);
    }

    showNormalAlert() {
        alert('😅 Безумие окончено! Можете открывать глаза.');
    }
}

// Инициализация безумного режима при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.madMode = new MadMode();
});