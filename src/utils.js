export const randomInRange = (...args) => {
    let min = 0;
    let max = args[0];

    if (args.length === 2) {
        [min, max] = args;
    }

    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
};

export const runMojo = (mojo = 100, speed = 10) => {
    document.documentElement.style.setProperty('--top', '-10vh');

    for (let counter = 0; counter < mojo; counter += 1) {
        const elem = document.createElement('span');
        elem.classList.add('mojo');
        elem.style.setProperty(
            '--duration',
            // get decimal to make them different
            `${randomInRange(speed * 100) / 100}s`
        );
        elem.style.setProperty('--left', `${randomInRange(5, 95)}vw`);
        document.body.appendChild(elem);

        setTimeout(() => {
            if (!counter) {
                document.documentElement.style.setProperty('--top', '-10vh');
            }
            elem.remove();
        }, speed * 1000);
    }

    // Do animation once the loop has ended
    setTimeout(() => {
        document.documentElement.style.setProperty('--top', '110vh');
    }, 10);
};

export const createMojo = (contributionsCollection) =>
    Object
        .values(contributionsCollection)
        .filter(
            (valor) =>
                typeof valor === "number"
                && !Number.isNaN(valor)
        )
        .reduce(
            (acc, current) => (acc + current),
        0)