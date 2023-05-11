# 使用一个基础的 Node.js 镜像作为起点
FROM node:16-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 yarn.lock 文件
COPY package.json yarn.lock ./

# 安装依赖
RUN yarn install --frozen-lockfile

# 复制其他项目文件
COPY . .

# 构建 React + Vite 应用
RUN yarn build

# 暴露应用运行的端口（如果有需要）
EXPOSE 3000

# 运行应用
CMD ["yarn", "serve"]
