import { createProxyMiddleware } from "http-proxy-middleware"; // @2.0.6

const proxy = createProxyMiddleware({
  target: process.env.BACKEND_URL,
  secure: false,
  pathRewrite: { "^/api/proxy": "" }, // remove `/api/proxy` prefix
});

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
}