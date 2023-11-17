
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["utfs.io"]
    },
    experimental: {
        esmExternals: false, // THIS IS THE FLAG THAT MATTERS
    },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;