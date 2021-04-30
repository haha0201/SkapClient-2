/**
 * @typedef {[number, number, number]} ColorArr
 * 
 * @typedef SkapObject
 * @property {VectorLike} pos
 * @property {VectorLike} size
 * @property {Object<string, HTMLInputElement>} inputs
 * @property {string} type
 * @property {HTMLLIElement} element
 * 
 * @typedef Area
 * @property {string} name
 * @property {string} color
 * @property {ColorArr} colorArr
 * @property {string} background
 * @property {ColorArr} backgroundArr
 * @property {number} opacity
 * @property {[number, number]} size
 * @property {Object} objects
 * @property {Obstacle[]} objects.obstacle
 * @property {Lava[]} objects.lava
 * @property {Slime[]} objects.slime
 * @property {Block[]} objects.block
 * @property {Teleporter[]} objects.teleporter
 * @property {SkapText[]} objects.text
 * @property {Spawner[]} objects.spawner
 * @property {HTMLLIElement} element
 * @property {HTMLButtonElement} button
 * @property {{w: HTMLInputElement, h: HTMLInputElement, name: HTMLInputElement}} inputs
 * 
 * @param {string} name 
 * @param {ColorArr} color 
 * @param {number} opacity 
 * @param {ColorArr} background 
 * @param {number} w 
 * @param {number} h 
 * @returns {Area}
 */
function createArea(name = "New Area", color = [0, 10, 87], opacity = 0.8, background = [230, 230, 230], w = 100, h = 100) {
    const area = {
        name,
        color: blend240(color, opacity),
        colorArr: color,
        background: arrtoRGBA(background),
        backgroundArr: background,
        opacity,
        size: [w, h],
        objects: {
            obstacle: [],
            teleporter: [],
            lava: [],
            rotatingLava: [],
            movingLava: [],
            ice: [],
            slime: [],
            button: [],
            switch: [],
            door: [],
            block: [],
            text: [],
            turret: [],
            gravityZone: [],
            reward: [],
            hatReward: [],
            box: [],
            image0: [],
            image1: [],
            spawner: []
        }
    };

    const nameInput = document.createElement("input");
    nameInput.value = name;
    nameInput.addEventListener("input", () => {
        area.name = nameInput.value;
    });

    const colorInput = document.createElement("input");
    const opacityInput = document.createElement("input");

    colorInput.value = arrtoHex(color);
    colorInput.addEventListener("input", () => {
        area.colorArr = hexToArr(colorInput.value);
        area.color = blend240(area.colorArr, opacity);

        document.documentElement.style.setProperty("--obstacle", `rgba(${area.colorArr.join(",")},${area.opacity}`);
    });

    opacityInput.value = opacity;
    opacityInput.step = 0.05;
    opacityInput.addEventListener("input", () => {
        opacityInput.value = Math.max(Math.min(opacityInput.value, 1), 0);
        area.opacity = opacityInput.value;
        area.color = blend240(area.colorArr, area.opacity);

        document.documentElement.style.setProperty("--obstacle", `rgba(${area.colorArr.join(",")},${area.opacity}`);
    });

    const backgroundInput = document.createElement("input");
    backgroundInput.value = arrtoHex(background);
    backgroundInput.addEventListener("input", () => {
        area.background = backgroundInput.value;
        area.backgroundArr = hexToArr(backgroundInput.value);
    });

    const wInput = document.createElement("input");
    wInput.value = w;
    wInput.addEventListener("input", () => {
        area.size[0] = Number(wInput.value);
    });

    const hInput = document.createElement("input");
    hInput.value = h;
    hInput.addEventListener("input", () => {
        area.size[1] = Number(hInput.value);
    });

    area.element = createFolder("Area Properties", [
        createProperty("name", nameInput, "text"),
        createProperty("color", colorInput, "color"),
        createProperty("opacity", opacityInput, "number"),
        createProperty("background", backgroundInput, "color"),
        createFolder("Size", [
            createProperty("width", wInput, "number"),
            createProperty("height", hInput, "number")
        ])
    ]);
    area.inputs = {
        name: nameInput,
        w: wInput,
        h: hInput
    }
    return area;
}