import withMdx from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
};

export default withMdx({
    extension: /\.mdx?$/,
})(nextConfig);
