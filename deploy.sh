#!/bin/bash

# ClassGPT 一键部署脚本
# 用法: ./deploy.sh

set -e

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}=== ClassGPT 部署脚本 ===${NC}"

# 1. 创建目录结构
echo -e "${YELLOW}1. 创建目录结构...${NC}"
mkdir -p /home/ubuntu/classgpt/{app,data}

# 2. 检查是否已上传代码
if [ ! -f "/home/ubuntu/classgpt/app/package.json" ]; then
    echo -e "${RED}错误: 请先将项目代码上传到 /home/ubuntu/classgpt/app/${NC}"
    echo -e "${YELLOW}本地执行以下命令打包上传:${NC}"
    echo -e "  tar -czf classgpt.tar.gz --exclude=node_modules --exclude=.next --exclude=.open-next --exclude=.git --exclude=data ."
    echo -e "  scp classgpt.tar.gz ubuntu@服务器IP:/home/ubuntu/classgpt/"
    exit 1
fi

# 3. 检查环境变量文件
if [ ! -f "/home/ubuntu/classgpt/.env.local" ]; then
    echo -e "${YELLOW}2. 创建环境变量文件...${NC}"
    cat > /home/ubuntu/classgpt/.env.local << 'EOF'
# AI 配置
OPENAI_API_KEY=你的API密钥
OPENAI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4

# 数据库配置（本地 SQLite）
DATABASE_URL=file:/app/data/classgpt.db
EOF
    echo -e "${RED}请编辑 /home/ubuntu/classgpt/.env.local 填入正确的配置${NC}"
    exit 1
fi

# 4. 进入项目目录
cd /home/ubuntu/classgpt

# 5. 构建并启动
echo -e "${YELLOW}3. 构建 Docker 镜像...${NC}"
docker-compose build

echo -e "${YELLOW}4. 启动服务...${NC}"
docker-compose up -d

# 6. 等待服务启动
echo -e "${YELLOW}5. 等待服务启动...${NC}"
sleep 5

# 7. 检查状态
echo -e "${YELLOW}6. 检查服务状态...${NC}"
docker-compose ps

echo -e "${GREEN}=== 部署完成 ===${NC}"
echo -e "${GREEN}访问地址: http://$(hostname -I | awk '{print $1}'):3000${NC}"
echo -e "${YELLOW}查看日志: docker-compose logs -f${NC}"
echo -e "${YELLOW}重启服务: docker-compose restart${NC}"
