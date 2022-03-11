FROM node:14.12.0

# #Create /app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Install app dependencies
COPY package.json /usr/src/app

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

#/Bundle app source
COPY . /usr/src/app

EXPOSE 3000

#Build arguments
ARG NODE_VERSION=14.12.0

# Environment
ENV NODE_VERSION $NODE_VERSION

# CMD [ "node", "server.js" ]

