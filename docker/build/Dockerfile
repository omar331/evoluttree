FROM ubuntu

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -y curl \
                       git-core \
                       nano

#RUN apt-get install -y gnupg \
#                    gnupg1 \
#                    gnupg2

RUN cd /tmp && curl -sL https://deb.nodesource.com/setup_8.x | bash -

RUN apt-get update && apt-get install -y nodejs

RUN npm install -g babel-cli \
                gulp-cli \
                gulp \
                typescript \
                typings \
                webpack \
                webpack-cli \
                webpack-dev-server

RUN mkdir -p /opt/scripts

COPY ./run-task /opt/scripts

RUN echo "cd /opt/front-dev/" >> ~/.bashrc

EXPOSE 22
EXPOSE 7500

