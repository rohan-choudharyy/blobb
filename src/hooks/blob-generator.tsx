import { useState, useCallback } from 'react';

const DEFAULT_COLORS: GradientColors = {
    color1: '#ff00aa',
    color2: '#3366ff',
    angle: 135,
};

const DEFAULT_OPTIONS: BlobOptions = {
    complexity: 8,
    contrast: 0.7,
};

const DEFAULT_PATH = "M60,-76.4C75.5,-66.8,84.4,-45.2,88.1,-22.4C91.8,0.4,90.3,24.4,81.9,44.8C73.5,65.2,58.2,81.9,38.6,89.4C19,96.9,-4.9,95.1,-26.3,87.8C-47.7,80.5,-66.6,67.7,-77.8,49.2C-89,30.7,-92.5,6.5,-89.7,-16.3C-86.9,-39.1,-77.8,-60.5,-62.3,-70.1C-46.8,-79.7,-23.4,-77.5,-0.7,-76.6C21.9,-75.7,43.8,-76.1,60,-76.4Z";

const useBlobGenerator = () => {
    const [blobState, setBlobState] = useState<BlobState>({
        path: DEFAULT_PATH,
        colors: DEFAULT_COLORS,
        options: DEFAULT_OPTIONS,
        isAnimated: false,
    });

    const generateBlobPath = useCallback((complexity: number, contrast: number): string => {
        const points = [];
        const angleStep = (Math.PI * 2)/ complexity;

        for (let i = 0; i < complexity; i++){
            const angle = i * angleStep;
            const radius = 80 + (Math.random() - 0.5) * contrast * 60;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            points.push({ x, y });
        }

        let path = `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;

        for (let i = 1; i < points.length; i++){
            const prev = points[i - 1];
            const current = points[i];
            const next = points[i + 1] || points[0];

            const cp1x = prev.x + (current.x - prev.x) * 0.5;
            const cp1y = prev.y + (current.y - prev.y) * 0.5;
            const cp2x = current.x - (next.x - current.x) * 0.3;
            const cp2y = current.y - (next.y - current.y) * 0.3;
            
            path += `C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${current.x.toFixed(1)},${current.y.toFixed(1)}`;
        }

        const last = points[points.length - 1];
        const first = points[0];
        const cp1x = last.x + (first.x - last.x) * 0.5;
        const cp1y = last.y + (first.y - last.y) * 0.5;
        const cp2x = first.x - (first.x - last.x) * 0.3;
        const cp2y = first.y - (first.y - last.y) * 0.3;

        path += `C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${first.x.toFixed(1)},${first.y.toFixed(1)}Z`;

        return path;
    }, []);

    const regenerateBlob = useCallback(() => {
        const newPath = generateBlobPath(blobState.options.complexity, blobState.options.contrast);
        setBlobState(prev => ({ ...prev, path: newPath}));
    }, [blobState.options.complexity, blobState.options.contrast, generateBlobPath]);

    const updateColors = useCallback((updates: Partial<GradientColors>) => {
        setBlobState(prev => ({
            ...prev,
            colors: { ...prev.colors, ...updates}
        }));
    }, []);

    const updateOptions = useCallback((updates: Partial<BlobOptions>) => {
        setBlobState(prev => ({
            ...prev,
            options: { ...prev.options, ...updates}
        }));
    }, []);

    const toggleAnimation = useCallback(() => {
        setBlobState(prev => ({ ...prev, isAnimated: !prev.isAnimated }));
    }, []);

    return{
        blobState,
        regenerateBlob,
        updateColors,
        updateOptions,
        toggleAnimation,
    };
};
