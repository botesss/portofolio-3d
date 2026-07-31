import { useState, useEffect, useRef } from "react";
import { auth, loginWithGoogle, loginWithGithub, logout, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

export default function ChatRoom() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Ref untuk container chat
  const chatContainerRef = useRef(null);

  // Cek status login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Ambil pesan real-time
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // 2. Auto scroll HANYA di dalam container chat (halaman utama tidak terpengaruh)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Kirim pesan
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const textToSend = message;
    setMessage(""); // Reset input lebih awal agar terasa responsif

    try {
      await addDoc(collection(db, "messages"), {
        text: textToSend,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Gagal mengirim pesan:", err);
      setMessage(textToSend); // Kembalikan isi teks jika gagal
    }
  };

  // Helper untuk memformat waktu
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date();
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 p-6 rounded-2xl shadow-2xl max-w-xl mx-auto mt-6 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-pulse">💬</span>
          <h2 className="text-xl font-bold text-white tracking-wide">Chat Room</h2>
        </div>

        {user && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-zinc-800/80 pl-2 pr-3 py-1 rounded-full border border-zinc-700/50">
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="avatar"
                className="w-7 h-7 rounded-full ring-2 ring-blue-500/50"
              />
              <span className="text-sm font-medium text-zinc-200 max-w-[100px] truncate">
                {user.displayName}
              </span>
            </div>
            <button
              onClick={logout}
              className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 border border-red-500/20 active:scale-95"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Area Pesan (3. Ditambahkan ref={chatContainerRef} di sini) */}
      <div 
        ref={chatContainerRef} 
        className="h-80 overflow-y-auto p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 mb-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700"
      >
        {loading ? (
          <div className="flex justify-center items-center h-full text-zinc-500 text-sm">
            Memuat pesan...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 text-sm gap-2">
            <span>✨ Belum ada pesan. Mulai obrolan sekarang!</span>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.uid === user?.uid;
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 items-end ${isMe ? "justify-end" : "justify-start"}`}
              >
                {!isMe && (
                  <img
                    src={msg.photoURL || "https://via.placeholder.com/40"}
                    alt="avatar"
                    className="w-7 h-7 rounded-full mb-1 ring-1 ring-zinc-700"
                  />
                )}

                <div
                  className={`group relative p-3 max-w-[75%] transition-all duration-200 ${
                    isMe
                      ? "bg-blue-600 text-white rounded-2xl rounded-br-none shadow-lg shadow-blue-600/10"
                      : "bg-zinc-800 text-zinc-100 rounded-2xl rounded-bl-none border border-zinc-700/50"
                  }`}
                >
                  {!isMe && (
                    <div className="text-[11px] font-semibold text-blue-400 mb-1">
                      {msg.displayName || "Anonim"}
                    </div>
                  )}

                  <p className="text-sm leading-relaxed break-words">{msg.text}</p>

                  <div
                    className={`text-[10px] mt-1 text-right font-medium opacity-60 ${
                      isMe ? "text-blue-100" : "text-zinc-400"
                    }`}
                  >
                    {formatTime(msg.createdAt)}
                  </div>
                </div>

                {isMe && (
                  <img
                    src={msg.photoURL || "https://via.placeholder.com/40"}
                    alt="avatar"
                    className="w-7 h-7 rounded-full mb-1 ring-1 ring-blue-500/50"
                  />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Form Input / Login */}
      {user ? (
        <form onSubmit={sendMessage} className="flex gap-2 items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ketik pesan..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-100 placeholder-zinc-500 border border-zinc-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-transparent transition-all duration-200 text-sm"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 px-5 py-2.5 rounded-xl text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-1"
          >
            <span>Kirim</span>
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center py-4 gap-3 bg-zinc-950/40 rounded-xl border border-zinc-800/50">
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <button
              onClick={loginWithGoogle}
              className="flex items-center gap-3 bg-white text-zinc-800 font-medium text-sm px-6 py-2.5 rounded-full shadow-md hover:bg-zinc-100 hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              Sign in with Google
            </button>
            <button
              onClick={loginWithGithub}
              className="flex items-center gap-3 bg-zinc-900 text-white font-medium text-sm px-6 py-2.5 rounded-full shadow-md hover:bg-zinc-800 hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              <span className="text-lg">🐙</span>
              Sign in with GitHub
            </button>
          </div>
          <p className="text-xs text-zinc-500">Masuk untuk mulai mengirim pesan ke semua orang</p>
        </div>
      )}
    </div>
  );
}