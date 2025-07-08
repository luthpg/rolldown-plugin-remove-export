import { createRequire } from "node:module";
import type { OutputChunk, RolldownPlugin } from "rolldown";

export const removeExportPlugin = (outputFileName: string): RolldownPlugin => ({
	name: "remove-export",
	generateBundle(_outputOptions, outputBundle) {
		const packageJson = createRequire(import.meta.url)("./../package.json");
		const chunk = outputBundle[outputFileName] as OutputChunk;
		chunk.code = `// transpile from ${packageJson.name}@${packageJson.version}\n${chunk.code.replace(/\n\/\/#endregion\nexport \{ .+ \};$/, "")}`;
	},
});

export default removeExportPlugin;
