type messageType = {
  chat_id: string | null;
  content: string | null;
  created_at: string | null;
  id: string;
  role: string | null;
  updated_at: string | null;
  user_id: string | null;
}[];

export const gptCompletion = async (
  messages: messageType
): Promise<{
  response: string;
  status: "SUCCESS" | "ERROR" | "INVALID_DATA";
}> => {
  if (messages.length === 0) {
    return {
      response: "Please provide a message",
      status: "INVALID_DATA",
    };
  }

  const filteredMessages = messages
    .filter((message) => message.role !== "system")
    .map((message) => ({
      role: message?.role,
      content: message?.content as string,
    }));

  try {
    const res = await fetch("https://the-zen.dev/api/chat/vrakka", {
      method: "POST",
      body: JSON.stringify({
        messages: filteredMessages,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data == undefined) {
      return {
        response: "There was no response from the API. Please try again later.",
        status: "ERROR",
      };
    }

    return {
      response: data.message,
      status: "SUCCESS",
    };
  } catch (error) {
    return {
      response: "Fetching the response from the API failed.",
      status: "ERROR",
    };
  }
};
