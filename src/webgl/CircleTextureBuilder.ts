export default class CircleTextureBuilder {
    constructor() {

    }

    private checkPowOf2(n: number): boolean {
        return n && (n & (n-1)) === 0;
    }

    private calcDistance(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt((x2-x1) * (x2-x1) + (y2-y1) * (y2-y1));
    }

    build(textureSize: number): ImageData {
        if(!this.checkPowOf2(textureSize)) throw new Error("Texture Size Must Be A Power Of 2");

        let result = new ImageData(textureSize, textureSize);

        for (let row = 0; row < textureSize; row++) {
            for (let col = 0; col < textureSize; col++) {
                let val = 0;
                let x = col - textureSize / 2;
                let y = row - textureSize / 2;
                if (this.calcDistance(x, y, 0, 0) < (textureSize / 2) * 0.9) val = 255;

                let pixelIndex = (row * textureSize + col) * 4;
                result.data[pixelIndex + 0] = 0;
                result.data[pixelIndex + 1] = 0;
                result.data[pixelIndex + 2] = 0;
                result.data[pixelIndex + 3] = val;
            }
        }

        return result;
    }
}