import { Slider } from './Slider';
import { ColorPicker } from './ColorPicker';
import { Button } from './Button';
import type { GradientColors, BlobOptions, BlobState } from '@/types/blob';


export const ControlPanel: React.FC<{
  blobState: BlobState;
  onUpdateColors: (updates: Partial<GradientColors>) => void;
  onUpdateOptions: (updates: Partial<BlobOptions>) => void;
  onToggleAnimation: () => void;
  onRegenerateBlob: () => void;
  onExportPNG: () => void;
  onExportSVG: () => void;
  isExporting: boolean;
}> = ({
  blobState,
  onUpdateColors,
  onUpdateOptions,
  onToggleAnimation,
  onRegenerateBlob,
  onExportPNG,
  onExportSVG,
  isExporting,
}) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 w-full lg:w-80 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-200">Blob Options</h3>
        <Slider
          label="Complexity"
          value={blobState.options.complexity}
          min={4}
          max={12}
          onChange={(value) => onUpdateOptions({ complexity: value })}
          leftLabel="Simple"
          rightLabel="Complex"
        />
        <Slider
          label="Contrast"
          value={blobState.options.contrast}
          min={0.1}
          max={1}
          step={0.1}
          onChange={(value) => onUpdateOptions({ contrast: value })}
          leftLabel="Smooth"
          rightLabel="Sharp"
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-200">Gradient Colors</h3>
        <ColorPicker
          label="Color 1"
          value={blobState.colors.color1}
          onChange={(value) => onUpdateColors({ color1: value })}
        />
        <ColorPicker
          label="Color 2"
          value={blobState.colors.color2}
          onChange={(value) => onUpdateColors({ color2: value })}
        />
        <Slider
          label="Gradient Angle"
          value={blobState.colors.angle}
          min={0}
          max={360}
          onChange={(value) => onUpdateColors({ angle: value })}
          displayValue={`${blobState.colors.angle}°`}
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-200">Animation</h3>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={blobState.isAnimated}
            onChange={onToggleAnimation}
            className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-2"
          />
          <span className="text-sm text-gray-300">Animate blob shape</span>
        </label>
      </div>
      <div className="space-y-3 pt-4">
        <Button onClick={onRegenerateBlob}>
          Generate New Blob
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={onExportPNG}
            variant="success"
            disabled={isExporting}
          >
            {isExporting ? 'Exporting...' : 'Export PNG'}
          </Button>
          <Button
            onClick={onExportSVG}
            variant="success"
            disabled={isExporting}
          >
            Export SVG
          </Button>
        </div>
      </div>
    </div>
  );
};
