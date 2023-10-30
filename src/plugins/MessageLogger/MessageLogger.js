const fs = require('fs');
const path = require('path');

class MessageLogger {
  constructor() {
    this.logFilePath = path.join(__dirname, 'deleted_messages.log');
  }

  getName() {
    return 'Message Logger';
  }

  getAuthor() {
    return 'Trucky+Chatsonic';
  }

  getVersion() {
    return '1.0.0';
  }

  getDescription() {
    return 'Logs deleted messages and files.';
  }

  load() {
    const deletedEvents = ['MESSAGE_DELETE', 'MESSAGE_DELETE_BULK'];

    vencord.on('event', (event) => {
      if (deletedEvents.includes(event.type)) {
        this.logDeletedMessage(event);
      }
    });
  }

  logDeletedMessage(event) {
    const { author, content } = event;

    const logData = `\n[${new Date().toLocaleString()}] Deleted Message:\nAuthor: ${author.tag}\nContent: ${content}\n`;

    fs.appendFile(this.logFilePath, logData, (err) => {
      if (err) {
        console.error('Error logging deleted message:', err);
      }
    });
  }
}

module.exports = MessageLogger;