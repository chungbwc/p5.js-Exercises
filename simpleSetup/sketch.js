let cap;

async function setup() {
    createCanvas(640, 480);
    pixelDensity(1);

    cap = createCapture(VIDEO);
    cap.size(width, height);
    cap.hide();

    await readyCapture(cap);
}

async function readyCapture(cap) {
    while (cap.elt.readState < 4) {
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

function draw() {
    background(0);
    scale(-1, 1, 1);
    translate(-width, 0, 0);
    image(cap, 0, 0, width, height);
}
