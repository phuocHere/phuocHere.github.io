// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the Firebase database
const database = firebase.database();

const chatList = document.getElementById('chat-list');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-btn');

// Listen for changes in the database and update the chat UI
database.ref('messages').on('child_added', snapshot => {
  const message = snapshot.val();
  const li = document.createElement('li');
  li.textContent = message.text;
  chatList.appendChild(li);
});

// Send message to the database
sendButton.addEventListener('click', () => {
  const messageText = messageInput.value.trim();
  if (messageText !== '') {
    database.ref('messages').push({
      text: messageText
    });
    messageInput.value = '';
  }
});
