# 构建阶段
FROM node:16-alpine as build

# 设置工作目录
WORKDIR /app

# 拷贝项目文件
COPY . .
RUN yarn install --frozen-lockfile

# 暴露端口
EXPOSE 3000

# 启动 Nginx
CMD ["yarn", "dev"]
