function createBlock(x = 0, y = 0, w = 10, h = 10, color = [0, 0, 0], opacity = 1, collide, layer = 0) {
    const block = {
        pos: {
            x,
            y
        },
        size: {
            x: w,
            y: h
        },
        colorArr: color,
        color: arrtoRGBA(color),
        opacity,
        collide,
        layer,
        type: "block"
    };

    // Create inputs/labels
    const xInput = document.createElement("input");
    xInput.value = x;
    xInput.addEventListener("input", () => {
        block.pos.x = xInput.value = Math.max(xInput.value, 0);
    });

    const yInput = document.createElement("input");
    yInput.value = y;
    yInput.addEventListener("input", () => {
        block.pos.y = yInput.value = Math.max(yInput.value, 0);
    });

    const wInput = document.createElement("input");
    wInput.value = w;
    wInput.addEventListener("input", () => {
        block.size.x = wInput.value = Math.max(wInput.value, 0);
    });

    const hInput = document.createElement("input");
    hInput.value = h;
    hInput.addEventListener("input", () => {
        block.size.y = hInput.value = Math.max(hInput.value, 0);
    });


    const colorInput = document.createElement("input");
    const opacityInput = document.createElement("input");

    colorInput.value = arrtoRGBA(color);
    colorInput.addEventListener("input", () => {
        block.colorArr = hexToArr(colorInput.value);
        block.color = colorInput.value;
    });

    opacityInput.value = opacity;
    opacityInput.step = 0.05;
    opacityInput.addEventListener("input", () => {
        opacityInput.value = Math.max(Math.min(opacityInput.value, 1), 0);
        block.opacity = opacityInput.value;
    });

    const collideInput = document.createElement("input");
    collideInput.checked = collide;
    collideInput.addEventListener("input", () => {
        block.collide = collideInput.checked;
    });

    const layerInput = document.createElement("input");
    collideInput.checked = layer;
    layerInput.addEventListener("input", () => {
        block.layer = layerInput.checked;
    });


    block.element = createFolder("Block Properties", [
        createFolder("Position", [
            createProperty("x", xInput, "number"),
            createProperty("y", yInput, "number")
        ]),
        createFolder("Size", [
            createProperty("width", wInput, "number"),
            createProperty("height", hInput, "number")
        ]),
        createProperty("color", colorInput, "color"),
        createProperty("opacity", opacityInput, "number"),
        createProperty("collide", collideInput, "switch"),
        createProperty("layer", layerInput, "switch")
    ]);

    block.inputs = {
        x: xInput,
        y: yInput,
        w: wInput,
        h: hInput,
        color: colorInput,
        opacity: opacityInput,
        collide: collideInput,
        layer: layerInput
    };

    return block;
}