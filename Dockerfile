FROM node:latest

ADD ./package.json /code/package.json
WORKDIR /code

RUN yarn
ADD ./ /code

VOLUME /code

CMD yarn start
