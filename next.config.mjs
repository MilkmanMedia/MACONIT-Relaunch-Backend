import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Add production media domains here once storage (e.g. S3/Vercel Blob) is configured.
    ],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
