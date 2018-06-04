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
        var baseData = this.base.data;
        var data = this.renderer.getImageData(this.base.width, this.base.height).data;
        var len = this.base.width * this.base.height * 4;
        var result = 0;
        var r, g, b, a;
        for (var i = 0; i < len; i += 4) {
            r = baseData[i + 0] - data[i + 0];
            g = baseData[i + 1] - data[i + 1];
            b = baseData[i + 2] - data[i + 2];
            a = baseData[i + 3] - data[i + 3];
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
        this._a = Math.floor(limitNumber(this._a, 0, 255));
    }
    Color.getRandomColor = function () {
        var randInt = function (n) { return Math.floor(Math.random() * n); };
        return new Color(randInt(256), randInt(256), randInt(256), randInt(256));
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
    Color.prototype.toCssString = function () {
        return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a / 255 + ")";
    };
    return Color;
}());
exports.default = Color;


/***/ }),

/***/ "./src/FitnessedChromosome.ts":
/*!************************************!*\
  !*** ./src/FitnessedChromosome.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FitnessedChromosome = /** @class */ (function () {
    function FitnessedChromosome(chromosome, fitnessCalculator) {
        this.chromosome = chromosome;
        this._fitness = fitnessCalculator.calculateFitness(chromosome);
    }
    Object.defineProperty(FitnessedChromosome.prototype, "fitness", {
        get: function () {
            return this._fitness;
        },
        enumerable: true,
        configurable: true
    });
    return FitnessedChromosome;
}());
exports.default = FitnessedChromosome;


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
var FitnessedChromosome_1 = __webpack_require__(/*! ./FitnessedChromosome */ "./src/FitnessedChromosome.ts");
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
        var mainRenderer = new WebGLChromosomeRenderer_1.default(t);
        var inMemoryRenderer = new WebGLChromosomeRenderer_1.default(t);
        // const inMemoryRenderer = new Canvas2DChromosomeRenderer(inMemoryContext2);
        var fitnessCalc = new ChromosomeFitnessCalculator_1.default(inMemoryRenderer, baseImageData);
        var chromosomeSize = 300;
        var populationSize = 30;
        var BestPopulationCutOff = Math.floor(populationSize / 4);
        var generation = 0;
        var population = [];
        for (var i = 0; i < populationSize; i++)
            population.push(new FitnessedChromosome_1.default(Chromosome_1.default.getRandomChromosome(chromosomeSize), fitnessCalc));
        population.sort(function (a, b) { return b.fitness - a.fitness; });
        function start() {
            var newPopulation = [];
            for (var i = 0; i < populationSize; i++) {
                var arg1 = population[Math.floor(Math.random() * populationSize) % BestPopulationCutOff];
                var arg2 = population[Math.floor(Math.random() * populationSize) % BestPopulationCutOff];
                var newChromosome = Chromosome_1.default.fromParents(arg1.chromosome, arg2.chromosome);
                newChromosome.mutate(0.1);
                newPopulation.push(new FitnessedChromosome_1.default(newChromosome, fitnessCalc));
            }
            newPopulation.sort(function (a, b) { return b.fitness - a.fitness; });
            population = newPopulation;
            generation++;
            mainRenderer.render(population[0].chromosome, c.width, c.height);
            var fitnessInPercent = 100 * population[0].fitness / (c.width * c.height * 4 * (255 * 255));
            stats.innerHTML = ('fitness: ' + fitnessInPercent.toFixed(2) + '<br />Generation: ' + generation);
        }
        // new Canvas2DChromosomeRenderer(t).render(Chromosome.getRandomChromosome(chromosomeSize), c.width, c.height);
        // new WebGLChromosomeRenderer(t).render(Chromosome.getRandomChromosome(chromosomeSize), c.width, c.height);
        setInterval(start, 10);
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
                if (this.calcDistance(x, y, 0, 0) < (textureSize / 2) * 0.9)
                    val = 255;
                var pixelIndex = (row * textureSize + col) * 4;
                result.data[pixelIndex + 0] = 0;
                result.data[pixelIndex + 1] = 0;
                result.data[pixelIndex + 2] = 0;
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
var fillColols = function (arr, chromosome) {
    for (var i = 0; i < chromosome.circles.length; i++) {
        var color = chromosome.circles[i].color;
        for (var j = 0; j < 6; j++) {
            arr[i * 24 + j * 4 + 0] = color.r;
            arr[i * 24 + j * 4 + 1] = color.g;
            arr[i * 24 + j * 4 + 2] = color.b;
            arr[i * 24 + j * 4 + 3] = color.a;
        }
    }
};
var WebGLChromosomeRenderer = /** @class */ (function () {
    function WebGLChromosomeRenderer(renderingContext) {
        this.renderingContext = renderingContext;
        this.vsSource = "\n    attribute vec4 aVertexPosition;\n    attribute vec2 aTextureCoord;\n    attribute vec4 aVertexColor;\n\n    uniform vec2 uResolution;\n\n    varying highp vec2 vTextureCoord;\n    varying highp vec4 vVertexColor;\n\n    void main() {\n        vec4 scaledPosition = aVertexPosition * vec4(2.0 / uResolution.x, 2.0 / uResolution.y, 1.0, 1.0);\n        gl_Position = scaledPosition + vec4(-1.0, -1.0, 0.0, 0.0);\n        vTextureCoord = aTextureCoord;\n        vVertexColor = aVertexColor;\n    }";
        this.fsSource = "\n    varying highp vec2 vTextureCoord;\n    varying highp vec4 vVertexColor;\n\n    uniform sampler2D uSampler;\n\n    void main() {\n        gl_FragColor = vVertexColor / 255.0;\n        gl_FragColor *= texture2D(uSampler, vTextureCoord).a;\n    }";
        this.setup();
        this.insideCanvasContext = document.createElement('canvas').getContext('2d');
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
    };
    WebGLChromosomeRenderer.prototype.loadShader = function (type, source) {
        var gl = this.renderingContext;
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            var errorMessage = 'An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw new Error(errorMessage);
        }
        return shader;
    };
    WebGLChromosomeRenderer.prototype.render = function (chromosome, width, height) {
        var gl = this.renderingContext;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, width, height);
        var positionsFromCircle = function (c) {
            var x = c.x * width;
            var y = c.y * height;
            var radius = c.radius * Math.min(width, height);
            return [
                x - radius, y - radius,
                x + radius, y - radius,
                x - radius, y + radius,
                x + radius, y + radius,
                x + radius, y - radius,
                x - radius, y + radius
            ];
        };
        var positions = chromosome.circles.reduce(function (a, b) { return a.concat(positionsFromCircle(b)); }, []);
        var texCoords = new Float32Array(chromosome.circles.length * 6 * 2);
        for (var i = 0; i < chromosome.circles.length; i++) {
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
        var vertColors = new Uint8Array(chromosome.circles.length * 6 * 4);
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
    };
    WebGLChromosomeRenderer.prototype.flipRows = function (row1, row2, id) {
        var temp;
        for (var i = 0; i < id.width * 4; i++) {
            temp = id.data[row1 * id.width * 4 + i];
            id.data[row1 * id.width * 4 + i] = id.data[row2 * id.width * 4 + i];
            id.data[row2 * id.width * 4 + i] = temp;
        }
    };
    WebGLChromosomeRenderer.prototype.getImageData = function (width, height) {
        var result = new ImageData(width, height);
        var buffer = new Uint8Array(result.data.buffer);
        this.renderingContext.readPixels(0, 0, width, height, this.renderingContext.RGBA, this.renderingContext.UNSIGNED_BYTE, buffer);
        for (var i = 0; i < height / 2; i++) {
            this.flipRows(i, height - 1 - i, result);
        }
        return result;
    };
    return WebGLChromosomeRenderer;
}());
exports.default = WebGLChromosomeRenderer;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map