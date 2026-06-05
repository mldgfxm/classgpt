# ClassGPT Deployment Runbook

## 方式一：Docker Compose 部署（推荐自有服务器）

适用于自有服务器或 VPS，推荐配置 2核2G 以上。

### 服务器准备

```bash
# 安装 Docker
sudo apt update
sudo apt install -y docker.io docker-compose
sudo systemctl enable docker
sudo systemctl start docker

# 添加 Swap（2G 内存建议加）
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 上传项目

```bash
# 本地打包（排除 node_modules）
tar -czf classgpt.tar.gz --exclude=node_modules --exclude=.next --exclude=.open-next --exclude=.git .

# 上传到服务器
scp classgpt.tar.gz root@你的服务器IP:/opt/

# 服务器上解压
sudo mkdir -p /opt/classgpt
cd /opt/classgpt
sudo tar -xzf /opt/classgpt.tar.gz
```

### 配置环境变量

在服务器上创建 `.env.local` 文件：

```bash
cat > /opt/classgpt/.env.local << 'EOF'
OPENAI_API_KEY=你的API密钥
OPENAI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4

TURSO_DATABASE_URL=你的数据库URL
TURSO_AUTH_TOKEN=你的数据库Token
EOF
```

### 启动服务

```bash
cd /opt/classgpt

# 构建并启动（首次需要几分钟）
docker-compose up -d

# 查看运行状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

访问 `http://你的服务器IP:3000`

### 常用命令

| 操作 | 命令 |
|------|------|
| 查看状态 | `docker-compose ps` |
| 查看日志 | `docker-compose logs -f` |
| 重启服务 | `docker-compose restart` |
| 停止服务 | `docker-compose down` |
| 更新代码后重新部署 | `docker-compose down && docker-compose up -d --build` |
| 查看内存占用 | `docker stats classgpt` |

### Nginx 反向代理（可选）

如果需要域名访问：

```bash
sudo apt install -y nginx

sudo tee /etc/nginx/sites-available/classgpt << 'EOF'
server {
    listen 80;
    server_name 你的域名;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/classgpt /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### HTTPS 证书（可选）

使用 Let's Encrypt 免费证书：

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d 你的域名
```

---

## 方式二：Cloudflare Workers 部署

适用于使用 Cloudflare 托管，无需自有服务器。

### 当前生产环境

- Runtime: Cloudflare Workers
- Build adapter: `@opennextjs/cloudflare`
- Worker name: `classgpt`
- Public URL: `https://classgpt.mldgfxm.workers.dev`
- Config file: `wrangler.toml`

`wrangler.toml` 必须保持 `workers_dev = true`，除非配置了自定义路由/域名。

### 部署命令

```bash
npm run lint
npm run pages:build
npm run pages:deploy
```

脚本名称包含 `pages` 是历史原因，实际使用 OpenNext Cloudflare：

- `pages:build` 运行 `opennextjs-cloudflare build`
- `pages:deploy` 运行 `opennextjs-cloudflare deploy`

### 完整手动部署流程

1. 确认 Cloudflare 认证：

```bash
npx wrangler whoami
```

2. 构建并验证 Worker：

```bash
npm run lint
npm run pages:build
```

3. 部署：

```bash
npm run pages:deploy
```

4. 验证公开 URL：

```bash
curl -I https://classgpt.mldgfxm.workers.dev
```

预期结果：`HTTP/2 200`

### 生产环境密钥

密钥存储在 Cloudflare Worker secrets 中，不是 `.env.local`。

AI 生成所需：

```bash
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put OPENAI_BASE_URL
npx wrangler secret put AI_MODEL
```

历史记录存储所需：

```bash
npx wrangler secret put TURSO_DATABASE_URL
npx wrangler secret put TURSO_AUTH_TOKEN
```

检查已配置的密钥：

```bash
npx wrangler secret list
```

### 禁止事项

- 不要通过 Cloudflare Pages 仪表板 Git 集成部署（使用 `.vercel/output/static`）
- 不要依赖 `.vercel/` 输出用于生产环境
- 不要使用 `next start` 进行生产托管
- 不要使用本地 `classgpt.db` 作为生产存储
- 不要设置 `workers_dev = false` 除非配置了 `routes` 或自定义域名

### 故障排除

如果部署显示 `No targets deployed for classgpt`，检查 `wrangler.toml`：

```toml
workers_dev = true
```

然后重新部署：

```bash
npm run pages:deploy
```

如果应用加载但 AI 生成失败，检查 Worker secrets：

```bash
npx wrangler secret list
```

如果历史 API 在生产环境失败，配置 Turso：

```bash
npx wrangler secret put TURSO_DATABASE_URL
npx wrangler secret put TURSO_AUTH_TOKEN
```

如果本地构建成功但在受限沙箱中失败（Turbopack 端口错误），在允许绑定本地端口的环境中重新构建。
