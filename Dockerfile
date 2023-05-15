FROM node:16
EXPOSE 7070
WORKDIR /app
RUN npm install i npm@latest -g
RUN npm install sequelize-cli -g
RUN npm install dotenv-cli -g
COPY package.json package-lock*.json ./
RUN npm install
COPY . .    
CMD ["npm","run" , "dockerStart"]