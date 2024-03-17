class Conversation {
    constructor(chatId,name, participants, messages,deleteId) {
        this.chatId = chatId;
        this.name = name;
        this.participants = participants;
        this.messages = messages;
        this.deleteId = deleteId
    }
}

class Message {
    constructor(messageId,type,senderId, content, timestamp,status) {
        this.messageId=messageId;
        this.type = type;
        this.senderId = senderId;
        this.content = content;
        this.timestamp = timestamp;
        this.status = status
    }

}

module.exports = { Conversation, Message};
