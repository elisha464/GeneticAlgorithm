import Chromosome from '../Chromosome'

export default interface IChromosomeRenderer {
    render(chromosome: Chromosome, width: number, height: number): Promise<void>;
    getImageData(width: number, height: number): ImageData;
}