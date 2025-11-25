import type {NextConfig} from 'next';
import withPWA from 'next-pwa';

const withPWAConfig = withPWA({
	dest: 'public',
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {
	output: 'standalone',

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'w.ladicdn.com',
				pathname: '/**',
			},
		],
	},
};

export default withPWAConfig(nextConfig as any);
