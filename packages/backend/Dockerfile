FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 3030
CMD ["yarn", "start"]