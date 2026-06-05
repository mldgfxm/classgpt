# 构建阶段
FROM node:20-alpine AS builder
WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm ci

# 复制源码并构建
COPY . .
RUN npm run build

# 运行阶段
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# 只复制运行需要的文件（standalone 模式）
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

# standalone 模式使用 node server.js 启动
CMD ["node", "server.js"]
