import axios from "axios";

type messageRole = "system" | "user" | "assistant";
type messageGptType = {
  role: messageRole;
  content: string;
}[];

export const useChat = {
  gptCompletion: async (
    messages: messageGptType
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

    const filteredMessages: messageGptType = messages
      .filter((message) => message.role !== "system")
      .map((message) => ({
        role: message?.role as messageRole,
        content: message?.content as string,
      }));

    try {
      const { data } = await axios.post("http://localhost:3000/api/ai", {
        messages: filteredMessages,
      });

      if (data == undefined) {
        return {
          response:
            "There was no response from the API. Please try again later.",
          status: "ERROR",
        };
      }
      console.log("🚀 ~ data:", data);

      return {
        response: data.message,
        status: "SUCCESS",
      };
    } catch (error) {
      return {
        response: "There was an error with the API. Please try again later.",
        status: "ERROR",
      };
    }
  },
};
