import { ChatAPI } from "../../utils/api";

async function getAllConversations(userId) {
  var getAllConversations = await ChatAPI({
    url: "chat/get_all_conversations",
    method: "POST",
    data: {
      user_id: userId,
    },
  }).then((res) => {
    return {
      type: "GET_ALL_CONVERSATIONS",
      payload: res.data.conversations,
    };
  });
  return getAllConversations;
}

async function getHistoryMessages(conversationId) {
  var getHistoryMessages = await ChatAPI({
    url: "chat/get_history_messages",
    method: "POST",
    data: {
      conversation_id: conversationId,
    },
  }).then((res) => {
    return {
      type: "GET_HISTORY",
      payload: res.data.messages,
    };
  });
  return getHistoryMessages;
}

async function createConversation(userId) {
  var createConversation = await ChatAPI({
    url: "chat/create_conversation",
    method: "POST",
    data: {
      user_id: userId,
    },
  }).then((res) => {
    return {
      type: "CREATE_CONVERSATION",
      payload: res.data.conversation,
    };
  });
  return createConversation;
}

async function sendMessage(message, conversationId) {
  var sendMessage = await ChatAPI({
    url: "chat/send_message",
    method: "POST",
    data: {
      message: message,
      conversation_id: conversationId,
    },
  }).then((res) => {
    return {
      type: "SEND_MESSAGE",
      request_id: res.data.request_id,
      history: res.data.history,
    };
  });
  return sendMessage;
}

async function checkResponse(requestId, conversationId) {
  var checkResponse = await ChatAPI({
    url: "chat/check_response",
    method: "POST",
    data: {
      request_id: requestId,
      conversation_id: conversationId,
    },
  }).then((res) => {
    return {
      type: "CHECK_RESPONSE",
      response: res.data.response,
    };
  });
  return checkResponse;
}

function appendMessage(message) {
  return {
    type: "APPEND_MESSAGE",
    payload: message,
  };
}

function setAllConversations(conversations) {
  return {
    type: "SET_ALL_CONVERSATIONS",
    payload: conversations,
  };
}

function setHistory(history) {
  return {
    type: "SET_HISTORY",
    payload: history,
  };
}

function setConversationId(conversationId) {
  return {
    type: "SET_CONVERSATION_ID",
    payload: conversationId,
  };
}

export {
  getAllConversations,
  getHistoryMessages,
  createConversation,
  sendMessage,
  checkResponse,
  appendMessage,
  setAllConversations,
  setHistory,
  setConversationId,
};
