import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { SubjectNav } from "@/components/SubjectNav";
import { QuestionCard } from "@/components/QuestionCard";
import { QuestionForm } from "@/components/QuestionForm";
import { ASMRPlayer } from "@/components/ASMRPlayer";
import type { Subject, Question, AsmrTrack } from "@shared/schema";

export default function SubjectPage() {
  const [, params] = useRoute("/subjects/:slug");
  const queryClient = useQueryClient();

  const { data: subject } = useQuery<Subject>({
    queryKey: [`/api/subjects/${params?.slug}`],
  });

  const { data: questions } = useQuery<Question[]>({
    queryKey: [`/api/subjects/${subject?.id}/questions`],
    enabled: !!subject,
  });

  const { data: asmrTracks } = useQuery<AsmrTrack[]>({
    queryKey: ['/api/asmr-tracks'],
  });

  const handleQuestionAdded = () => {
    queryClient.invalidateQueries({
      queryKey: [`/api/subjects/${subject?.id}/questions`],
    });
  };

  if (!subject) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Subjects</h2>
              <SubjectNav />
            </div>
            {asmrTracks?.map((track) => (
              <ASMRPlayer key={track.id} track={track} />
            ))}
          </aside>

          <main className="lg:col-span-9">
            <h1 className="text-4xl font-bold mb-8">{subject.name}</h1>

            <div className="space-y-8">
              <QuestionForm 
                subjectId={subject.id} 
                onQuestionAdded={handleQuestionAdded} 
              />

              <div className="grid gap-6">
                {questions?.map((question) => (
                  <QuestionCard key={question.id} question={question} />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}