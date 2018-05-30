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

/***/ "./src/Canvas2DChromosomeRenderer.ts":
/*!*******************************************!*\
  !*** ./src/Canvas2DChromosomeRenderer.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Canvas2DChromosomeRenderer = /** @class */ (function () {
    function Canvas2DChromosomeRenderer(renderingContext) {
        this.renderingContext = renderingContext;
    }
    Canvas2DChromosomeRenderer.prototype.render = function (chromosome, width, height) {
        var _this = this;
        this.renderingContext.clearRect(0, 0, width, height);
        chromosome.circles.forEach(function (c) {
            _this.renderingContext.beginPath();
            _this.renderingContext.fillStyle = c.color.toString();
            _this.renderingContext.arc(c.x * width, c.y * height, c.radius * Math.min(width, height), 0, Math.PI * 2);
            _this.renderingContext.fill();
        });
    };
    Canvas2DChromosomeRenderer.prototype.getImageData = function (width, height) {
        return this.renderingContext.getImageData(0, 0, width, height);
    };
    return Canvas2DChromosomeRenderer;
}());
exports.default = Canvas2DChromosomeRenderer;


/***/ }),

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
var Canvas2DChromosomeRenderer_1 = __webpack_require__(/*! ./Canvas2DChromosomeRenderer */ "./src/Canvas2DChromosomeRenderer.ts");
var Chromosome_1 = __webpack_require__(/*! ./Chromosome */ "./src/Chromosome.ts");
var ChromosomeFitnessCalculator_1 = __webpack_require__(/*! ./ChromosomeFitnessCalculator */ "./src/ChromosomeFitnessCalculator.ts");
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
        var t = c.getContext('2d');
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
        // const inMemoryRenderer = new WebGLChromosomeRenderer(inMemoryContext1);
        var inMemoryRenderer = new Canvas2DChromosomeRenderer_1.default(inMemoryContext2);
        var fitnessCalc = new ChromosomeFitnessCalculator_1.default(inMemoryRenderer, baseImageData);
        var chromosomeSize = 50;
        var populationSize = 50;
        var BestPopulationCutOff = Math.floor(populationSize / 4);
        var generation = 0;
        var population = [];
        for (var i = 0; i < populationSize; i++)
            population.push(Chromosome_1.default.getRandomChromosome(chromosomeSize));
        population.sort(function (a, b) { return fitnessCalc.calculateFitness(b) - fitnessCalc.calculateFitness(a); });
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
            inMemoryRenderer.render(population[0], c.width, c.height);
            t.putImageData(inMemoryRenderer.getImageData(c.width, c.height), 0, 0);
            var fitnessInPercent = 100 * fitnessCalc.calculateFitness(population[0]) / (c.width * c.height * 4 * (255 * 255));
            stats.innerHTML = ('fitness: ' + fitnessInPercent.toFixed(2) + '<br />Generation: ' + generation);
        }
        // new Canvas2DChromosomeRenderer(t).render(Chromosome.getRandomChromosome(chromosomeSize), c.width, c.height);
        // new WebGLChromosomeRenderer(t).render(Chromosome.getRandomChromosome(chromosomeSize), c.width, c.height);
        setInterval(start, 10);
    };
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map