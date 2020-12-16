export class IImage {
    id: number;
    name: string;
    type: string;
    data: File;

    public constructor(init?: Partial<IImage>) {
        Object.assign(this, init);
    }
}
