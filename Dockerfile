FROM node:16.18.0-alpine3.16 as build

LABEL maintainer="Stefan Matic <maticstefan1996@gmail.com>"

WORKDIR /fe
COPY . /fe/

RUN npm install
# RUN npm run build
# COPY . /fe/

RUN if [ "$DEPLOY_TEST" = "true" ]; \
    then \
    echo "building for test env..."; \
    npm run build-test; \
    else \
    echo "building for non-test env..."; \
    npm run build; \
    fi

FROM nginx:alpine

EXPOSE 80
EXPOSE 443

RUN rm /etc/nginx/conf.d/default.conf

# COPY ./nginx.conf /etc/nginx/conf.d
# COPY ./atessoft.rs.fullchain.pem /etc/nginx/atessoft.rs.fullchain.pem
# COPY ./atessoft.rs.key.pem /etc/nginx/atessoft.rs.key.pem

COPY --from=build /fe/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

