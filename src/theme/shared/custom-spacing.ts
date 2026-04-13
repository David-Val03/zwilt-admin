export const rem = (value: number): string => `${value}rem`;

export interface ICustomSpacing {
    rem: (value: number) => string;
}

const customSpacing: ICustomSpacing = {
    rem,
};

export default customSpacing;
