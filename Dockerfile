# 构建阶段
FROM node:16-alpine as build

# 设置工作目录
WORKDIR /app

# 拷贝项目文件
COPY . .
RUN yarn install --frozen-lockfile

RUN --mount=type=secret,id=VITE_APP_URL \
    --mount=type=secret,id=VITE_SERVER_BASE_URL \
    --mount=type=secret,id=VITE_LOGTO_ENDPOINT \
    --mount=type=secret,id=VITE_LOGTO_APPID \
    --mount=type=secret,id=VITE_LOGTO_RESOURCES \
    export VITE_APP_URL=$(cat /run/secrets/VITE_APP_URL) && \
    export VITE_SERVER_BASE_URL=$(cat /run/secrets/VITE_SERVER_BASE_URL) && \
    export VITE_LOGTO_ENDPOINT=$(cat /run/secrets/VITE_LOGTO_ENDPOINT) && \
    export VITE_LOGTO_APPID=$(cat /run/secrets/VITE_LOGTO_APPID) && \
    export VITE_LOGTO_RESOURCES=$(cat /run/secrets/VITE_LOGTO_RESOURCES) && \
    yarn build

# 生产阶段
FROM nginx:1.21-alpine

# 复制构建结果到 Nginx 的默认静态文件目录
COPY --from=build /app/dist /usr/share/nginx/html

# 复制自定义的 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
