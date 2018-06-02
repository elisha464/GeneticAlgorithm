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
var Circle_1 = __webpack_require__(/*! ./Circle */ "./src/Circle.ts");
var Chromosome = /** @class */ (function () {
    function Chromosome(circles) {
        this.circles = circles;
    }
    Chromosome.prototype.mutate = function (chance) {
        this.circles.forEach(function (c) { return c.mutate(chance); });
    };
    Chromosome.prototype.getClone = function () {
        return new Chromosome(this.circles.map(function (c) { return c.getClone(); }));
    };
    Chromosome.getRandomChromosome = function (size) {
        var randomCircles = [];
        for (var i = 0; i < size; i++)
            randomCircles.push(Circle_1.default.getRandomCircle());
        return new Chromosome(randomCircles);
    };
    Chromosome.fromParents = function (c1, c2) {
        if (c1.circles.length !== c2.circles.length)
            throw new Error('Parents are not compatible');
        var loopMax = c1.circles.length;
        var randomParent = function () { return (Math.random() < 0.5) ? c1 : c2; };
        var circles = [];
        for (var i = 0; i < loopMax; i++)
            circles.push(randomParent().circles[i].getClone());
        return new Chromosome(circles);
    };
    return Chromosome;
}());
exports.default = Chromosome;


/***/ }),

/***/ "./src/ChromosomeFitnessCalculator.ts":
/*!********************************************!*\
  !*** ./src/ChromosomeFitnessCalculator.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ChromosomeFitnessCalculator = /** @class */ (function () {
    function ChromosomeFitnessCalculator(renderer, base) {
        this.renderer = renderer;
        this.base = base;
    }
    ChromosomeFitnessCalculator.prototype.calculateFitness = function (chromosome) {
        this.renderer.render(chromosome, this.base.width, this.base.height);
        var data = this.renderer.getImageData(this.base.width, this.base.height).data;
        var len = this.base.width * this.base.height * 4;
        var result = 0;
        var r, g, b, a;
        for (var i = 0; i < len; i += 4) {
            r = this.base.data[i + 0] - data[i + 0];
            g = this.base.data[i + 1] - data[i + 1];
            b = this.base.data[i + 2] - data[i + 2];
            a = this.base.data[i + 3] - data[i + 3];
            result += (r * r) + (g * g) + (b * b) + (a * a);
        }
        return (len * (255 * 255)) - result;
    };
    return ChromosomeFitnessCalculator;
}());
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
var Color_1 = __webpack_require__(/*! ./Color */ "./src/Color.ts");
var Circle = /** @class */ (function () {
    function Circle(_x, _y, _radius, _color) {
        if (_x === void 0) { _x = 0; }
        if (_y === void 0) { _y = 0; }
        if (_radius === void 0) { _radius = 0; }
        if (_color === void 0) { _color = new Color_1.default(); }
        this._x = _x;
        this._y = _y;
        this._radius = _radius;
        this._color = _color;
    }
    Object.defineProperty(Circle.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "color", {
        get: function () {
            return this._color;
        },
        enumerable: true,
        configurable: true
    });
    Circle.prototype.mutateLocation = function () {
        this._x = Math.random();
        this._y = Math.random();
    };
    Circle.prototype.mutateRadius = function () {
        this._radius = Math.random() * 0.3;
    };
    Circle.prototype.mutateColor = function () {
        this._color = Color_1.default.getRandomColor();
    };
    Circle.prototype.mutate = function (chance) {
        if (Math.random() * 100 < chance) {
            this.mutateLocation();
        }
        if (Math.random() * 100 < chance) {
            this.mutateRadius();
        }
        if (Math.random() * 100 < chance) {
            this.mutateColor();
        }
    };
    Circle.prototype.getClone = function () {
        return new Circle(this.x, this.y, this.radius, this.color);
    };
    Circle.getRandomCircle = function () {
        return new Circle(Math.random(), Math.random(), Math.random() * 0.3, Color_1.default.getRandomColor());
    };
    Circle.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ", " + this.radius + ", " + this.color + ")";
    };
    return Circle;
}());
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
var Color = /** @class */ (function () {
    function Color(_r, _g, _b, _a) {
        if (_r === void 0) { _r = 0; }
        if (_g === void 0) { _g = 0; }
        if (_b === void 0) { _b = 0; }
        if (_a === void 0) { _a = 0; }
        this._r = _r;
        this._g = _g;
        this._b = _b;
        this._a = _a;
        var limitNumber = function (n, min, max) { return Math.max(min, Math.min(max, n)); };
        this._r = Math.floor(limitNumber(this._r, 0, 255));
        this._g = Math.floor(limitNumber(this._g, 0, 255));
        this._b = Math.floor(limitNumber(this._b, 0, 255));
        this._a = limitNumber(this._a, 0, 1);
    }
    Color.getRandomColor = function () {
        var randInt = function (n) { return Math.floor(Math.random() * n); };
        return new Color(randInt(256), randInt(256), randInt(256), Math.random());
    };
    Object.defineProperty(Color.prototype, "r", {
        get: function () {
            return this._r;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "g", {
        get: function () {
            return this._g;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "b", {
        get: function () {
            return this._b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "a", {
        get: function () {
            return this._a;
        },
        enumerable: true,
        configurable: true
    });
    Color.prototype.toString = function () {
        return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
    };
    return Color;
}());
exports.default = Color;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Chromosome_1 = __webpack_require__(/*! ./Chromosome */ "./src/Chromosome.ts");
var ChromosomeFitnessCalculator_1 = __webpack_require__(/*! ./ChromosomeFitnessCalculator */ "./src/ChromosomeFitnessCalculator.ts");
var WebGLChromosomeRenderer_1 = __webpack_require__(/*! ./webgl/WebGLChromosomeRenderer */ "./src/webgl/WebGLChromosomeRenderer.ts");
var inMemoryCanvas1 = document.createElement('canvas');
var inMemoryCanvas2 = document.createElement('canvas');
var inMemoryContext1 = inMemoryCanvas1.getContext('webgl');
var inMemoryContext2 = inMemoryCanvas2.getContext('2d');
var stats = document.getElementById('stats');
window.loadImage = function (fileInput) {
    if (!fileInput.files[0])
        return;
    var img = document.getElementById('img');
    img.src = URL.createObjectURL(fileInput.files[0]);
    img.onload = function () {
        var c = document.getElementById('myCanvas');
        // let t = c.getContext('2d');
        var t = c.getContext('webgl');
        c.width = img.width;
        c.height = img.height;
        inMemoryCanvas1.width = img.width;
        inMemoryCanvas1.height = img.height;
        inMemoryCanvas2.width = img.width;
        inMemoryCanvas2.height = img.height;
        inMemoryContext2.drawImage(img, 0, 0);
        var baseImageData = inMemoryContext2.getImageData(0, 0, c.width, c.height);
        inMemoryContext2.clearRect(0, 0, c.width, c.height);
        var inMemoryRenderer = new WebGLChromosomeRenderer_1.default(inMemoryContext1);
        // const inMemoryRenderer = new Canvas2DChromosomeRenderer(inMemoryContext2);
        var fitnessCalc = new ChromosomeFitnessCalculator_1.default(inMemoryRenderer, baseImageData);
        var chromosomeSize = 300;
        var populationSize = 30;
        var BestPopulationCutOff = Math.floor(populationSize / 4);
        var generation = 0;
        var population = [];
        for (var i = 0; i < populationSize; i++)
            population.push(Chromosome_1.default.getRandomChromosome(chromosomeSize));
        // population.sort((a, b) => fitnessCalc.calculateFitness(b) - fitnessCalc.calculateFitness(a));
        function start() {
            var newPopulation = [];
            for (var i = 0; i < populationSize; i++) {
                var arg1 = population[Math.floor(Math.random() * populationSize) % BestPopulationCutOff];
                var arg2 = population[Math.floor(Math.random() * populationSize) % BestPopulationCutOff];
                var newChromosome = Chromosome_1.default.fromParents(arg1, arg2);
                newChromosome.mutate(0.1);
                newPopulation.push(newChromosome);
            }
            newPopulation.sort(function (a, b) { return fitnessCalc.calculateFitness(b) - fitnessCalc.calculateFitness(a); });
            population = newPopulation;
            generation++;
            // new WebGLChromosomeRenderer(t).render(population[0], c.width, c.height);
            var fitnessInPercent = 100 * fitnessCalc.calculateFitness(population[0]) / (c.width * c.height * 4 * (255 * 255));
            stats.innerHTML = ('fitness: ' + fitnessInPercent.toFixed(2) + '<br />Generation: ' + generation);
        }
        // new Canvas2DChromosomeRenderer(t).render(Chromosome.getRandomChromosome(chromosomeSize), c.width, c.height);
        new WebGLChromosomeRenderer_1.default(t).render(Chromosome_1.default.getRandomChromosome(chromosomeSize), c.width, c.height);
        // setInterval(start, 10);
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
var CircleTextureBuilder = /** @class */ (function () {
    function CircleTextureBuilder() {
    }
    CircleTextureBuilder.prototype.checkPowOf2 = function (n) {
        return n && (n & (n - 1)) === 0;
    };
    CircleTextureBuilder.prototype.calcDistance = function (x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    };
    CircleTextureBuilder.prototype.build = function (textureSize) {
        if (!this.checkPowOf2(textureSize))
            throw new Error("Texture Size Must Be A Power Of 2");
        var result = new ImageData(textureSize, textureSize);
        for (var row = 0; row < textureSize; row++) {
            for (var col = 0; col < textureSize; col++) {
                var val = 0;
                var x = col - textureSize / 2;
                var y = row - textureSize / 2;
                if (this.calcDistance(x, y, 0, 0) <= textureSize / 2)
                    val = 255;
                var pixelIndex = (row * textureSize + col) * 4;
                result.data[pixelIndex + 0] = val;
                result.data[pixelIndex + 1] = val;
                result.data[pixelIndex + 2] = val;
                result.data[pixelIndex + 3] = val;
            }
        }
        return result;
    };
    return CircleTextureBuilder;
}());
exports.default = CircleTextureBuilder;


/***/ }),

/***/ "./src/webgl/WebGLChromosomeRenderer.ts":
/*!**********************************************!*\
  !*** ./src/webgl/WebGLChromosomeRenderer.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CircleTextureBuilder_1 = __webpack_require__(/*! ./CircleTextureBuilder */ "./src/webgl/CircleTextureBuilder.ts");
var WebGLChromosomeRenderer = /** @class */ (function () {
    function WebGLChromosomeRenderer(renderingContext) {
        this.renderingContext = renderingContext;
        this.vsSource = "\n    attribute vec4 aVertexPosition;\n    attribute vec2 aTextureCoord;\n\n    uniform vec2 uResolution;\n\n    varying highp vec2 vTextureCoord;\n\n    void main() {\n        vec4 scaledPosition = aVertexPosition * vec4(1.0 / uResolution.x, 1.0 / uResolution.y, 1.0, 1.0);\n        gl_Position = scaledPosition + vec4(-1.0, -1.0, 0.0, 0.0);\n        vTextureCoord = aTextureCoord;\n    }";
        this.fsSource = "\n    varying highp vec2 vTextureCoord;\n\n    uniform sampler2D uSampler;\n\n    void main() {\n        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n        gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n    }";
        this.setup();
    }
    WebGLChromosomeRenderer.prototype.setup = function () {
        var gl = this.renderingContext;
        var vertexShader = this.loadShader(gl.VERTEX_SHADER, this.vsSource);
        var fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, this.fsSource);
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
                textureCoord: gl.getAttribLocation(this.shaderProgram, 'aTextureCoord')
            },
            uniformLocations: {
                resolution: gl.getUniformLocation(this.shaderProgram, 'uResolution'),
                uSampler: gl.getUniformLocation(this.shaderProgram, 'uSampler')
            },
        };
        this.circleTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.circleTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, new CircleTextureBuilder_1.default().build(256));
        gl.generateMipmap(gl.TEXTURE_2D);
    };
    WebGLChromosomeRenderer.prototype.loadShader = function (type, source) {
        var shader = this.renderingContext.createShader(type);
        this.renderingContext.shaderSource(shader, source);
        this.renderingContext.compileShader(shader);
        if (!this.renderingContext.getShaderParameter(shader, this.renderingContext.COMPILE_STATUS)) {
            var errorMessage = 'An error occurred compiling the shaders: ' + this.renderingContext.getShaderInfoLog(shader);
            this.renderingContext.deleteShader(shader);
            throw new Error(errorMessage);
        }
        return shader;
    };
    WebGLChromosomeRenderer.prototype.render = function (chromosome, width, height) {
        var gl = this.renderingContext;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, width, height);
        var positions = [
            0.0, 0.0,
            256.0, 0.0,
            0.0, 256.0,
            256.0, 256.0,
            256.0, 0.0,
            0.0, 256.0
        ];
        var texCoords = [
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0,
            1.0, 0.0,
            0.0, 1.0
        ];
        var positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
        var texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.programInfo.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.programInfo.attribLocations.textureCoord);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.circleTexture);
        gl.useProgram(this.shaderProgram);
        gl.uniform2fv(this.programInfo.uniformLocations.resolution, [width, height]);
        gl.uniform1i(this.programInfo.uniformLocations.uSampler, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    WebGLChromosomeRenderer.prototype.getImageData = function (width, height) {
        var buffer = new Uint8Array(width * height * 4);
        this.renderingContext.readPixels(0, 0, width, height, this.renderingContext.RGBA, this.renderingContext.UNSIGNED_BYTE, buffer);
        var result = new ImageData(Uint8ClampedArray.from(buffer), width, height);
        return result;
    };
    return WebGLChromosomeRenderer;
}());
exports.default = WebGLChromosomeRenderer;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map