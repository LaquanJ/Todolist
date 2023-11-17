# ==============================================================================
# base
# ==============================================================================
# using node as base image
FROM node:16.20.1-alpine3.18 as base

# set node environment to development
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# set port defaulting to 8080
ARG PORT=8080
ENV PORT $PORT
EXPOSE $PORT

# install dependencies as the "node" unprivileged account for security
RUN mkdir /opt/cla \
  && chown node:node /opt/cla
WORKDIR /opt/cla
USER node
COPY package.json ./
RUN npm install --omit=optional \
  && npm cache clean --force
ENV PATH /opt/cla/node_modules/.bin:$PATH

# copy solution files while setting ownership
COPY --chown=node:node ./config/default.eslintrc.json ./default.eslintrc.json
COPY --chown=node:node ./config/.browserslistrc ./.browserslistrc
COPY --chown=node:node ./vite.config.js ./vite.config.js
COPY --chown=node:node ./public/index.html ./index.html
COPY --chown=node:node ./public ./public
COPY --chown=node:node ./src ./src


# start development server
CMD [ "npm", "run", "start" ]


# ==============================================================================
# builder
# ==============================================================================
FROM base as builder

# set node environment tp production
ENV NODE_ENV production

# build static files
RUN [ "npm", "run", "build" ]


# ==============================================================================
# server
# ==============================================================================
# using nginx as a content server
FROM nginx:mainline

# copy static files from builder
COPY --from=builder /opt/cla/build /usr/share/nginx/html

# update nginx configuration to support SPA
RUN sed -i \
  's/index  index.html index.htm/try_files $uri $uri\/ $uri.html \/index.html/'\
  /etc/nginx/conf.d/default.conf

# no CMD override, default from nginx is sufficient
