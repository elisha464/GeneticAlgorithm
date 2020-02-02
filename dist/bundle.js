/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Chromosome.ts":
/*!***************************!*\
  !*** ./src/Chromosome.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Circle_1 = __webpack_require__(/*! ./Circle */ "./src/Circle.ts");
class Chromosome {
    constructor(circles) {
        this.circles = circles;
    }
    mutate(chance) {
        this.circles.forEach(c => c.mutate(chance));
    }
    getClone() {
        return new Chromosome(this.circles.map(c => c.getClone()));
    }
    static getRandomChromosome(size) {
        const randomCircles = [];
        for (let i = 0; i < size; i++)
            randomCircles.push(Circle_1.default.getRandomCircle());
        return new Chromosome(randomCircles);
    }
    static fromParents(c1, c2) {
        if (c1.circles.length !== c2.circles.length)
            throw new Error('Parents are not compatible');
        const loopMax = c1.circles.length;
        const randomParent = () => (Math.random() < 0.5) ? c1 : c2;
        const circles = [];
        for (let i = 0; i < loopMax; i++)
            circles.push(randomParent().circles[i].getClone());
        return new Chromosome(circles);
    }
}
exports.default = Chromosome;


/***/ }),

/***/ "./src/ChromosomeFitnessCalculator.ts":
/*!********************************************!*\
  !*** ./src/ChromosomeFitnessCalculator.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ChromosomeFitnessCalculator {
    constructor(renderer, base) {
        this.renderer = renderer;
        this.base = base;
    }
    calculateFitness(chromosome, flipY = false) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.renderer.render(chromosome, this.base.width, this.base.height);
            const baseData = this.base.data;
            const data = this.renderer.getImageData(this.base.width, this.base.height).data;
            const width = this.base.width;
            const height = this.base.height;
            let comparedRow = 0;
            let result = 0;
            let r, g, b, a;
            // for (let i=0; i < len; i += 4) {
            //     r = baseData[i + 0] - data[i + 0];
            //     g = baseData[i + 1] - data[i + 1];
            //     b = baseData[i + 2] - data[i + 2];
            //     a = baseData[i + 3] - data[i + 3];
            //     result += (r*r) + (g*g) + (b*b) + (a*a);
            // }
            for (let row = 0; row < height; row++) {
                comparedRow = (flipY ? height - 1 - row : row);
                for (let col = 0; col < width; col++) {
                    r = baseData[row * width * 4 + col * 4 + 0] - data[comparedRow * width * 4 + col * 4 + 0];
                    g = baseData[row * width * 4 + col * 4 + 1] - data[comparedRow * width * 4 + col * 4 + 1];
                    b = baseData[row * width * 4 + col * 4 + 2] - data[comparedRow * width * 4 + col * 4 + 2];
                    a = baseData[row * width * 4 + col * 4 + 3] - data[comparedRow * width * 4 + col * 4 + 3];
                    result += (r * r) + (g * g) + (b * b) + (a * a);
                }
            }
            return (width * height * 4 * (255 * 255)) - result;
        });
    }
}
exports.default = ChromosomeFitnessCalculator;


/***/ }),

/***/ "./src/Circle.ts":
/*!***********************!*\
  !*** ./src/Circle.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __webpack_require__(/*! ./Color */ "./src/Color.ts");
class Circle {
    constructor(_x = 0, _y = 0, _radius = 0, _color = new Color_1.default()) {
        this._x = _x;
        this._y = _y;
        this._radius = _radius;
        this._color = _color;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get radius() {
        return this._radius;
    }
    get color() {
        return this._color;
    }
    mutateLocation() {
        this._x = Math.random();
        this._y = Math.random();
    }
    mutateRadius() {
        this._radius = Math.random() * 0.3;
    }
    mutateColor() {
        this._color = Color_1.default.getRandomColor();
    }
    mutate(chance) {
        if (Math.random() * 100 < chance) {
            this.mutateLocation();
        }
        if (Math.random() * 100 < chance) {
            this.mutateRadius();
        }
        if (Math.random() * 100 < chance) {
            this.mutateColor();
        }
    }
    getClone() {
        return new Circle(this.x, this.y, this.radius, this.color);
    }
    static getRandomCircle() {
        return new Circle(Math.random(), Math.random(), Math.random() * 0.3, Color_1.default.getRandomColor());
    }
    toString() {
        return `(${this.x}, ${this.y}, ${this.radius}, ${this.color})`;
    }
}
exports.default = Circle;


/***/ }),

/***/ "./src/Color.ts":
/*!**********************!*\
  !*** ./src/Color.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Color {
    constructor(_r = 0, _g = 0, _b = 0, _a = 0) {
        this._r = _r;
        this._g = _g;
        this._b = _b;
        this._a = _a;
        const limitNumber = (n, min, max) => Math.max(min, Math.min(max, n));
        this._r = Math.floor(limitNumber(this._r, 0, 255));
        this._g = Math.floor(limitNumber(this._g, 0, 255));
        this._b = Math.floor(limitNumber(this._b, 0, 255));
        this._a = Math.floor(limitNumber(this._a, 0, 255));
    }
    static getRandomColor() {
        const randInt = (n) => Math.floor(Math.random() * n);
        return new Color(randInt(256), randInt(256), randInt(256), randInt(256));
    }
    get r() {
        return this._r;
    }
    get g() {
        return this._g;
    }
    get b() {
        return this._b;
    }
    get a() {
        return this._a;
    }
    toCssString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a / 255})`;
    }
}
exports.default = Color;


/***/ }),

/***/ "./src/CustomRenderer.ts":
/*!*******************************!*\
  !*** ./src/CustomRenderer.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function calcDistance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}
class default_1 {
    constructor(renderingContext = null) {
        this.renderingContext = renderingContext;
    }
    renderPixel(chromosome, width, height, row, col) {
        for (let i = 0; i < chromosome.circles.length; i++) {
            const currCircle = chromosome.circles[i];
            const scaledRadius = currCircle.radius * Math.min(width, height);
            const scaledX = currCircle.x * width;
            const scaledY = currCircle.y * height;
            if (calcDistance(col, row, scaledX, scaledY) <= scaledRadius) {
                // if (scaledX - scaledRadius <= col && col <= scaledX + scaledRadius && scaledY - scaledRadius <= row && row <= scaledY + scaledRadius) {
                this.data.data[row * width * 4 + col * 4 + 0] = currCircle.color.r;
                this.data.data[row * width * 4 + col * 4 + 1] = currCircle.color.g;
                this.data.data[row * width * 4 + col * 4 + 2] = currCircle.color.b;
                this.data.data[row * width * 4 + col * 4 + 3] = currCircle.color.a;
            }
        }
    }
    render(chromosome, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            this.data = new ImageData(width, height);
            for (let row = 0; row < height; row++) {
                for (let col = 0; col < width; col++) {
                    this.renderPixel(chromosome, width, height, row, col);
                }
            }
            if (this.renderingContext) {
                this.renderingContext.putImageData(this.data, 0, 0);
            }
        });
    }
    getImageData(width, height) {
        return this.data;
    }
}
exports.default = default_1;


/***/ }),

/***/ "./src/FitnessedChromosome.ts":
/*!************************************!*\
  !*** ./src/FitnessedChromosome.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class FitnessedChromosome {
    constructor(chromosome, fitness) {
        this.chromosome = chromosome;
        this.fitness = fitness;
    }
}
exports.default = FitnessedChromosome;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chromosome_1 = __webpack_require__(/*! ./Chromosome */ "./src/Chromosome.ts");
const ChromosomeFitnessCalculator_1 = __webpack_require__(/*! ./ChromosomeFitnessCalculator */ "./src/ChromosomeFitnessCalculator.ts");
const WebGLChromosomeRenderer_1 = __webpack_require__(/*! ./webgl/WebGLChromosomeRenderer */ "./src/webgl/WebGLChromosomeRenderer.ts");
const CustomRenderer_1 = __webpack_require__(/*! ./CustomRenderer */ "./src/CustomRenderer.ts");
const FitnessedChromosome_1 = __webpack_require__(/*! ./FitnessedChromosome */ "./src/FitnessedChromosome.ts");
let inMemoryCanvas1 = document.createElement('canvas');
let inMemoryCanvas2 = document.createElement('canvas');
let inMemoryContext1 = inMemoryCanvas1.getContext('webgl');
let inMemoryContext2 = inMemoryCanvas2.getContext('2d');
var stats = document.getElementById('stats');
window.loadImage = function (fileInput) {
    if (!fileInput.files[0])
        return;
    let img = document.getElementById('img');
    img.src = URL.createObjectURL(fileInput.files[0]);
    img.onload = function () {
        return __awaiter(this, void 0, void 0, function* () {
            var c = document.getElementById('myCanvas');
            let t = c.getContext('2d');
            // let t = c.getContext('webgl');
            c.width = img.width;
            c.height = img.height;
            inMemoryCanvas1.width = img.width;
            inMemoryCanvas1.height = img.height;
            inMemoryCanvas2.width = img.width;
            inMemoryCanvas2.height = img.height;
            inMemoryContext2.drawImage(img, 0, 0);
            var baseImageData = inMemoryContext2.getImageData(0, 0, c.width, c.height);
            inMemoryContext2.clearRect(0, 0, c.width, c.height);
            // const mainRenderer = new WebGLChromosomeRenderer(t);
            const mainRenderer = new CustomRenderer_1.default(t);
            // const inMemoryRenderer = new WebGLChromosomeRenderer(t);
            const inMemoryRenderer = new CustomRenderer_1.default();
            const fitnessCalc = new ChromosomeFitnessCalculator_1.default(inMemoryRenderer, baseImageData);
            const chromosomeSize = 50;
            var populationSize = 30;
            var BestPopulationCutOff = Math.floor(populationSize / 4);
            var generation = 0;
            let population = [];
            for (let i = 0; i < populationSize; i++) {
                const randomChromosome = Chromosome_1.default.getRandomChromosome(chromosomeSize);
                const fitness = yield fitnessCalc.calculateFitness(randomChromosome, inMemoryRenderer instanceof WebGLChromosomeRenderer_1.default);
                population.push(new FitnessedChromosome_1.default(randomChromosome, fitness));
            }
            population.sort((a, b) => b.fitness - a.fitness);
            function start() {
                return __awaiter(this, void 0, void 0, function* () {
                    var newPopulation = [];
                    for (let i = 0; i < populationSize; i++) {
                        const arg1 = population[Math.floor(Math.random() * populationSize) % BestPopulationCutOff];
                        const arg2 = population[Math.floor(Math.random() * populationSize) % BestPopulationCutOff];
                        const newChromosome = Chromosome_1.default.fromParents(arg1.chromosome, arg2.chromosome);
                        newChromosome.mutate(0.1);
                        const fitness = yield fitnessCalc.calculateFitness(newChromosome, inMemoryRenderer instanceof WebGLChromosomeRenderer_1.default);
                        newPopulation.push(new FitnessedChromosome_1.default(newChromosome, fitness));
                    }
                    newPopulation.sort((a, b) => b.fitness - a.fitness);
                    population = newPopulation;
                    generation++;
                    mainRenderer.render(population[0].chromosome, c.width, c.height);
                    let fitnessInPercent = 100 * population[0].fitness / (c.width * c.height * 4 * (255 * 255));
                    stats.innerHTML = ('fitness: ' + fitnessInPercent.toFixed(2) + '<br />Generation: ' + generation);
                    if (generation > 1000) {
                        console.timeEnd("1000 generations took");
                    }
                    else {
                        requestAnimationFrame(start);
                    }
                });
            }
            console.time("1000 generations took");
            requestAnimationFrame(start);
        });
    };
};


/***/ }),

/***/ "./src/webgl/CircleTextureBuilder.ts":
/*!*******************************************!*\
  !*** ./src/webgl/CircleTextureBuilder.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class CircleTextureBuilder {
    constructor() {
    }
    checkPowOf2(n) {
        return n && (n & (n - 1)) === 0;
    }
    calcDistance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }
    build(textureSize) {
        if (!this.checkPowOf2(textureSize))
            throw new Error("Texture Size Must Be A Power Of 2");
        let result = new ImageData(textureSize, textureSize);
        for (let row = 0; row < textureSize; row++) {
            for (let col = 0; col < textureSize; col++) {
                let val = 0;
                let x = col - textureSize / 2;
                let y = row - textureSize / 2;
                if (this.calcDistance(x, y, 0, 0) < (textureSize / 2) * 0.9)
                    val = 255;
                let pixelIndex = (row * textureSize + col) * 4;
                result.data[pixelIndex + 0] = 0;
                result.data[pixelIndex + 1] = 0;
                result.data[pixelIndex + 2] = 0;
                result.data[pixelIndex + 3] = val;
            }
        }
        return result;
    }
}
exports.default = CircleTextureBuilder;


/***/ }),

/***/ "./src/webgl/WebGLChromosomeRenderer.ts":
/*!**********************************************!*\
  !*** ./src/webgl/WebGLChromosomeRenderer.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CircleTextureBuilder_1 = __webpack_require__(/*! ./CircleTextureBuilder */ "./src/webgl/CircleTextureBuilder.ts");
const fillColols = (arr, chromosome) => {
    for (let i = 0; i < chromosome.circles.length; i++) {
        const color = chromosome.circles[i].color;
        for (let j = 0; j < 6; j++) {
            arr[i * 24 + j * 4 + 0] = color.r;
            arr[i * 24 + j * 4 + 1] = color.g;
            arr[i * 24 + j * 4 + 2] = color.b;
            arr[i * 24 + j * 4 + 3] = color.a;
        }
    }
};
class WebGLChromosomeRenderer {
    constructor(renderingContext) {
        this.renderingContext = renderingContext;
        this.vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTextureCoord;
    attribute vec4 aVertexColor;

    uniform vec2 uResolution;

    varying highp vec2 vTextureCoord;
    varying highp vec4 vVertexColor;

    void main() {
        vec4 scaledPosition = aVertexPosition * vec4(2.0 / uResolution.x, 2.0 / uResolution.y, 1.0, 1.0);
        gl_Position = scaledPosition + vec4(-1.0, -1.0, 0.0, 0.0);
        vTextureCoord = aTextureCoord;
        vVertexColor = aVertexColor;
    }`;
        this.fsSource = `
    varying highp vec2 vTextureCoord;
    varying highp vec4 vVertexColor;

    uniform sampler2D uSampler;

    void main() {
        gl_FragColor = vVertexColor / 255.0;
        gl_FragColor *= texture2D(uSampler, vTextureCoord).a;
    }`;
        this.setup();
        this.insideCanvasContext = document.createElement('canvas').getContext('2d');
    }
    setup() {
        const gl = this.renderingContext;
        const vertexShader = this.loadShader(gl.VERTEX_SHADER, this.vsSource);
        const fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, this.fsSource);
        this.shaderProgram = gl.createProgram();
        gl.attachShader(this.shaderProgram, vertexShader);
        gl.attachShader(this.shaderProgram, fragmentShader);
        gl.linkProgram(this.shaderProgram);
        if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
            throw new Error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(this.shaderProgram));
        }
        this.programInfo = {
            attribLocations: {
                vertexPosition: gl.getAttribLocation(this.shaderProgram, 'aVertexPosition'),
                textureCoord: gl.getAttribLocation(this.shaderProgram, 'aTextureCoord'),
                vertexColor: gl.getAttribLocation(this.shaderProgram, 'aVertexColor')
            },
            uniformLocations: {
                resolution: gl.getUniformLocation(this.shaderProgram, 'uResolution'),
                uSampler: gl.getUniformLocation(this.shaderProgram, 'uSampler')
            },
        };
        this.circleTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.circleTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, new CircleTextureBuilder_1.default().build(256));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
        this.texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.vertexAttribPointer(this.programInfo.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.programInfo.attribLocations.textureCoord);
        this.vertColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertColorBuffer);
        gl.vertexAttribPointer(this.programInfo.attribLocations.vertexColor, 4, gl.UNSIGNED_BYTE, false, 0, 0);
        gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexColor);
    }
    loadShader(type, source) {
        const gl = this.renderingContext;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const errorMessage = 'An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw new Error(errorMessage);
        }
        return shader;
    }
    render(chromosome, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const gl = this.renderingContext;
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.viewport(0, 0, width, height);
            const positionsFromCircle = (c) => {
                const x = c.x * width;
                const y = c.y * height;
                const radius = c.radius * Math.min(width, height);
                return [
                    x - radius, y - radius,
                    x + radius, y - radius,
                    x - radius, y + radius,
                    x + radius, y + radius,
                    x + radius, y - radius,
                    x - radius, y + radius
                ];
            };
            const positions = chromosome.circles.reduce((a, b) => a.concat(positionsFromCircle(b)), []);
            const texCoords = new Float32Array(chromosome.circles.length * 6 * 2);
            for (let i = 0; i < chromosome.circles.length; i++) {
                texCoords[i * 12 + 0] = 0.0;
                texCoords[i * 12 + 1] = 0.0;
                texCoords[i * 12 + 2] = 1.0;
                texCoords[i * 12 + 3] = 0.0;
                texCoords[i * 12 + 4] = 0.0;
                texCoords[i * 12 + 5] = 1.0;
                texCoords[i * 12 + 6] = 1.0;
                texCoords[i * 12 + 7] = 1.0;
                texCoords[i * 12 + 8] = 1.0;
                texCoords[i * 12 + 9] = 0.0;
                texCoords[i * 12 + 10] = 0.0;
                texCoords[i * 12 + 11] = 1.0;
            }
            const vertColors = new Uint8Array(chromosome.circles.length * 6 * 4);
            fillColols(vertColors, chromosome);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertColorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertColors, gl.STATIC_DRAW);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.circleTexture);
            gl.useProgram(this.shaderProgram);
            gl.uniform2fv(this.programInfo.uniformLocations.resolution, [width, height]);
            gl.uniform1i(this.programInfo.uniformLocations.uSampler, 0);
            gl.drawArrays(gl.TRIANGLES, 0, 6 * chromosome.circles.length);
        });
    }
    getImageData(width, height) {
        const result = new ImageData(width, height);
        const buffer = new Uint8Array(result.data.buffer);
        this.renderingContext.readPixels(0, 0, width, height, this.renderingContext.RGBA, this.renderingContext.UNSIGNED_BYTE, buffer);
        return result;
    }
}
exports.default = WebGLChromosomeRenderer;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map