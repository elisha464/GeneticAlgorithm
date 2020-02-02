import Circle from './Circle'

export default class Chromosome {
    public constructor(public circles: Circle[]) {}

    public mutate(chance: number): void {
        this.circles.forEach(c => c.mutate(chance));
    }

    public getClone(): Chromosome {
        return new Chromosome(this.circles.map(c => c.getClone()));
    }

    public static getRandomChromosome(size: number): Chromosome {
        const randomCircles: Circle[] = [];
        for (let i = 0; i < size; i++) randomCircles.push(Circle.getRandomCircle());
        return new Chromosome(randomCircles);
    }

    public static fromParents(c1: Chromosome, c2: Chromosome): Chromosome {
        if (c1.circles.length !== c2.circles.length) throw new Error('Parents are not compatible');
        const loopMax: number = c1.circles.length;
        const randomParent = () => (Math.random() < 0.5) ? c1 : c2;
        const circles: Circle[] = [];
        for (let i=0; i < loopMax; i++) circles.push(randomParent().circles[i].getClone());
        return new Chromosome(circles);
    }
}