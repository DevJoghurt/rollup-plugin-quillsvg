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

		transform(code, id) {

			if (!filter(id) || extname(id) !== '.svg') {
				return null
			}

			const mime = 'image/svg+xml'
			const buffer = Buffer.from(code.trim(), 'utf-8')
			const encoded = buffer.toString('base64')
			const exported = `export default '<img src="data:${mime};base64,${encoded}">'`

			return {
				code: exported,
				map: {
					mappings: ''
				}
			}
		}
	}
}