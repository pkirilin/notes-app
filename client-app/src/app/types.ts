export type OperationStatus = 'initial' | 'idle' | 'completed' | 'error';

export type OperationResult = {
  status: OperationStatus;
  message?: string;
};

export interface FormHookResultBase<TValue, TBinding> {
  value: TValue;
  setValue: React.Dispatch<React.SetStateAction<TValue>>;
  binding: TBinding;
}
