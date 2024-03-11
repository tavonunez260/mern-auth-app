import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';

export default ({ mode }: { mode: string }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		plugins: [react(), splitVendorChunkPlugin()],
		resolve: {
			alias: {
				src: '/src',
				components: '/src/components',
				assets: '/src/assets',
				pages: '/src/pages',
				utils: '/src/utils',
				store: '/src/store',
				context: '/src/context',
				firebaseConfig: '/src/firebaseConfig.ts',
				types: '/src/types.d.ts'
			}
		},
		server: {
			proxy: {
				'/api': {
					target: 'http://localhost:4000/',
					secure: false
				}
			}
		},
		build: {
			outDir: 'dist',
			sourcemap: false
		}
	});
};
