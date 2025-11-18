
"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, X, Bot, Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { askChatbot } from "@/ai/actions";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";

type Message = {
  role: 'user' | 'model';
  content: string;
};

const suggestedQuestions = [
    "Tell me about his skills",
    "What projects has he worked on?",
    "What's his work experience?",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const [factIndex, setFactIndex] = useState(0);
  const [ellipsis, setEllipsis] = useState("");
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const funFacts = [
    "Did you know Kunal has worked on Google Search and the Microsoft Azure portal?",
    "Kunal is a graduate from the prestigious IIT Bombay.",
    "This AI assistant is one of Kunal's own projects!",
    "Kunal has experience with both frontend and backend technologies.",
    "Thinking of a good question to ask... How about his projects?",
  ];

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [messages]);

  // Effect to cycle through fun facts while loading
  useEffect(() => {
    if (isPending) {
      const interval = setInterval(() => {
        setFactIndex(prevIndex => (prevIndex + 1) % funFacts.length);
      }, 5000); // Change fact every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isPending, funFacts.length]);

  // Effect for ellipsis animation
  useEffect(() => {
    if (isPending) {
      const interval = setInterval(() => {
        setEllipsis(prev => {
          if (prev === "") return ".";
          if (prev === ".") return "..";
          if (prev === "..") return "...";
          return "";
        });
      }, 500); // Cycle every 0.5 seconds
      return () => clearInterval(interval);
    } else {
      setEllipsis(""); // Reset when not pending
    }
  }, [isPending]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startTransition(() => {
        setMessages([{ role: 'model', content: "Hi! I'm Kunal's AI assistant. How can I help you today? You can ask me about his skills, projects, or experience." }]);
      });
    }
  }, [isOpen]);

  const sendMessage = (messageContent: string) => {
    const trimmedMessage = messageContent.trim();
    if (!trimmedMessage) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: trimmedMessage }];
    setMessages(newMessages);
    setInput("");

    const keywords = [
      'skill', 'project', 'experience', 'education', 'contact', 'kunal', 'work',
      'about', 'tech', 'code', 'develop', 'stack', 'tool', 'language', 'framework',
      'library', 'database', 'resume', 'portfolio', 'cv', 'background', 'connect',
      'hire', 'help', 'how', 'what', 'who', 'when', 'where', 'why', 'tell me'
    ];

    const isOffTopic = !keywords.some(keyword => trimmedMessage.toLowerCase().includes(keyword));

    if (isOffTopic) {
      setTimeout(() => {
        startTransition(() => {
          setMessages(prev => [...prev, { role: 'model', content: "I can only answer questions about Kunal's professional profile. Please ask about his skills, experience, or projects." }]);
        });
      }, 500);
      return;
    }

    // Set a random starting fun fact
    setFactIndex(Math.floor(Math.random() * funFacts.length));

    startTransition(async () => {
      const historyForAI = newMessages.filter(
        (msg) => msg.content !== "Hi! I'm Kunal's AI assistant. How can I help you today? You can ask me about his skills, projects, or experience."
      );
      const response = await askChatbot({ history: historyForAI });
      setMessages(prev => [...prev, { role: 'model', content: response.content }]);
    });
  };

  const handleSend = () => {
    sendMessage(input);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question); // Set input field for better UX
    sendMessage(question);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full w-16 h-16 shadow-lg"
          onClick={() => setIsOpen(!isOpen)} 
          aria-label={isOpen ? "Close chatbot" : "Open chatbot" } >
          {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
        </Button>
      </div>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[70vh] flex flex-col shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
               <Avatar>
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              <CardTitle>AI Assistant</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <ScrollArea className="flex-1 p-4 min-h-0 h-full">
              <div className="space-y-4">
                {messages.map((msg, index) => {
                  const isLastMessage = index === messages.length - 1;
                  return (
                    <div
                      key={index}
                      ref={isLastMessage ? lastMessageRef : null}
                      className={cn(
                        "flex w-full items-start gap-3",
                        msg.role === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      {msg.role === 'model' && (
                         <Avatar className="w-8 h-8">
                           <AvatarFallback><Bot /></AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          "rounded-lg px-4 py-2 max-w-[80%]",
                          msg.role === 'user'
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        {msg.role === 'model' ? (
                          <div className="prose prose-sm max-w-none">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1" {...props} />,
                                li: ({node, ...props}) => <li className="pl-2" {...props} />,
                              }}
                            >
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                        )}
                      </div>
                       {msg.role === 'user' && (
                         <Avatar className="w-8 h-8">
                           <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  );
                })}
                {isPending && messages[messages.length -1]?.role === 'user' && (
                   <div className="flex items-start gap-3 justify-start animate-pulse">
                        <Avatar className="w-8 h-8">
                           <AvatarFallback><Bot /></AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-4 py-2 bg-muted text-sm text-muted-foreground italic">
                            <p>Thinking{ellipsis}</p>
                            <p className="mt-1 text-xs">{funFacts[factIndex]}</p>
                        </div>
                    </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Persistent Suggested Questions */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Or try one of these:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q) => (
                      <Button key={q} variant="outline" size="sm" className="h-auto text-xs rounded-full" onClick={() => handleSuggestedQuestion(q)}>
                          {q}
                      </Button>
                  ))}
              </div>
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isPending && handleSend()}
                  placeholder="Type a message..."
                  disabled={isPending}
                />
                <Button onClick={handleSend} disabled={isPending || !input.trim()} size="icon" aria-label="Send messages">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
