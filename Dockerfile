FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
RUN npm install pm2 -g
RUN npm install tsc -g
RUN npm ic --only=production
RUN tsc

RUN ls -lha .
COPY dist .
RUN ls -lha .
EXPOSE 3000

CMD [ "pm2-runtime", "main.js" ]