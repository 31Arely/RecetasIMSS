# Utilizar una imagen base de Nginx
FROM nginx:alpine

# Copiar los archivos del frontend al directorio de Nginx
COPY . /usr/share/nginx/html

# Exponer el puerto 80 para acceder a la aplicación
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]