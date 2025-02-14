import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertQuestion } from "@shared/schema";

interface QuestionFormProps {
  subjectId: number;
  onQuestionAdded: () => void;
}

export function QuestionForm({ subjectId, onQuestionAdded }: QuestionFormProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const questionData: Partial<InsertQuestion> = {
        question,
        answer,
        subjectId,
        difficulty: "user",
        isUserSubmitted: 1
      };

      await apiRequest("POST", `/api/subjects/${subjectId}/questions`, questionData);
      
      setQuestion("");
      setAnswer("");
      onQuestionAdded();
      
      toast({
        title: "Success",
        description: "Your question has been added!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add question. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 backdrop-blur-lg bg-background/80 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Ask a Question</h3>
      
      <div className="space-y-2">
        <Input
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Textarea
          placeholder="Enter the answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full">
        Add Question
      </Button>
    </form>
  );
}
