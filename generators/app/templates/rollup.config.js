import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve} from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import styles from 'rollup-plugin-styles';
import copy from 'rollup-plugin-copy';
import cleanup from 'rollup-plugin-cleanup'
import visualizer from 'rollup-plugin-visualizer';

const buildPath = 'build';

const metadata = require('./resources/metadata.json');

const extensionBanner = `
try {
`;

const extensionFooter = `
}
catch(err) {
    log(\`[${metadata.name}] [init] \$\{err\}\`);
    imports.ui.main.notify('${metadata.name}', \`\$\{err\}\`);
    throw err;
}
`;

export default [
    {
        input: 'src/extension.ts',
        treeshake: {
            moduleSideEffects: 'no-external'
        },
        output: {
            file: `${buildPath}/extension.js`,
            format: 'iife',
            name: 'init',
            banner: extensionBanner,
            footer: extensionFooter,
            exports: 'default',
            assetFileNames: '[name][extname]'
        },
        plugins: [
            commonjs(),
            nodeResolve({
                preferBuiltins: false,
            }),
            typescript({
                tsconfig: './tsconfig.json',
            }),
            styles({
                mode: ['extract', 'stylesheet.css'],
            }),
            copy({
                targets: [
                    { src: 'resources/metadata.json', dest: `${buildPath}`}
                ]
            }),
            cleanup({
                comments: 'none'
            }),
            visualizer()
        ]
    },
    {
        input: 'src/prefs/prefs.ts',
        output: {
            file: `${buildPath}/prefs.js`,
            format: 'iife',
            exports: 'default',
            name: 'prefs',
            banner: '',
            footer: '',
        },
        treeshake: {
            moduleSideEffects: 'no-external'
        },
        plugins: [
            commonjs(),
            nodeResolve({
                preferBuiltins: false,
            }),
            typescript({
                tsconfig: './tsconfig.json',
            }),
            cleanup({
                comments: 'none',
            })
        ]
    }
];