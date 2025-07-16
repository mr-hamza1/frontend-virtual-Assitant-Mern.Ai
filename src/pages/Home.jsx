import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userNotExist } from "../redux/reducer/userReducer";
import { useState, useEffect } from "react";
import gemeniResponse from "../features/Gemini";

const Home = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const logOut = async () => {
    let toastId = toast.loading("Logging out...");
    setIsLoading(true);

    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/user/logout", {
        withCredentials: true,
      });

      dispatch(userNotExist());
      toast.success(data?.message, { id: toastId });
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommand = (data) => {
  const { type, userInput, response } = data;
  speak(response); // Text-to-speech response

  if (type === 'google_search') {
    const query = encodeURIComponent(userInput);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  }

  if (type === 'youtube_search') {
    const query = encodeURIComponent(userInput);
    console.log(query)
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  }

  if (type === 'youtube_open') {
    window.open(`https://www.youtube.com/`, '_blank');
  }

/* -------- PLAY a YouTube video or song -------- */
if (type === 'youtube_play') {
  const input = userInput.trim();

  // 1⃣  If the user already gave a full YouTube URL …
  const urlMatch = input.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );

  // 2⃣  …or an 11‑character video ID …
  const idMatch =
    !urlMatch && /^[a-zA-Z0-9_-]{11}$/.test(input) ? [null, input] : null;

  const videoId = (urlMatch || idMatch || [])[1];

  if (videoId) {
    // 👉 Direct‑play the exact video
    window.open(`https://www.youtube.com/watch?v=${videoId}&autoplay=1`, '_blank');
  } else {
    // 👉 Otherwise treat it as a search phrase and
    // open an *embed* player that auto‑queues the top results
    const query = encodeURIComponent(input);
    window.open(
      `https://www.youtube.com/embed?listType=search&list=${query}&autoplay=1`,
      '_blank'
    );
  }
}


  if (type === 'calculator_open') {
    window.open('https://www.google.com/search?q=calculator', '_blank');
  }

  if (type === 'instagram_open') {
    window.open('https://www.instagram.com', '_blank');
  }

  if (type === 'facebook_open') {
    window.open('https://www.facebook.com', '_blank');
  }

  if (type === 'weather_show') {
  const query = encodeURIComponent(userInput || 'weather');
  window.open(`https://www.google.com/search?q=${query}`, '_blank');
}


   if (type === 'chat_') {
    window.open('https://chat.openai.com', '_blank');
  }

  if (type === 'open_moviesmod') {
    window.open('https://moviesmod.email', '_blank');
  }
};


  // 🔊 Handle voice setup
  let selectedVoice = null;
  let audioUnlocked = false;

  const unlockAudio = () => {
    audioUnlocked = true;
    document.removeEventListener("click", unlockAudio);
    console.log("🔓 Audio unlocked by user click");
  };

  useEffect(() => {
    // Unlock speech after first user click
    document.addEventListener("click", unlockAudio, { once: true });

    // Load voices
    // window.speechSynthesis.onvoiceschanged = () => {
    //   const voices = window.speechSynthesis.getVoices();
    //   selectedVoice = voices.find((v) => v.lang === "en-US") || voices[0];
    // };
  }, []);

  const speak = (text) => {
    if (!audioUnlocked) {
      console.warn("Speech blocked until user interacts with the page.");
      return;
    }

    // const voices = window.speechSynthesis.getVoices();
    // if (!voices.length) {
    //   console.warn("Voices not loaded yet. Retrying...");
    //   setTimeout(() => speak(text), 100);
    //   return;
    // }

    const utterance = new SpeechSynthesisUtterance(text);
    // utterance.voice = selectedVoice || voices.find((v) => v.lang === "en-US");
    // utterance.lang = "en-US";



    window.speechSynthesis.speak(utterance);
  };

  // 🎤 Handle speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();

      console.log("🎙️ Heard:", transcript);

      if (transcript.toLowerCase().includes(user.assistantName.toLowerCase())) {
        const data = await gemeniResponse(transcript);
        console.log("🤖 Assistant response:", data);
        handleCommand(data)
     }
    };
    recognition.start();

  }, []);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center items-center flex-col gap-[20px]">
      <button
        className="min-w-[150px] h-[60px] mt-[30px] rounded-full bg-white text-[19px] absolute text-black font-semibold top-[20px] right-[20px] cursor-pointer px-[20px] py-[10px]"
        onClick={() => navigate(`/customize`)}
      >
        Customize your Assistant
      </button>

      <button
        className="min-w-[150px] h-[60px] mt-[30px] rounded-full bg-white text-[19px] absolute text-black font-semibold top-[100px] right-[20px] cursor-pointer"
        onClick={logOut}
        disabled={isLoading}
      >
        Logout
      </button>

      <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
        <img src={user.assistantImage} alt="virtual Assistant" className="h-full object-cover" />
      </div>

      <h1 className="text-white text-[18px] font-semibold">I'm {user.assistantName}</h1>
    </div>
  );
};

export default Home;
