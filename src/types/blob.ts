export interface BlobOptions {
    complexity: number;
    contrast: number;
}

export interface GradientColors {
    color1: string;
    color2: string;
    angle: number;
}

export interface BlobState {
    path: string;
    colors: GradientColors;
    options: BlobOptions;
    isAnimated: boolean;
}