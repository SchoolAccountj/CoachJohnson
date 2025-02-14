import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { SubjectNav } from "@/components/SubjectNav";
import { QuestionCard } from "@/components/QuestionCard";
import { RainAnimation } from "@/components/RainAnimation";
import type { Subject, Question } from "@shared/schema";

export default function SubjectPage() {
  const [, params] = useRoute("/subjects/:slug");
  
  const { data: subject } = useQuery<Subject>({
    queryKey: [`/api/subjects/${params?.slug}`],
  });

  const { data: questions } = useQuery<Question[]>({
    queryKey: [`/api/subjects/${subject?.id}/questions`],
    enabled: !!subject,
  });

  if (!subject) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RainAnimation intensity={0.3} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-4">Subjects</h2>
            <SubjectNav />
          </aside>

          <main className="lg:col-span-9">
            <h1 className="text-4xl font-bold mb-8">{subject.name}</h1>
            
            <div className="grid gap-6">
              {questions?.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
