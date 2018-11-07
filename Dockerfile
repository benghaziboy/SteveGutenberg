FROM wordpress

RUN apt-get update && apt-get install gnupg2 -y

RUN apt-get install gnupg

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - 
 
RUN apt-get install nodejs -y \ 
  && apt-get install npm
