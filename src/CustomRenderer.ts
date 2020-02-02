import IChromosomeRenderer from "./interfaces/IChromosomeRenderer";
import Chromosome from "./Chromosome";

function calcDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2))
}

export default class implements IChromosomeRenderer {
    private data : ImageData

    constructor(private renderingContext: CanvasRenderingContext2D = null) {}

    private renderPixel(chromosome: Chromosome, width: number, height: number, row: number, col: number): void {
        for(let i = 0; i < chromosome.circles.length; i++) {
            const currCircle = chromosome.circles[i]
            const scaledRadius = currCircle.radius * Math.min(width, height)
            const scaledX = currCircle.x * width
            const scaledY = currCircle.y * height
            if (calcDistance(col, row, scaledX, scaledY) <= scaledRadius) {
            // if (scaledX - scaledRadius <= col && col <= scaledX + scaledRadius && scaledY - scaledRadius <= row && row <= scaledY + scaledRadius) {
                this.data.data[row * width * 4 + col * 4 + 0] = currCircle.color.r
                this.data.data[row * width * 4 + col * 4 + 1] = currCircle.color.g
                this.data.data[row * width * 4 + col * 4 + 2] = currCircle.color.b
                this.data.data[row * width * 4 + col * 4 + 3] = currCircle.color.a
            }
        }
        
    }

    public async render(chromosome: Chromosome, width: number, height: number): Promise<void> {
        this.data = new ImageData(width, height)

        for(let row = 0; row < height; row++) {
            for(let col = 0; col < width; col++) {
                this.renderPixel(chromosome, width, height, row, col)
            }
        }

        if (this.renderingContext) {
            this.renderingContext.putImageData(this.data, 0, 0)
        }
    }

    public getImageData(width: number, height: number): ImageData {
        return this.data
    }
}