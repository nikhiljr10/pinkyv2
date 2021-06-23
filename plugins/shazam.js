const Asena = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');

const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const ffmpeg = require('fluent-ffmpeg');
const ytdl = require('ytdl-core');
const yts = require( 'yt-search' )
const got = require("got");
const ID3Writer = require('browser-id3-writer');
const SpotifyWebApi = require('spotify-web-api-node');
const req = require('request');

const spotifyApi = new SpotifyWebApi({
    clientId: 'acc6302297e040aeb6e4ac1fbdfd62c3',
    clientSecret: '0e8439a1280a43aba9a5bc0a16f3f009'
});

Asena.addCommand({pattern: 'sha', fromMe: true, desc: 'sh' }, (async (message, match) => { 

    if (message.reply_message === false) return await message.client.sendMessage(message.jid, bix.UV_REPLY, MessageType.text);

    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .format('mp3')
        .save('lyr.mp3')
        .on('end', async () => {

            var data = { 'api_token': '6a03ebccfc18bb19e3fb7bb5280a51ab', 'file': fs.createReadStream('./lyr.mp3'), 'return': 'apple_music,spotify' };
            req ({ uri: 'https://api.audd.io/', form: data, method: "POST" }, async (err, res, body) => {
                return await message.client.sendMessage(message.jid, body, MessageType.text);
            })
        })
}));
