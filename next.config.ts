import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

/**
 * Páginas estáticas não têm nonce por requisição, então os scripts inline do
 * Next exigem 'unsafe-inline'. O site não recebe entrada de usuário.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? ' ws:' : ''}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Dois layouts raiz (pt e en): o 404 global não depende de nenhum deles.
    globalNotFound: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  async redirects() {
    return [
      { source: '/pt', destination: '/', permanent: true },
      { source: '/en/projetos', destination: '/en/projects', permanent: true },
      { source: '/en/projetos/:slug', destination: '/en/projects/:slug', permanent: true },
      { source: '/projects', destination: '/projetos', permanent: true },
      { source: '/projects/:slug', destination: '/projetos/:slug', permanent: true },
    ]
  },
}

export default nextConfig
