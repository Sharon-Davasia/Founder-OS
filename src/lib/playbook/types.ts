export interface ConceptBlock {
  k: string;
  title: string;
  body: string;
}

export interface ChecklistItem {
  text: string;
  note?: string;
}

export interface Mistake {
  title: string;
  body: string;
}

export interface Term {
  term: string;
  def: string;
}

export interface Chapter {
  id: string;
  index: string;
  phase: string;
  title: string;
  tagline: string;
  intro: string;
  concepts: ConceptBlock[];
  checklist: ChecklistItem[];
  mistakes: Mistake[];
  terms: Term[];
  gate: string;
}
