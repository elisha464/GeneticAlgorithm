import Color from './Color'

export default class Circle {
    public constructor(
        private _x: number = 0, 
        private _y: number = 0, 
        private _radius: number = 0, 
        private _color: Color = new Color()) {}

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get radius(): number {
        return this._radius;
    }

    public get color(): Color {
        return this._color;
    }

    private mutateLocation(): void {
        this._x = Math.random();
        this._y = Math.random();
    }

    private mutateRadius(): void {
        this._radius = Math.random() * 0.3;
    }

    private mutateColor(): void {
        this._color = Color.getRandomColor();
    }

    public mutate(chance: number): void {
        if(Math.random() * 100 < chance) {
            this.mutateLocation();
        }

        if(Math.random() * 100 < chance) {
            this.mutateRadius();
        }

        if(Math.random() * 100 < chance) {
            this.mutateColor();
        }
    }

    public getClone(): Circle {
        return new Circle(this.x, this.y, this.radius, this.color);
    }

    public static getRandomCircle(): Circle {
        return new Circle(Math.random(), Math.random(), Math.random() * 0.3, Color.getRandomColor());
    }

    public toString(): string {
        return `(${this.x}, ${this.y}, ${this.radius}, ${this.color})`;
    }
}