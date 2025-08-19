import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/ru',
        destination: '/ru/1',
        permanent: true,
      },
      {
        source: '/en',
        destination: '/en/1',
        permanent: true,
      },
    ];
  },
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
