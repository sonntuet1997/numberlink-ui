FROM node:14.18.1-alpine

RUN apk update && apk add bash

RUN apk --no-cache add \
    g++ make git \
    ca-certificates \
    && rm -rf /var/cache/apk/*


RUN yarn

CMD ["yarn start"]
