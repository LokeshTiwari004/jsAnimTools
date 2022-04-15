function animate({duration, timingFunction, draw}) {
    let startingInstant = performance.now();
    let progress = 0;

    function animation() {
        let timeFraction = (performance.now() - startingInstant) / duration;
        if (timeFraction > 1) timeFraction = 1;
        progress = timingFunction.func(timeFraction);
        draw(progress);
        if (timeFraction < 1) {
            requestAnimationFrame(animation);
        } 
    }

    requestAnimationFrame(animation);

    return true;
}

export { animate };