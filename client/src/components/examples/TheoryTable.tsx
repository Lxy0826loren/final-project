import TheoryTable, { type TheoryRow } from '../TheoryTable';

export default function TheoryTableExample() {
  const mockData: TheoryRow[] = [
    { subtopic: 'Health Communication', theory: 'Cognitive Behavioral Therapy', citations: 51, isTopThree: true },
    { subtopic: 'Health Communication', theory: 'Motivational Interviewing', citations: 13, isTopThree: false },
    { subtopic: 'Health Communication', theory: 'The Belmont Report', citations: 13, isTopThree: false },
    { subtopic: 'Mental Health', theory: 'The DSM-5', citations: 33, isTopThree: true },
    { subtopic: 'Mental Health', theory: 'The Dark Triad', citations: 4, isTopThree: false },
    { subtopic: 'Personality', theory: 'Five Factor Model', citations: 25, isTopThree: true },
    { subtopic: 'Personality', theory: 'HEXACO Model', citations: 8, isTopThree: false },
  ];

  return (
    <div className="h-[500px] p-6 bg-card rounded-lg border border-card-border">
      <TheoryTable
        data={mockData}
        title="Subtopics and Theories in Social-Clinical Cluster"
        onTheoryClick={(theory) => console.log('Theory clicked:', theory)}
      />
    </div>
  );
}
