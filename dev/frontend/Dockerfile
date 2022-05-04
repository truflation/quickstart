FROM node:17-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY src src
COPY *.js *.json yarn.lock ./
USER node
RUN yarn --frozen-lockfile
RUN yarn deploy
COPY --chown=node:node . .
EXPOSE 9011

CMD [ "yarn", "serve" ]
