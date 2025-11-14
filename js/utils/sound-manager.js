// ===== МЕНЕДЖЕР ЗВУКОВ ДЛЯ КУРСОРА =====

class SoundManager {
    constructor() {
        this.sounds = new Map();
        this.isEnabled = true;
        this.volume = 0.3;
        this.init();
    }

    init() {
        // Предзагружаем звуки
        this.loadSound('click', 'assets/sounds/magic-click.mp3');
        this.loadSound('spell', 'assets/sounds/magic-spell.mp3');
        this.loadSound('whoosh', 'assets/sounds/whoosh.mp3');
        this.loadSound('success', 'assets/sounds/success.mp3');
        
        console.log('🎵 Менеджер звуков инициализирован!');
    }

    loadSound(name, path) {
        const audio = new Audio();
        audio.src = path;
        audio.preload = 'auto';
        audio.volume = this.volume;
        
        audio.addEventListener('canplaythrough', () => {
            console.log(`🔊 Звук "${name}" загружен`);
        });

        audio.addEventListener('error', (e) => {
            console.warn(`❌ Ошибка загрузки звука "${name}":`, e);
        });

        this.sounds.set(name, audio);
    }

    play(name, options = {}) {
        if (!this.isEnabled) return;

        const sound = this.sounds.get(name);
        if (!sound) {
            console.warn(`Звук "${name}" не найден`);
            return;
        }

        try {
            // Клонируем звук для возможности одновременного воспроизведения
            const soundClone = sound.cloneNode();
            soundClone.volume = options.volume !== undefined ? options.volume : this.volume;
            
            if (options.rate) {
                soundClone.playbackRate = options.rate;
            }

            const playPromise = soundClone.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn('Воспроизведение звука заблокировано:', error);
                });
            }

            // Удаляем клон после воспроизведения
            soundClone.addEventListener('ended', () => {
                soundClone.remove();
            });

        } catch (error) {
            console.warn('Ошибка воспроизведения звука:', error);
        }
    }

    enable() {
        this.isEnabled = true;
        console.log('🔊 Звуки включены');
    }

    disable() {
        this.isEnabled = false;
        console.log('🔇 Звуки выключены');
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        this.sounds.forEach(sound => {
            sound.volume = this.volume;
        });
    }
}

// Глобальный экземпляр
window.soundManager = new SoundManager();