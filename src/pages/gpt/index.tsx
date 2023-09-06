import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          {m.role}: {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <button type="submit"> send </button>
      </form>
    </div>
  );
}
