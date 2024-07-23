function applyShakeEffect(paddle) {
    const originalX = paddle.x;
    const originalY = paddle.y;
    const shakeDuration = 100; // Duration of the effect in milliseconds
    const shakeIntensity = 1; // Reduced intensity of the jello effect
    const frequency = 2; // Frequency of the oscillations

    let startTime = Date.now();

    function shake() {
        let elapsed = Date.now() - startTime;
        if (elapsed < shakeDuration) {
            let angle = (elapsed / shakeDuration) * Math.PI * 1 * frequency;
            paddle.x = originalX + Math.sin(angle) * shakeIntensity;
            paddle.y = originalY + Math.cos(angle) * shakeIntensity;
            requestAnimationFrame(shake);
        } else {
            paddle.x = originalX;
            paddle.y = originalY;
        }
    }

    shake();
}