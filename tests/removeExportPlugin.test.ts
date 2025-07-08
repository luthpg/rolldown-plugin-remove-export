import { createRequire } from "node:module";
import type { OutputChunk, Plugin } from "rolldown";
import { describe, expect, it } from "vitest";
import { removeExportPlugin } from "../src/index.js";

describe("removeExportPlugin", () => {
	const packageJson = createRequire(import.meta.url)("./../package.json");

	it("transpiledコメントとエクスポート削除が行われる", () => {
		// モックのoutputBundle
		const codeBefore = `const a = 1;\n//#endregion\nexport { a };`;
		const chunk: OutputChunk = {
			code: codeBefore,
			fileName: "out.js",
			// OutputChunkの他の必須プロパティは適宜追加
		} as any;
		const outputBundle = { "out.js": chunk };

		// プラグインのgenerateBundle呼び出し
		const plugin: Plugin = removeExportPlugin("out.js") as Plugin;
		typeof plugin?.generateBundle === "function" &&
			// @ts-expect-error
			plugin.generateBundle({}, outputBundle);

		// 結果検証
		expect(chunk.code).toContain(
			`// transpile from ${packageJson.name}@${packageJson.version}`,
		);
		expect(chunk.code).not.toContain("export { a }");
		expect(chunk.code).toContain("const a = 1;");
	});
});
