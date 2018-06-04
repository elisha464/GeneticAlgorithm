import IChromosomeRenderer from "./interfaces/IChromosomeRenderer";
import Chromosome from "./Chromosome";

export default class ChromosomeFitnessCalculator {
    constructor(private renderer: IChromosomeRenderer, private base: ImageData) {}

    public calculateFitness(chromosome: Chromosome): number {
        this.renderer.render(chromosome, this.base.width, this.base.height);
        const baseData = this.base.data;
        const data = this.renderer.getImageData(this.base.width, this.base.height).data;
        const len = this.base.width * this.base.height * 4;
        let result = 0;

        let r, g, b, a;

        for (let i=0; i < len; i += 4) {
            r = baseData[i + 0] - data[i + 0];
            g = baseData[i + 1] - data[i + 1];
            b = baseData[i + 2] - data[i + 2];
            a = baseData[i + 3] - data[i + 3];
            result += (r*r) + (g*g) + (b*b) + (a*a);
        }

        return (len * (255*255)) - result;
    }
}