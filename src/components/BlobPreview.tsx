import type { GradientColors, BlobOptions, BlobState } from '@/types/blob';

export const BlobPreview: React.FC<{
    blobState: BlobState;
    blobRef: React.RefObject<HTMLDivElement | null>;
}> = ({ blobState, blobRef }) => {
    const { path, colors, isAnimated } = blobState;
    
    return (
        <div className="flex-1 flex justify-center items-center min-h-[500px]">
            <div className="relative">
                <div
                    ref={blobRef}
                    className={`w-96 h-96 transition-all duration-300 ${isAnimated ? 'animate-pulse' : ''}`}
                >
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="-120 -120 240 240"
                        className="w-full h-full"
                    >
                        <defs>
                            <linearGradient
                                id="blobGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                                gradientTransform={`rotate(${colors.angle})`}
                            >
                                <stop offset="0%" stopColor={colors.color1} />
                                <stop offset="100%" stopColor={colors.color2} />
                            </linearGradient>
                        </defs>
                        <path
                            d={path}
                            fill="url(#blobGradient)"
                            className="drop-shadow-lg"
                        />
                    </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full pointer-events-none opacity-30" />
            </div>
        </div>
    );
};