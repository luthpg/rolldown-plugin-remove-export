import type { OutputChunk, RolldownPlugin } from 'rolldown';

export const removeExportPlugin = (outputFileName: string): RolldownPlugin => ({
  name: 'remove-export',
  generateBundle(_outputOptions, outputBundle) {
    const chunk = outputBundle[outputFileName] as OutputChunk;
    if (!chunk) {
      console.error(`chunk not found: ${outputFileName}`);
      return;
    }
    chunk.code = `${chunk.code.replace(/\n\/\/#endregion\nexport \{ .+ \};$/m, '\n//#endregion')}`;
  },
});
