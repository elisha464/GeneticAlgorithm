import IChromosomeRenderer from "./interfaces/IChromosomeRenderer";
import Chromosome from "./Chromosome";

export default class Canvas2DChromosomeRenderer implements IChromosomeRenderer {
    constructor(private renderingContext: CanvasRenderingContext2D) {}

    public async render(chromosome: Chromosome, width: number, height: number): Promise<void> {
        this.renderingContext.clearRect(0, 0, width, height);
        chromosome.circles.forEach(c => {
            this.renderingContext.beginPath();
            this.renderingContext.fillStyle = c.color.toCssString();
            this.renderingContext.arc(c.x * width, c.y * height, c.radius * Math.min(width, height), 0, Math.PI * 2);
            this.renderingContext.fill();
        });
    }

    public getImageData(width: number, height: number): ImageData {
        return this.renderingContext.getImageData(0, 0, width, height);
    }
}