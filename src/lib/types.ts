export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  type: "text" | "email" | "phone" | "number" | "date" | "textarea" | "select" | "radio" | "checkbox" | "toggle";
  label: string;
  description?: string;
  placeholder?: string;
  required: boolean;
  options?: QuestionOption[];
  defaultValue?: string | boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
  conditionalOn?: {
    questionId: string;
    value: string | boolean;
  };
  group?: string;
}

export interface DocumentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface DocumentTemplate {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  price: number;
  reviewPrice: number;
  estimatedTime: string;
  difficulty: "Simple" | "Moderate" | "Complex";
  pageCount: number;
  jurisdictions: string[];
  features: string[];
  whenToUse: string;
  whatInside: string[];
  commonMistakes: string[];
  faqs: { question: string; answer: string }[];
  questions: Question[];
  templateVariables: string[];
  icon: string;
  popular?: boolean;
  new?: boolean;
}

export interface Order {
  id: string;
  documentSlug: string;
  documentName: string;
  answers: Record<string, unknown>;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  reviewRequested: boolean;
  status: "pending_payment" | "paid" | "generating" | "ready" | "under_review" | "approved" | "delivered";
  paymentMethod?: "mpesa" | "bank";
  paymentReference?: string;
  createdAt: string;
  downloadUrl?: string;
}
