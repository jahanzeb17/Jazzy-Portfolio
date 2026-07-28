import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// ── Knowledge base about Jahanzeb ──────────────────────────────────
const KNOWLEDGE = {
  name: "Jahanzeb Riaz",
  title: "AI Engineer & Backend Developer",
  email: "jahanzeb1782@gmail.com",
  github: "https://github.com/jahanzeb17",
  linkedin: "https://www.linkedin.com/in/jahanzeb-riaz/",
  summary:
    "I'm Jahanzeb Riaz — an Information Technology undergraduate focused on building AI-powered applications, Agentic workflows, FastAPI services, LLM pipelines, and scalable backend systems. I enjoy turning research ideas and machine learning concepts into production-ready software systems with clean, modular architectures.",
  education: {
    degree: "Bachelor of Science in Information Technology",
    university: "Shaheed Benazir Bhutto University, Sanghar Campus",
    duration: "Jan 2023 – Dec 2026",
    cgpa: "3.4 / 4.0",
    highlights: [
      "Strong academic performance, graduating with a CGPA of 3.4 / 4.",
      "Presented the SBBU agentic AI project at an IT Expo, demonstrating practical applications for university automation.",
      "Gained hands-on research experience at MirpurKhas University focusing on applied artificial intelligence and machine learning.",
    ],
    coursework: [
      "Programming Fundamentals",
      "OOPs",
      "Data Structures",
      "Algorithms",
      "Database Systems",
      "Web Technologies",
      "Software Engineering",
      "AI/ML",
    ],
  },
  experience: [
    {
      role: "AI Engineer",
      company: "SOC Solutions",
      location: "Karachi - Remote",
      duration: "Feb 2025 – Apr 2025",
      highlights: [
        "Designed LLM workflows using RAG, voice cloning, and fine-tuning to optimize GenAI application performance.",
        "Built an AI-driven SEO assistant that increased keyword mapping efficiency by 40% for SaaS clients.",
        "Developed multimodal agents combining text and voice input to streamline research and accessibility.",
        "Engineered end-to-end AI solutions from research and prototyping through production deployment.",
      ],
      skills: [
        "LLMs",
        "RAG",
        "Fine-tuning",
        "Voice Cloning",
        "Speech Synthesis",
        "Multimodal Agents",
      ],
    },
    {
      role: "AI Engineer",
      company: "Botmer International",
      location: "Karachi - Remote",
      duration: "Apr 2025 – Jun 2025",
      highlights: [
        "Developed real-time object detection pipelines using YOLOv8/v11, achieving 92%+ accuracy in PPE and safety monitoring.",
        "Enhanced detection precision by 18% via segmentation and classification module integration for industrial workflows.",
        "Built RAG-based applications using Pinecone, Chroma, and FastAPI for integration with safety management systems.",
        "Implemented real-time monitoring dashboards for live detection feedback to reduce workplace incidents.",
      ],
      skills: [
        "Computer Vision",
        "YOLOv8/v11",
        "Object Detection",
        "FastAPI",
        "Pinecone",
        "Chroma",
      ],
    },
  ],
  skills: {
    aiml: [
      "Hugging Face Transformers",
      "PyTorch",
      "Tensorflow",
      "Scikit-learn",
      "OpenCV",
    ],
    genai: [
      "RAG Pipelines",
      "LangChain & LangGraph",
      "Vector databases",
      "Fine Tuning",
      "AI Workflows",
    ],
    backend: ["Python", "FastAPI", "REST APIs", "Pydantic", "Flask"],
    databases: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Docker",
      "Postman",
      "Git & GitHub",
    ],
    additional: [
      "Data Structures & Algorithms",
      "React",
      "LangChain",
      "LLM App Development",
      "AI System Design",
      "JWT Auth",
      "CI/CD Pipelines",
      "Render",
      "AWS / GCP",
      "Vercel",
    ],
  },
  projects: [
    {
      title: "SBBU Assistant — Agentic AI University Chatbot",
      description:
        "Built an agentic AI chatbot using LangChain, LangGraph, LLaMA-3.1 (via Groq API), and Chroma vector database, enabling context-rich answers from university documents with 90% accuracy.",
      tech: [
        "Python",
        "LangChain",
        "LangGraph",
        "LLaMA-3.1",
        "Chroma",
        "Streamlit",
      ],
      github: "https://github.com/jahanzeb17/SBBU-Assistant",
    },
    {
      title: "DeepSeek RAG Assistant — Document Intelligence Platform",
      description:
        "Built a Retrieval-Augmented Generation chatbot using DeepSeek R1 and FAISS, enabling users to get context-rich answers from large documents through a clean Streamlit interface.",
      tech: ["Python", "DeepSeek R1", "FAISS", "RAG", "Streamlit"],
      github: "https://github.com/jahanzeb17/deepseek-rag-assistant",
    },
    {
      title: "Agentic AI Q&A Chatbot — Autonomous Search Assistant",
      description:
        "Created an autonomous Q&A chatbot using LangGraph agents with Tavily Search and Wikipedia integration for real-time external knowledge fetching beyond static datasets.",
      tech: [
        "Python",
        "LangGraph",
        "Tavily Search",
        "Wikipedia API",
        "Streamlit",
      ],
      github: "https://github.com/jahanzeb17/AI_Agents_Q-A_chatbot",
    },
    {
      title: "Streaming Chatbot — Real-Time AI Assistant",
      description:
        "Developed a real-time AI chatbot with LangChain, LLaMA-3.1-70B (via Groq API), and Streamlit to ensure live, high-performance interactions for dynamic user engagement.",
      tech: ["Python", "LangChain", "LLaMA-3.1-70B", "Groq API", "Streamlit"],
      github: "https://github.com/jahanzeb17/Streaming_chatbot",
    },
    {
      title: "Emotion Detection — Computer Vision Analysis System",
      description:
        "Built a YOLOv8-based real-time system that detects and visualizes human emotions across 8 categories, assisting in behavioral analysis for educational settings.",
      tech: ["Python", "YOLOv8", "Computer Vision", "OpenCV", "Streamlit"],
      github: "https://github.com/jahanzeb17",
    },
  ],
  targetRole:
    "AI Engineer or Software/Backend Developer roles at product-driven companies. Focus area: RAG pipelines, agentic AI logic, and robust microservices at scale.",
  engineeringFocus:
    "Designing robust backend services with FastAPI, implementing semantic search indices, integrating generative AI/LLM components, and managing production deployments.",
};

// ── Suggested quick questions ──────────────────────────────────────
const QUICK_QUESTIONS = [
  "Who is Jahanzeb?",
  "What are his skills?",
  "Tell me about his projects",
  "Work experience?",
  "How to contact him?",
];

// ── Response generation logic ──────────────────────────────────────
function generateResponse(input: string): string {
  const q = input.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|hola|yo|sup|greetings|assalam|salam|aoa)/i.test(q)) {
    return `Hey there! 👋 I'm Jahanzeb's AI assistant. I know everything about him — his skills, projects, experience, education, and more. What would you like to know?`;
  }

  // Projects — check BEFORE "about" since "tell me about his projects" contains "about"
  if (
    q.includes("project") ||
    q.includes("built") ||
    q.includes("portfolio") ||
    q.includes("build") ||
    q.includes("sbbu") ||
    q.includes("deepseek") ||
    q.includes("chatbot") ||
    q.includes("emotion") ||
    q.includes("yolo")
  ) {
    return (
      `Here are Jahanzeb's featured projects:\n\n` +
      KNOWLEDGE.projects
        .map(
          (p, i) =>
            `**${i + 1}. ${p.title}**\n${p.description}\n🔧 ${p.tech.join(", ")}\n🔗 [GitHub](${p.github})`,
        )
        .join("\n\n")
    );
  }

  // Skills — check BEFORE "about"
  if (
    q.includes("skill") ||
    q.includes("tech") ||
    q.includes("stack") ||
    q.includes("proficien") ||
    q.includes("language") ||
    q.includes("framework") ||
    q.includes("tool")
  ) {
    return `Here are Jahanzeb's technical skills:\n\n🤖 **AI/ML:** ${KNOWLEDGE.skills.aiml.join(", ")}\n\n🧠 **GenAI & Agentic AI:** ${KNOWLEDGE.skills.genai.join(", ")}\n\n⚙️ **Backend:** ${KNOWLEDGE.skills.backend.join(", ")}\n\n🗄️ **Databases & Tools:** ${KNOWLEDGE.skills.databases.join(", ")}\n\n✨ **Additional:** ${KNOWLEDGE.skills.additional.join(", ")}`;
  }

  // Experience / Work / Internship — check BEFORE "about"
  if (
    q.includes("experience") ||
    q.includes("work") ||
    q.includes("internship") ||
    q.includes("intern") ||
    q.includes("job") ||
    q.includes("career") ||
    q.includes("company") ||
    q.includes("soc") ||
    q.includes("botmer")
  ) {
    return KNOWLEDGE.experience
      .map(
        (exp) =>
          `💼 **${exp.role}** at ${exp.company}\n📍 ${exp.location} | 📅 ${exp.duration}\n\n${exp.highlights.map((h) => `• ${h}`).join("\n")}\n\n**Tech Used:** ${exp.skills.join(", ")}`,
      )
      .join("\n\n---\n\n");
  }

  // Education — check BEFORE "about"
  if (
    q.includes("education") ||
    q.includes("university") ||
    q.includes("degree") ||
    q.includes("college") ||
    q.includes("study") ||
    q.includes("cgpa") ||
    q.includes("gpa") ||
    q.includes("qualification")
  ) {
    const edu = KNOWLEDGE.education;
    return `🎓 **${edu.degree}**\n📍 ${edu.university}\n📅 ${edu.duration}\n📊 CGPA: ${edu.cgpa}\n\n**Highlights:**\n${edu.highlights.map((h) => `• ${h}`).join("\n")}\n\n**Key Coursework:** ${edu.coursework.join(", ")}`;
  }

  // Contact — check BEFORE "about"
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.includes("hire") ||
    q.includes("connect") ||
    q.includes("linkedin") ||
    q.includes("github")
  ) {
    return `You can reach Jahanzeb through:\n\n📧 **Email:** ${KNOWLEDGE.email}\n💼 **LinkedIn:** [jahanzeb-riaz](${KNOWLEDGE.linkedin})\n🐙 **GitHub:** [jahanzeb17](${KNOWLEDGE.github})\n\nHe's currently open to AI Engineer and Backend Developer opportunities!`;
  }

  // Who / Introduction — NOW safe to check "about" since specific topics are handled above
  if (
    q.includes("who") ||
    q.includes("about") ||
    q.includes("introduce") ||
    q.includes("tell me about him") ||
    q.includes("yourself")
  ) {
    return `${KNOWLEDGE.summary}\n\n🎯 He's currently targeting ${KNOWLEDGE.targetRole}`;
  }

  // Name
  if ((q.includes("name") || q.includes("called")) && !q.includes("project")) {
    return `His name is **${KNOWLEDGE.name}**. He's an ${KNOWLEDGE.title} based in Pakistan.`;
  }

  // Resume / CV
  if (q.includes("resume") || q.includes("cv")) {
    return `You can download Jahanzeb's resume by clicking the **"Resume"** button in the hero section at the top of this page! 📄`;
  }

  // Location
  if (
    q.includes("location") ||
    q.includes("where") ||
    q.includes("city") ||
    q.includes("country") ||
    q.includes("based")
  ) {
    return `Jahanzeb is based in **Pakistan** 🇵🇰. He studied at Shaheed Benazir Bhutto University, Sanghar Campus, and has worked remotely with companies in Karachi.`;
  }

  // Availability / Hiring
  if (
    q.includes("available") ||
    q.includes("open") ||
    q.includes("looking") ||
    q.includes("seeking") ||
    q.includes("role")
  ) {
    return `Yes! Jahanzeb is **actively seeking** opportunities as an AI Engineer or Software/Backend Developer at product-driven companies. His focus areas are RAG pipelines, agentic AI logic, and robust microservices at scale. Feel free to reach out at ${KNOWLEDGE.email}! 🚀`;
  }

  // AI / ML specific
  if (
    q.includes("machine learning") ||
    q.includes("artificial intelligence") ||
    q.includes("deep learning") ||
    (q.includes("ai") && q.length < 30) ||
    (q.includes("ml") && q.length < 30)
  ) {
    return `Jahanzeb has strong expertise in AI/ML:\n\n🤖 **Core ML:** ${KNOWLEDGE.skills.aiml.join(", ")}\n🧠 **GenAI:** ${KNOWLEDGE.skills.genai.join(", ")}\n\nHe's built multiple AI projects including agentic chatbots, RAG pipelines, emotion detection systems, and real-time streaming AI assistants. His engineering focus is on designing robust AI systems with clean, production-ready architectures.`;
  }

  // Python / FastAPI / Backend
  if (
    q.includes("python") ||
    q.includes("fastapi") ||
    q.includes("backend") ||
    q.includes("api")
  ) {
    return `Jahanzeb is highly proficient in backend development:\n\n⚙️ **Backend Stack:** ${KNOWLEDGE.skills.backend.join(", ")}\n🗄️ **Databases:** PostgreSQL, MongoDB, MySQL\n🐳 **DevOps:** Docker, CI/CD Pipelines, Render, Vercel, AWS/GCP\n\nHe specializes in building FastAPI services, REST APIs, and scalable backend architectures for AI-powered applications.`;
  }

  // LangChain / LangGraph / RAG
  if (
    q.includes("langchain") ||
    q.includes("langgraph") ||
    q.includes("agent") ||
    q.includes("agentic") ||
    q.includes("rag")
  ) {
    return `Jahanzeb has extensive experience with agentic AI frameworks:\n\n🧠 **LangChain & LangGraph** — Used in multiple projects including the SBBU Assistant, Streaming Chatbot, and Agentic Q&A Chatbot.\n\nHe builds autonomous agents that can fetch real-time knowledge from external sources, process university documents, and create context-rich conversational AI experiences.`;
  }

  // Thanks
  if (
    q.includes("thank") ||
    q.includes("thanks") ||
    q.includes("great") ||
    q.includes("awesome") ||
    q.includes("nice") ||
    q.includes("cool")
  ) {
    return `You're welcome! 😊 If you have any more questions about Jahanzeb, feel free to ask. You can also reach out to him directly at ${KNOWLEDGE.email}!`;
  }

  // Goodbye
  if (
    q.includes("bye") ||
    q.includes("goodbye") ||
    q.includes("see you") ||
    q.includes("take care")
  ) {
    return `Goodbye! 👋 Thanks for visiting Jahanzeb's portfolio. Don't hesitate to reach out if you'd like to connect — ${KNOWLEDGE.email}. Have a great day!`;
  }

  // Fallback
  return `I'm Jahanzeb's AI assistant and I can tell you about:\n\n• 👤 **Who he is** — background & introduction\n• 🎓 **Education** — degree, university, coursework\n• 💼 **Experience** — internships & work history\n• 🛠️ **Skills** — technical stack & tools\n• 🚀 **Projects** — what he's built\n• 📬 **Contact** — how to reach him\n\nTry asking something like *"What are his skills?"* or *"Tell me about his projects"*!`;
}

// ── Component ──────────────────────────────────────────────────────
const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hi! 👋 I'm Jahanzeb's AI assistant. Ask me anything about his skills, projects, experience, or how to get in touch!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay for realism
    const delay = Math.random() * 800 + 600;
    setTimeout(() => {
      const response = generateResponse(text);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    const userMessage: Message = {
      id: Date.now(),
      text: question,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    const delay = Math.random() * 800 + 600;
    setTimeout(() => {
      const response = generateResponse(question);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      setInputValue("");
    }, delay);
  };

  // Simple markdown-like rendering for bold text and links
  const renderMessageText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|\n)/g);
    return parts.map((part, i) => {
      if (part === "\n") return <br key={i} />;
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold text-zinc-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return (
          <a
            key={i}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2"
          >
            {linkMatch[1]}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* ── Floating Chat Button ─────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 left-8 z-50 group"
            aria-label="Open chatbot"
            id="chatbot-toggle"
          >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse" />
            {/* Button */}
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/25 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300">
              <MessageCircle size={24} className="text-white" />
            </div>
            {/* Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-800 text-white text-xs font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
              Chat with me! 💬
              <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-zinc-900 dark:border-r-zinc-800" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window ──────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-3rem)] flex flex-col rounded-3xl overflow-hidden shadow-2xl shadow-black/20 border border-zinc-200/50 dark:border-zinc-700/50"
            id="chatbot-window"
          >
            {/* ── Header ─────────────────────────────────────── */}
            <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-5 py-4 flex items-center justify-between flex-shrink-0">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,white_1px,transparent_1px),radial-gradient(circle_at_80%_50%,white_1px,transparent_1px)] bg-[size:20px_20px]" />
              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-tight">
                    Jahanzeb's Assistant
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-blue-100 text-[11px] font-medium">
                      Online
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="relative w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
                aria-label="Close chatbot"
              >
                <X size={16} className="text-white" />
              </button>
            </div>

            {/* ── Messages Area ──────────────────────────────── */}
            <div className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-900 px-4 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                      msg.sender === "bot"
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                        : "bg-gradient-to-br from-zinc-600 to-zinc-800 dark:from-zinc-500 dark:to-zinc-700"
                    }`}
                  >
                    {msg.sender === "bot" ? (
                      <Sparkles size={13} className="text-white" />
                    ) : (
                      <User size={13} className="text-white" />
                    )}
                  </div>
                  {/* Bubble */}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-md shadow-blue-500/10"
                        : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-tl-sm shadow-sm border border-zinc-100 dark:border-zinc-700/50"
                    }`}
                  >
                    {renderMessageText(msg.text)}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles size={13} className="text-white" />
                  </div>
                  <div className="bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700/50 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1.5 items-center">
                      <span
                        className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Quick Questions ─────────────────────────────── */}
            {messages.length <= 1 && (
              <div className="bg-zinc-50 dark:bg-zinc-900 px-4 pb-2 flex flex-wrap gap-1.5">
                {QUICK_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-3 py-1.5 text-[11px] font-semibold bg-white dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/50 rounded-full text-zinc-600 dark:text-zinc-300 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all duration-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {/* ── Input Area ──────────────────────────────────── */}
            <div className="bg-white dark:bg-zinc-800/80 border-t border-zinc-200/50 dark:border-zinc-700/50 px-4 py-3 flex-shrink-0">
              <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900/60 rounded-2xl px-4 py-2 border border-zinc-200/50 dark:border-zinc-700/30 focus-within:border-blue-400 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all duration-200">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me about Jahanzeb..."
                  className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none"
                  aria-label="Chat message input"
                  id="chatbot-input"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-sm"
                  aria-label="Send message"
                  id="chatbot-send"
                >
                  <Send size={14} />
                </button>
              </div>
              <p className="text-center text-[10px] text-zinc-400 dark:text-zinc-600 mt-2 font-medium">
                Powered by Jahanzeb's Portfolio ✨
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
