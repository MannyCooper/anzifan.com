/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const { withPlaiceholder } = require("@plaiceholder/next");
const withPWA = require('next-pwa')({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
})


module.exports =
    withPWA(
        withPlaiceholder(
            {
                reactStrictMode: true,
                webpack(config) {
                    config.module.rules.push({
                        test: /\.svg$/,
                        use: ["@svgr/webpack"]
                    })
                    return config
                },
                images: {
                    domains: ['static.anzifan.com', 'cdn.sspai.com', 'cdn.dribbble.com', 'image.freepik.com', 'avatars.githubusercontent.com', 'cdn.jsdelivr.net', 'images.unsplash.com'],
                    remotePatterns: [
                        {
                            protocol: 'https',
                            hostname: '*.amazonaws.com',
                        },
                    ],
                },
            }
        )
    );