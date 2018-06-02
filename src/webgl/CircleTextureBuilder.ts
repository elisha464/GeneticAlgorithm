class CircleTextureBuilder {
    constructor() {

    }

    private checkPowOf2(n: number): boolean {
        return n && (n & (n-1)) === 0;
    }

    private calcDistance(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt((x2-x1) * (x2-x1) + (y2-y1) * (y2-y1));
    }

    build(textureSize: number): Uint8Array {
        if(!this.checkPowOf2(textureSize)) throw new Error("Texture Size Must Be A Power Of 2");

        let result = new Uint8Array(textureSize * textureSize);

        for (let row = 0; row < textureSize; row++) {
            for (let col = 0; col < textureSize; col++) {
                let val = 0;
                let x = col - textureSize / 2;
                let y = row - textureSize / 2;
                if (this.calcDistance(x, y, 0, 0) <= textureSize / 2) val = 255;
                result[row * textureSize + col] = val;
            }
        }

        return result;
    }
}