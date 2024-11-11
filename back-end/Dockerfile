# fetch base image of Node
FROM node:16

# use this folder as the working directory (like a CD command)
WORKDIR /usr/src

# copy the current directory to the workdir
COPY . .

# "expose" port 5000
EXPOSE 5000

# download dependencies
RUN npm i

# compile TS to JS
RUN npm run build

# run prisma migrations and start the server
CMD ["npm", "run", "migrate-seed-and-start"]
