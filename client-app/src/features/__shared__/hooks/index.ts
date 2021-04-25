import { createSelectorHook } from 'react-redux';
import { RootState } from '../../../app/store';

export const useTypedSelector = createSelectorHook<RootState>();
