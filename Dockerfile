FROM node:15.11.0 AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

RUN yarn build

FROM nginx:1.21.3
COPY --from=build /app/build  /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
