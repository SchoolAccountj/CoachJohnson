import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Question } from "@shared/schema";

export function QuestionCard({ question }: { question: Question }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <Card className="backdrop-blur-lg bg-background/80">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {showAnswer ? (
            <div className="rounded-lg bg-muted p-4">{question.answer}</div>
          ) : (
            <Button onClick={() => setShowAnswer(true)} variant="outline">
              Show Answer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
