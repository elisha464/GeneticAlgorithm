import Canvas2DChromosomeRenderer from './Canvas2DChromosomeRenderer';
import Chromosome from './Chromosome';
import ChromosomeFitnessCalculator from './ChromosomeFitnessCalculator';
import WebGLChromosomeRenderer from './webgl/WebGLChromosomeRenderer';
import CircleTextureBuilder from './webgl/CircleTextureBuilder';
import FitnessedChromosome from './FitnessedChromosome';

let inMemoryCanvas1 = document.createElement('canvas');
let inMemoryCanvas2 = document.createElement('canvas');
let inMemoryContext1 = inMemoryCanvas1.getContext('webgl');
let inMemoryContext2 = inMemoryCanvas2.getContext('2d');
var stats = document.getElementById('stats');

(<any>window).loadImage = function(fileInput: HTMLInputElement) {
    if (!fileInput.files[0]) return;

    let img = <HTMLImageElement>document.getElementById('img');
    img.src = URL.createObjectURL(fileInput.files[0]);

    img.onload = function() {
        var c = <HTMLCanvasElement>document.getElementById('myCanvas');
        let t = c.getContext('webgl');

        c.width = img.width;
        c.height = img.height;

        inMemoryCanvas1.width = img.width;
        inMemoryCanvas1.height = img.height;

        inMemoryCanvas2.width = img.width;
        inMemoryCanvas2.height = img.height;
        inMemoryContext2.drawImage(img, 0, 0);
        var baseImageData =  inMemoryContext2.getImageData(0, 0, c.width, c.height);
        inMemoryContext2.clearRect(0, 0, c.width, c.height);

        const mainRenderer = new WebGLChromosomeRenderer(t);
        const inMemoryRenderer = new WebGLChromosomeRenderer(t);
        // const inMemoryRenderer = new Canvas2DChromosomeRenderer(inMemoryContext2);
        const fitnessCalc = new ChromosomeFitnessCalculator(inMemoryRenderer, baseImageData);
        const chromosomeSize = 300;

        var populationSize = 30;
        var BestPopulationCutOff = Math.floor(populationSize/4);
        var generation = 0;

        let population: FitnessedChromosome[] = [];
        for (let i = 0; i < populationSize; i++) population.push(new FitnessedChromosome(Chromosome.getRandomChromosome(chromosomeSize), fitnessCalc));
        population.sort((a, b) => b.fitness - a.fitness);

        function start() {
            var newPopulation: FitnessedChromosome[] = [];
            
            for(let i = 0; i < populationSize; i++) {   
                const arg1 = population[Math.floor(Math.random() * populationSize) % BestPopulationCutOff];
                const arg2 = population[Math.floor(Math.random() * populationSize) % BestPopulationCutOff];
                const newChromosome = Chromosome.fromParents(arg1.chromosome, arg2.chromosome);
                newChromosome.mutate(0.1);
                newPopulation.push(new FitnessedChromosome(newChromosome, fitnessCalc));
            }
            
            newPopulation.sort((a, b) => b.fitness - a.fitness);
            population = newPopulation;
            generation++;
            mainRenderer.render(population[0].chromosome, c.width, c.height);
            let fitnessInPercent = 100 * population[0].fitness / (c.width * c.height * 4 * (255*255));
            stats.innerHTML = ('fitness: ' + fitnessInPercent.toFixed(2) + '<br />Generation: ' + generation);
        }

        // new Canvas2DChromosomeRenderer(t).render(Chromosome.getRandomChromosome(chromosomeSize), c.width, c.height);
        // new WebGLChromosomeRenderer(t).render(Chromosome.getRandomChromosome(chromosomeSize), c.width, c.height);
        setInterval(start, 10);
    }
}