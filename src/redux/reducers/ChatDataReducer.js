const ChatDataReducer = (
  prevState = {
    history: [],
    allConversations: [],
    conversationId: undefined,
  },
  action = {}
) => {
  switch (action.type) {
    case "SET_CONVERSATION_ID":
      return {
        ...prevState,
        conversationId: action.payload,
      };
    case "SET_HISTORY":
      return {
        ...prevState,
        history: action.payload,
      };
    case "SET_ALL_CONVERSATIONS":
      return {
        ...prevState,
        allConversations: action.payload,
      };
    case "CREATE_CONVERSATION":
      return {
        ...prevState,
        allConversations: [...prevState.allConversations, action.payload],
      };
    case "APPEND_MESSAGE":
      return {
        ...prevState,
        history: [...prevState.history, action.payload],
      };
    default:
      return prevState;
  }
};

export default ChatDataReducer;
