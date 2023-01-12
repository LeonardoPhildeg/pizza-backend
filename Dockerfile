FROM node:19.0.1-alpine3.16

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package*.json /app
COPY tsconfig.json /app
COPY yarn.lock /app

RUN yarn install

# Bundle app source
COPY . /app

EXPOSE 3333
CMD [ "yarn", "dev" ]





