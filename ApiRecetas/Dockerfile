# imagen base de node.js
FROM node:14

#directorio de trabajo
WORKDIR /app

#Copiar los archivos al contenedor

COPY . .

#Instalar dependencias
RUN npm install 

#exponer en puerto 3000
EXPOSE 3000

#iniciar la api
CMD [ "node", "index.js" ]
#CMD [ "npm", "start" ]