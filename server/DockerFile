FROM node:18 as builder
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app ./
CMD ["yarn","start:prod"]
