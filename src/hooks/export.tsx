import { useState, useCallback } from "react";
import { toPng } from "html-to-image";

const useExport = () => {
    const [isExporting, setIsExporting] = useState(false);

    const exportAsPNG = useCallback(async (element: HTMLElement | null) => {
        if (!element) return;

        setIsExporting(true);

        try{
            const dataUrl = await toPng(element, {
                backgroundColor: 'transparent',
                width: 400,
                height: 400,
                pixelRatio: 2,
            });

            const link = document.createElement('a');
            link.download = `blob-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
        } catch(error){
            console.error('PNG export failed:', error);
        } finally {
            setIsExporting(false);
        }
    }, []);

    const exportAsSVG = useCallback((blobState: BlobState) => {
        setIsExporting(true);

        try{
            const { path, colors } = blobState;
            const gradientId = `gradient-${Date.now()}`;

            const svgContent = `<svg width="400" height="400" viewBox="-150 -150 300 300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${colors.angle})">
              <stop offset="0%" style="stop-color:${colors.color1};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${colors.color2};stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="${path}" fill="url(#${gradientId})" />
        </svg>`.trim();

        const blob = new Blob([svgContent], { type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.download = `blob-${Date.now()}.svg`;
        link.href = url;
        link.click();

        URL.revokeObjectURL(url);
        } catch (error){
            console.error('SVG export failed:', error);
        } finally {
            setIsExporting(false);
        }
    }, []);

    return{
        isExporting,
        exportAsPNG,
        exportAsSVG,
    }
}