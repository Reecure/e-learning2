/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ["en", "es"],
        defaultLocale: "en",
    },
    reactStrictMode: false,
    images: {
        domains: ["images.unsplash.com", "s3.ap-southeast-1.amazonaws.com", "miro.medium.com", "uploadthing.com", "utfs.io"]
    },
    experimental: {
        esmExternals: false, // THIS IS THE FLAG THAT MATTERS
    },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;