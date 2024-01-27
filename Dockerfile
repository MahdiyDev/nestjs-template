FROM node:20-alpine as BUILD_IMAGE

# setup tools
RUN apk update && apk add npm curl bash make && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

# install node-prune 
#RUN  curl -sf https://gobinaries.com/tj/node-prune | sh

COPY package.json package-lock.json ./

# install dependencies
RUN npm install 

COPY . .

# build application
RUN npm run build

# remove development dependencies
#RUN npm prune --production

# run node prune
#RUN /usr/local/bin/node-prune

# RUN ls -a

#FROM node:16-alpine

#WORKDIR /usr/src/app

# copy dependencies and source from build image
# COPY --from=BUILD_IMAGE /usr/src/app/.env ./.env
#COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
#COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules
#COPY --from=BUILD_IMAGE /usr/src/app/certs ./certs

EXPOSE 8080

CMD [ "node", "./dist/src/main.js" ]
