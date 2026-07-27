let cap;
let cvBuf = {
    buffer: null,
    ctx: null
};

async function setup() {
    await createCanvas(640, 480, WEBGPU);
    pixelDensity(1);

    cap = createCapture(VIDEO);
    cap.size(width, height);
    cap.hide();

    const buffer = createGraphics(width, height);
    buffer.pixelDensity(1);
    const ctx = buffer.elt.getContext('2d', { willReadFrequently: true });
    cvBuf.buffer = buffer;
    cvBuf.ctx = ctx;

    await readyCapture(cap);
}

async function readyCapture(cap) {
    while (cap.elt.readState < 4) {
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

function draw() {
    background(0);
    cvBuf.ctx.drawImage(cap.elt, 0, 0, cap.width, cap.height);
    scale(-1, 1, 0);
    translate(-width/2, -height/2);
    texture(cvBuf.buffer);
    rect(0, 0, width, height);
}
