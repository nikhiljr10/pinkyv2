FROM fusuf/whatsasena:latest

RUN git clone https://afnanplk:unnikutten1@github.com/afnanplk/pinky.v2 /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul
RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
