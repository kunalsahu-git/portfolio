
"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, X, Bot, Loader2, Sparkles } from "lucide-react";
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
        setMessages([{ role: 'model', content: "Hi! I'm Kunal's AI assistant. How can I help you today? You can ask me about his skills, projects, or experience." }]);
        setShowSuggestions(true);
    }
  }, [isOpen]);

  useEffect(() => {
    // Auto-scroll to the bottom
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo(0, scrollAreaRef.current.scrollHeight);
    }
  }, [messages]);

  const sendMessage = (messageContent: string) => {
    if (!messageContent.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: messageContent }];
    setMessages(newMessages);
    setShowSuggestions(false);
    setInput("");

    startTransition(async () => {
      const response = await askChatbot({ history: newMessages });
      setMessages(prev => [...prev, { role: 'model', content: response.content }]);
    });
  };

  const handleSend = () => {
    sendMessage(input);
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full w-16 h-16 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
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
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-start gap-3",
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
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                     {msg.role === 'user' && (
                       <Avatar className="w-8 h-8">
                         <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isPending && messages[messages.length -1]?.role === 'user' && (
                   <div className="flex items-start gap-3 justify-start">
                        <Avatar className="w-8 h-8">
                           <AvatarFallback><Bot /></AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-4 py-2 bg-muted">
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                    </div>
                )}
                 {showSuggestions && !isPending && (
                    <div className="space-y-2 pt-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span>Or try one of these:</span>
                        </div>
                        {suggestedQuestions.map((q) => (
                            <Button key={q} variant="outline" size="sm" className="w-full justify-start h-auto py-2" onClick={() => handleSuggestedQuestion(q)}>
                                {q}
                            </Button>
                        ))}
                    </div>
                 )}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isPending && handleSend()}
                  placeholder="Type a message..."
                  disabled={isPending}
                />
                <Button onClick={handleSend} disabled={isPending || !input.trim()} size="icon">
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
