import Chromosome from "./Chromosome";
import ChromosomeFitnessCalculator from "./ChromosomeFitnessCalculator";

export default class FitnessedChromosome {
    constructor(public chromosome: Chromosome, public fitness: number) {
    }
}