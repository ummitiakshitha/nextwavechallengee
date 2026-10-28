import React, { useState } from 'react';
import { Play, Sparkles, CheckCircle2, Copy, Check, Terminal, Cpu, Database, ArrowRight } from 'lucide-react';

interface ProjectTrack {
  id: string;
  name: string;
  tag: string;
  defaultPrompt: string;
  suggestedPrompts: string[];
  steps: {
    title: string;
    detail: string;
  }[];
  simulatedResponse: {
    summary: string;
    extractedKeyTerms: string[];
    technicalArchitecture: string;
    studentNextStep: string;
  };
}

const TRACKS: ProjectTrack[] = [
  {
    id: 'paper-summarizer',
    name: 'Research Paper & Concept Synthesizer',
    tag: 'Academic & Core Engineering',
    defaultPrompt: 'Summarize the core trade-offs between Transformer self-attention vs. State Space Models (Mamba) for long-context engineering documents.',
    suggestedPrompts: [
      'Explain backpropagation intuitively for a 3rd year electronics student',
      'Compare Redis vs PostgreSQL for session caching in a college project',
    ],
    steps: [
      { title: 'Token Embedding', detail: 'Splits raw technical prompt into 512 token vectors' },
      { title: 'Semantic Context Match', detail: 'Retrieves relevant IEEE / arXiv chunks via vector similarity' },
      { title: 'Constrained Reasoning', detail: 'Zero-shot prompt template restricts hallucinations' },
      { title: 'Markdown Response Stream', detail: 'Emits structured, cited summary with actionable takeaways' },
    ],
    simulatedResponse: {
      summary: 'Transformers utilize quadratic O(N²) attention matrices providing global token cross-attention, ideal for multi-document synthesis. State Space Models (e.g., Mamba) operate with linear O(N) memory complexity, enabling 10x longer contexts on consumer laptops.',
      extractedKeyTerms: ['O(N²) Complexity', 'State Space Duality', 'Selective Attention', 'Memory Bandwidth Bottleneck'],
      technicalArchitecture: 'FastAPI + HuggingFace sentence-transformers/all-MiniLM-L6-v2 + Free HuggingFace Inference API',
      studentNextStep: 'In the 60-minute workshop, you will build and run this exact pipeline locally in Python!',
    },
  },
  {
    id: 'placement-prep',
    name: 'Placement Interview Code & Resume Matcher',
    tag: 'Final Year Careers',
    defaultPrompt: 'Analyze my final-year project ("IoT Smart Grid with MQTT & Node.js") and generate 3 technical interview questions top software companies ask.',
    suggestedPrompts: [
      'Generate a 30-day DSA study roadmap for product companies',
      'What are the top 5 questions on database indexing and B+ trees?',
    ],
    steps: [
      { title: 'Resume Section Parsing', detail: 'Identifies tech stack keywords (MQTT, Node.js, concurrency)' },
      { title: 'Company Question Bank Lookup', detail: 'Matches project domain to real Tier-1 placement question archetypes' },
      { title: 'Difficulty Calibration', detail: 'Tunes question depth from Junior SDE to Core Engineering' },
      { title: 'Interview Simulator Output', detail: 'Generates structured questions + model answer frameworks' },
    ],
    simulatedResponse: {
      summary: 'For an IoT Smart Grid project, software interviewers will test asynchronous queueing, edge-to-cloud reliability, and backpressure handling under high concurrent sensor events.',
      extractedKeyTerms: ['QoS Levels (At least once vs exactly once)', 'Backpressure handling', 'TCP Socket Connection Pooling'],
      technicalArchitecture: 'Streamlit UI + LangChain prompt chains + Open-source Ollama / Llama-3-8B backend',
      studentNextStep: 'Deploy a live portfolio app you can showcase to campus recruiters on GitHub!',
    },
  },
  {
    id: 'campus-assistant',
    name: 'Smart Campus Query & Syllabus Assistant',
    tag: 'Student Utilities',
    defaultPrompt: 'What is the syllabus weightage and pass criteria for 7th Semester Distributed Systems, and where can I find previous year exam papers?',
    suggestedPrompts: [
      'Check hostel curfew rules and leave application workflow',
      'Generate sample viva questions for Computer Networks lab',
    ],
    steps: [
      { title: 'University PDF Chunking', detail: 'Splits academic handbook PDFs into overlapping 300-word passages' },
      { title: 'Local ChromaDB Query', detail: 'Searches campus regulations syllabus offline on your laptop' },
      { title: 'Citation Grounding', detail: 'Appends exact page numbers so students can verify exam rules' },
      { title: 'Verified Student Answer', detail: 'Delivers clear, instant guidance with zero human delay' },
    ],
    simulatedResponse: {
      summary: 'Distributed Systems Unit 3 (Consensus & Raft Algorithm) accounts for 28% of end-semester weightage. Internal assessment requires 40% minimum to sit for the university practical exam.',
      extractedKeyTerms: ['Byzantine Fault Tolerance', 'Raft Consensus', 'Vector Clocks', 'CAP Theorem'],
      technicalArchitecture: 'Gradio Web Interface + ChromaDB Vector Store + Free local lightweight SLM',
      studentNextStep: 'Build a personalized assistant for your own engineering college department.',
    },
  },
];

export const InteractiveAIPreview: React.FC = () => {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const track = TRACKS[selectedTrackIndex];
  const [promptText, setPromptText] = useState(track.defaultPrompt);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTrackChange = (index: number) => {
    setSelectedTrackIndex(index);
    setPromptText(TRACKS[index].defaultPrompt);
    setCurrentStep(-1);
    setHasCompleted(false);
  };

  const handleRunSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setHasCompleted(false);
    setCurrentStep(0);

    // Step 0
    setTimeout(() => {
      setCurrentStep(1);
      // Step 1
      setTimeout(() => {
        setCurrentStep(2);
        // Step 2
        setTimeout(() => {
          setCurrentStep(3);
          // Step 3
          setTimeout(() => {
            setIsRunning(false);
            setHasCompleted(true);
          }, 700);
        }, 700);
      }, 700);
    }, 700);
  };

  const handleCopyCode = () => {
    const snippet = `# NxtWave 60-Minute AI Workshop Sample Starter
from transformers import pipeline

# 1. Initialize free open-source model pipeline (Zero API Cost)
classifier = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")

# 2. Run inference on student prompt
result = classifier("${promptText.slice(0, 60)}...")
print("Pipeline Output:", result)
`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="interactive-preview" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="nxt-badge bg-blue-100 text-[#1565D8] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Workshop Preview
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] tracking-tight">
            From Curiosity to a Working AI Experience
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Test this simulated demonstration to see how inputs, embeddings, and model inference connect together. You will build and deploy this hands-on project during the 60-minute session.
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200/80">
            <span>ℹ️ Simulated preview environment. Requires zero paid external API subscriptions.</span>
          </div>
        </div>

        {/* Track Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {TRACKS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => handleTrackChange(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                selectedTrackIndex === idx
                  ? 'bg-[#1565D8] text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{t.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                selectedTrackIndex === idx ? 'bg-blue-800/60 text-blue-100' : 'bg-slate-100 text-slate-500'
              }`}>
                {t.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input and Execution */}
          <div className="lg:col-span-6 space-y-6">
            <div className="nxt-card p-6 bg-white shadow-sm hover:border-slate-300">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-[#1565D8]" />
                  Step 1: Student Input Prompt
                </label>
                <span className="text-xs text-slate-400">Customizable</span>
              </div>

              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                rows={3}
                className="w-full p-3.5 text-sm rounded-xl border border-slate-200 focus:border-[#1565D8] focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 font-medium resize-none transition-all"
                placeholder="Enter engineering query or prompt..."
              />

              {/* Sample Prompt Chips */}
              <div className="mt-3">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Quick suggestions:</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {track.suggestedPrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setPromptText(p)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-[#1565D8] text-slate-600 transition-colors text-left"
                    >
                      "{p.slice(0, 48)}..."
                    </button>
                  ))}
                </div>
              </div>

              {/* Run Button */}
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={handleRunSimulation}
                  disabled={isRunning}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md transition-all ${
                    isRunning
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-[#1565D8] hover:bg-[#0D47A1] shadow-blue-500/25 active:scale-[0.98]'
                  }`}
                >
                  <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : 'fill-current'}`} />
                  {isRunning ? 'Processing AI Pipeline...' : 'Run Simulated AI Pipeline'}
                </button>

                <button
                  onClick={handleCopyCode}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1565D8] px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  title="Copy Python starter snippet"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied Starter' : 'Copy Python Starter'}
                </button>
              </div>
            </div>

            {/* Pipeline Stage Indicators */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-emerald-600" />
                4-Stage Pipeline Execution
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {track.steps.map((s, idx) => {
                  const isActive = currentStep === idx;
                  const isDone = currentStep > idx || hasCompleted;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-left transition-all duration-300 ${
                        isActive
                          ? 'border-blue-500 bg-blue-50/70 shadow-sm ring-2 ring-blue-200'
                          : isDone
                          ? 'border-emerald-200 bg-emerald-50/40 text-slate-700'
                          : 'border-slate-200 bg-slate-50/60 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isDone
                              ? 'bg-emerald-600 text-white'
                              : isActive
                              ? 'bg-[#1565D8] text-white animate-pulse'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isDone ? '✓' : idx + 1}
                        </div>
                        <span className={`text-xs font-bold ${isActive ? 'text-[#1565D8]' : isDone ? 'text-slate-800' : 'text-slate-500'}`}>
                          {s.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-2 pl-7">{s.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Simulated Live Output */}
          <div className="lg:col-span-6">
            <div className="nxt-card p-6 bg-gradient-to-b from-white to-blue-50/30 border-blue-200 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-bold text-slate-700">Project Output Window</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                  Simulated Web Output
                </span>
              </div>

              {/* Output Content */}
              <div className="mt-5 space-y-4 min-h-[300px]">
                {isRunning && (
                  <div className="h-[280px] flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-[#1565D8] animate-spin" />
                    <p className="text-sm font-semibold text-slate-700">Synthesizing Neural Output...</p>
                    <p className="text-xs text-slate-500 max-w-xs">
                      Executing step {currentStep + 1} of 4: {track.steps[Math.max(0, currentStep)]?.title}
                    </p>
                  </div>
                )}

                {!isRunning && !hasCompleted && (
                  <div className="h-[280px] flex flex-col items-center justify-center text-center p-6 bg-slate-50/80 rounded-xl border border-dashed border-slate-200">
                    <Database className="w-10 h-10 text-slate-400 mb-2" />
                    <h5 className="text-sm font-bold text-slate-700">Ready to Test</h5>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs">
                      Click the "Run Simulated AI Pipeline" button to trace how a raw student query turns into a finished project output.
                    </p>
                  </div>
                )}

                {hasCompleted && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-left">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-[#1565D8] mb-1">
                        Synthesized Model Output
                      </h5>
                      <p className="text-sm text-slate-800 leading-relaxed font-normal">
                        {track.simulatedResponse.summary}
                      </p>
                    </div>

                    {/* Key Extracted Terms */}
                    <div className="text-left">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Extracted AI Engineering Concepts:
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {track.simulatedResponse.extractedKeyTerms.map((term, i) => (
                          <span
                            key={i}
                            className="text-xs px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-medium shadow-xs"
                          >
                            🏷️ {term}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Architecture Stack */}
                    <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono text-left">
                      <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                        Tech Stack Under The Hood:
                      </div>
                      <div className="text-emerald-400 font-semibold">{track.simulatedResponse.technicalArchitecture}</div>
                    </div>

                    {/* Workshop Promise */}
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-left">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-xs font-semibold text-emerald-900">
                          {track.simulatedResponse.studentNextStep}
                        </span>
                      </div>
                      <a
                        href="#register"
                        className="text-xs font-bold text-[#1565D8] hover:underline flex items-center gap-1 whitespace-nowrap ml-2"
                      >
                        Register to build <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
