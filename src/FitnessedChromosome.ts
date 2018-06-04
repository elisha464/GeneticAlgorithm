import Chromosome from "./Chromosome";
import ChromosomeFitnessCalculator from "./ChromosomeFitnessCalculator";

export default class FitnessedChromosome {
    private _fitness: number;

    constructor(public chromosome: Chromosome, fitnessCalculator: ChromosomeFitnessCalculator) {
        this._fitness = fitnessCalculator.calculateFitness(chromosome);
    }

    get fitness() {
        return this._fitness;
    }
}