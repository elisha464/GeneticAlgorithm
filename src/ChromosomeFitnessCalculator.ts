import IChromosomeRenderer from "./interfaces/IChromosomeRenderer";
import Chromosome from "./Chromosome";

export default class ChromosomeFitnessCalculator {
    constructor(private renderer: IChromosomeRenderer, private base: ImageData) {}

    public async calculateFitness(chromosome: Chromosome, flipY: boolean = false): Promise<number> {
        await this.renderer.render(chromosome, this.base.width, this.base.height);
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
            for (let col = 0; col <  width; col++) {
                r = baseData[row * width * 4 + col * 4 + 0] - data[comparedRow * width * 4 + col * 4 + 0];
                g = baseData[row * width * 4 + col * 4 + 1] - data[comparedRow * width * 4 + col * 4 + 1];
                b = baseData[row * width * 4 + col * 4 + 2] - data[comparedRow * width * 4 + col * 4 + 2];
                a = baseData[row * width * 4 + col * 4 + 3] - data[comparedRow * width * 4 + col * 4 + 3];

                result += (r*r) + (g*g) + (b*b) + (a*a);
            }
        }

        return (width * height * 4 * (255*255)) - result;
    }
}