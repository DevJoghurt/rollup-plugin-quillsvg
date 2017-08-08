import {
	readFileSync
} from 'fs';
import {
	extname
} from 'path';
import {
	createFilter
} from 'rollup-pluginutils'

export default function quillsvg(options = {}) {
	const filter = createFilter(options.include, options.exclude)

	return {
		name: 'quillsvg',

		load(id) {

			if (!filter(id) || extname(id) !== '.svg') {
				return null
			}

			var data = readFileSync(id, 'utf-8');
			const exported = "export default " + "`" + data + "`";

			return {
				code: exported,
				map: {
					mappings: ''
				}
			}
		}
	}
}