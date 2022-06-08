# production stage
FROM nginx:stable-alpine as production-stage
COPY index.html /usr/share/nginx/html
ADD src /usr/share/nginx/html/src
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
