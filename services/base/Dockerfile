# nodezoo-base
FROM node:4

RUN mkdir /src

ADD package.json /src/

WORKDIR /src

RUN npm install

COPY . /src

CMD ["node", "srv/start.js", "--seneca.options.tag=nodezoo-base", "--seneca-log=type:act"]
