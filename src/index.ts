import type { Plugin } from "rolldown";
export const claspPlugin = (outputFileName: string): Plugin => ({
	name: "clasp",
	generateBundle: {
		handler(_outputOptions, bundle, _isWrite) {
			const chunk = bundle[outputFileName];
			if (!chunk || chunk.type !== "chunk") return;
			const { code } = chunk;
			chunk.code = code.replace(/\n\/\/\#endregion\nexport \{[\S\s]+?\};*/m, "");
		},
	},
});
