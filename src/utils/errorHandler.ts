import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '../types/apiTypes';
import type { TFnType } from '@tolgee/react';
import { toast } from 'sonner';

export function handleApiError(
  error: AxiosError<ApiErrorResponse>,
  t: TFnType,
  defaultMessageKey: string = 'common.error.unexpected'
) {
  const errorData = error.response?.data;
  
  // Check for error key in detail, description, or violations
  const errorKey = errorData?.detail || 
                   errorData?.description || 
                   errorData?.violations?.[0]?.message;
  
  // If we have an error key, try to translate it, otherwise use default message
  if (errorKey) {
    toast.error(t(errorKey, t(defaultMessageKey, 'An unexpected error occurred')));
  } else {
    toast.error(t(defaultMessageKey, 'An unexpected error occurred'));
  }
}