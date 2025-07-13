interface BlobOptions {
    complexity: number;
    contrast: number;
}

interface GradientColors {
    color1: string;
    color2: string;
    angle: number;
}

interface BlobState {
    path: string;
    colors: GradientColors;
    options: BlobOptions;
    isAnimated: boolean;
}