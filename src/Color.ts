export default class Color {
    public constructor(private _r = 0, private _g = 0, private _b = 0, private _a = 0) {
        const limitNumber = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))
        this._r = Math.floor(limitNumber(this._r, 0, 255));
        this._g = Math.floor(limitNumber(this._g, 0, 255));
        this._b = Math.floor(limitNumber(this._b, 0, 255));
        this._a = Math.floor(limitNumber(this._a, 0, 255));
    }

    public static getRandomColor(): Color {
        const randInt = (n: number) => Math.floor(Math.random() * n);
        return new Color(randInt(256), randInt(256), randInt(256), randInt(256));
    }

    public get r(): number {
        return this._r;
    }

    public get g(): number {
        return this._g;
    }

    public get b(): number {
        return this._b;
    }

    public get a(): number {
        return this._a;
    }

    public toCssString(): string {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a/255})`;
    }
}