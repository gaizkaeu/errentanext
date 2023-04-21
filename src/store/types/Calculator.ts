export interface Calculation {
  id: string;
  type: "calculation";
  attributes: CalculationAttributes; 
}

export interface CalculationManage {
  id: string;
  type: "calculation";
  attributes: CalculationManageAttributes; 
}

export interface Calculator {
  id: string;
  type: "calculator";
  attributes: CalculatorAttributes;
}

export interface CalculatorManage {
  id: string;
  type: "calculator";
  attributes: CalculatorManageAttributes;
}

export interface CalculationAttributes {
  input: {
    [key: string]: string;
  }
  output: {
    classification: string;
  }
  predicted_at: string;
  calculator_id: string;
  price_result: number;
}

export interface CalculatorAttributes {
  topic_name: string;
  calculation_topic_id: string;
  organization_id: string;

  questions: Question[];
}

export interface CalculatorManageAttributes extends CalculatorAttributes {
  classifications: {
    [key: string]: string;
  }
  correct_rate: number;
  sample_count: number;
  exposed_variables_formatted: {
    [key: string]: string;
  },
  version: number;
  dot_visualization: string;
  last_trained_at: string;
}

export interface CalculationManageAttributes extends CalculationAttributes {
  verified: boolean;
  train_with: boolean;
  calculator_version: number;
  stale_calculation: boolean;
  questions: Question[];
  eligible_for_training: boolean;
}

export interface IQuestion {
  name: string;
  title: string;
  value?: string;
}

export interface QuestionInput extends IQuestion {
  field_type: "input";
}

export interface QuestionSelectUnique extends IQuestion {
  field_type: "select_unique";
  options: string[];
}

export type Question = QuestionInput | QuestionSelectUnique;