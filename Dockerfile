FROM node:20.1
WORKDIR /
COPY . .
RUN npm install
ENV PORT 8080
EXPOSE 8080
CMD ["npm", "start"]