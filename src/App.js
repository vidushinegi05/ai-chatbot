import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const handleSend = async () => {
  if (!message) return;

  const userMsg = { sender: "User", text: message };
  setChat(prev => [...prev, userMsg]);

  setMessage("");

  try {
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
const data = await res.json();

const botMsg = {
  sender: "Bot",
  text: data.setup + " " + data.punchline
};
    setChat(prev => [...prev, botMsg]);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div style={styles.container}>
      <h1>Chatbot</h1>

      <div style={styles.chatBox}>
  {chat.map((msg, index) => (
    <div
      key={index}
      style={
        msg.sender === "User"
          ? styles.userMessage
          : styles.botMessage
      }
    >
      {msg.text}
    </div>
  ))}
</div>

     <div style={styles.inputArea}>
  <input
    style={styles.input}
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Type message..."
  />

  <button style={styles.button} onClick={handleSend}>
    Send
  </button>
</div>
    </div>
  );
}
const styles = {
  container: {
    padding: "20px",
    maxWidth: "500px",
    margin: "auto",
    fontFamily: "Arial",
  },
  chatBox: {
    height: "300px",
    overflowY: "auto",
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
  },
  userMessage: {
    alignSelf: "flex-end",
    background: "#007bff",
    color: "white",
    padding: "8px 12px",
    borderRadius: "10px",
    margin: "5px",
    maxWidth: "70%",
  },
  botMessage: {
    alignSelf: "flex-start",
    background: "#e5e5ea",
    padding: "8px 12px",
    borderRadius: "10px",
    margin: "5px",
    maxWidth: "70%",
  },
  inputArea: {
    display: "flex",
    gap: "5px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
  },
};

export default App;