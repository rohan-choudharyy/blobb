'use client'
import React, { useRef } from 'react';
import Head from 'next/head';
import { ControlPanel } from '@/components/ControlPanel';
import { BlobPreview } from '@/components/BlobPreview';
import { useBlobGenerator } from '../hooks/useBlobGenerator';
import { useExport } from '@/hooks/useExport';

export const Home: React.FC = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  const { blobState, regenerateBlob, updateColors, updateOptions, toggleAnimation } = useBlobGenerator();
  const { isExporting, exportAsPNG, exportAsSVG } = useExport();

  const handleExportPNG = () => {
    exportAsPNG(blobRef.current);
  };

  const handleExportSVG = () => {
    exportAsSVG(blobState);
  };

  return (
    <>
      <Head>
        <title>Blob + Gradient Generator</title>
        <meta name="description" content="Create beautiful organic shapes with smooth gradients" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Blob + Gradient Generator
            </h1>
            <p className="text-gray-400">Create beautiful organic shapes with smooth gradients</p>
          </header>
          <main className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            <ControlPanel
              blobState={blobState}
              onUpdateColors={updateColors}
              onUpdateOptions={updateOptions}
              onToggleAnimation={toggleAnimation}
              onRegenerateBlob={regenerateBlob}
              onExportPNG={handleExportPNG}
              onExportSVG={handleExportSVG}
              isExporting={isExporting}
            />
            <BlobPreview blobState={blobState} blobRef={blobRef} />
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
