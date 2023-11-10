// backend/listener.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import crypto from 'crypto';
// import mongoose from 'mongoose';
import { timeseriesModel } from './timeseriesModel.js';

export const app = express();
export const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Emitter connected');
  
    socket.on('encryptedMessageStream', (encryptedMessageStream) => {
      const messages = encryptedMessageStream.split('|').filter(Boolean);
  
      messages.forEach((encryptedMessage) => {
        const decryptedMessage = decryptMessage(encryptedMessage);
  
        if (validateMessage(decryptedMessage)) {
          saveToDatabase(decryptedMessage);
        }
      });
    });
  
    socket.on('disconnect', () => {
      console.log('Emitter disconnected');
    });
});

const decryptMessage = (encryptedMessage) => {
    // Implement your decryption logic here
    // This is a placeholder, replace it with actual decryption
    return `Decrypted: ${encryptedMessage}`;
};
  
const validateMessage = (decryptedMessage) => {
    // Implement your validation logic here
    // This is a placeholder, replace it with actual validation
    return true;
};
  
const saveToDatabase = (decryptedMessage) => {
    // Add timestamp and save to MongoDB
    const timestampedMessage = { ...decryptedMessage, timestamp: new Date() };
    timeseriesModel.create(timestampedMessage);
};