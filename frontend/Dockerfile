FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm@11.21.0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ARG NEXT_PUBLIC_API_URL=http://localhost:8080
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm build

EXPOSE 3000

ENV HOSTNAME=0.0.0.0

CMD ["pnpm", "start"]