const MessageType = {
  ERROR: "error",
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
};
const Messages = {
  unavailable: {
    text: "Unit unavailable",
    type: MessageType.ERROR,
  },
  insufficientFunds: {
    text: "Insufficient funds",
    type: MessageType.ERROR,
  },
  buildingInProgress: {
    text: "unable to comply building in progress",
    type: MessageType.ERROR,
  },
  trainingInProgress: {
    text: "unable to comply training in progress",
    type: MessageType.ERROR,
  },
};
