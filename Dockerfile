
FROM node:alpine as builder

WORKDIR /app

# copying package.json first so that we can install the dependencies
# so that, we need not install dependencies again and again
COPY package*.json .
COPY prepare.js .

RUN npm install
COPY . .

# building
RUN npm run build

#only js files
FROM node:alpine as hosting

# skips npm run prepare and other stuff
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json .
COPY prepare.js .

# install only production packages, which excludes typescript
RUN npm install --omit=dev

# copy the build
COPY --from=builder /app/dist ./dist

# doing purely javascript here
CMD ["node","dist/index.js"]