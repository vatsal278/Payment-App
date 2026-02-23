// Ka-ching sound effect using Web Audio API
export function playKaChing() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const now = ctx.currentTime;

        // First "ka" sound - short percussive hit
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.frequency.setValueAtTime(1200, now);
        osc1.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        gain1.gain.setValueAtTime(0.3, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc1.start(now);
        osc1.stop(now + 0.1);

        // Second "ching" sound - bright metallic ring
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(2000, now + 0.08);
        osc2.frequency.exponentialRampToValueAtTime(3000, now + 0.12);
        osc2.frequency.exponentialRampToValueAtTime(2500, now + 0.5);
        gain2.gain.setValueAtTime(0.0001, now + 0.08);
        gain2.gain.linearRampToValueAtTime(0.25, now + 0.12);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc2.start(now + 0.08);
        osc2.stop(now + 0.6);

        // Third harmonic - adds shimmer
        const osc3 = ctx.createOscillator();
        const gain3 = ctx.createGain();
        osc3.connect(gain3);
        gain3.connect(ctx.destination);
        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(4000, now + 0.1);
        osc3.frequency.exponentialRampToValueAtTime(5000, now + 0.15);
        gain3.gain.setValueAtTime(0.0001, now + 0.1);
        gain3.gain.linearRampToValueAtTime(0.1, now + 0.15);
        gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc3.start(now + 0.1);
        osc3.stop(now + 0.4);

        // Cleanup
        setTimeout(() => ctx.close(), 1000);
    } catch (err) {
        console.warn("Audio not supported:", err);
    }
}
