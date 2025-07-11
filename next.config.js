/** @type {import('next').NextConfig} */
const nextConfig = {
};
const isExport = process.env.OUTPUT_EXPORT === '1';

module.exports = {
  compiler: {
    styledComponents: true,
  },
  ...(isExport ? { output: 'export' } : {})
};
