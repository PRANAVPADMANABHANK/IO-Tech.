import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  subscription: {
    email: string;
    isSubmitting: boolean;
    isSubmitted: boolean;
    error: string | null;
  };
  appointment: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    isSubmitting: boolean;
    isSubmitted: boolean;
    error: string | null;
  };
}

const initialState: FormState = {
  subscription: {
    email: '',
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  },
  appointment: {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setSubscriptionEmail: (state, action: PayloadAction<string>) => {
      state.subscription.email = action.payload;
    },
    setSubscriptionSubmitting: (state, action: PayloadAction<boolean>) => {
      state.subscription.isSubmitting = action.payload;
    },
    setSubscriptionSubmitted: (state, action: PayloadAction<boolean>) => {
      state.subscription.isSubmitted = action.payload;
    },
    setSubscriptionError: (state, action: PayloadAction<string | null>) => {
      state.subscription.error = action.payload;
    },
    resetSubscription: (state) => {
      state.subscription = initialState.subscription;
    },
    setAppointmentField: (state, action: PayloadAction<{ field: keyof FormState['appointment']; value: string }>) => {
      const { field, value } = action.payload;
      if (field !== 'isSubmitting' && field !== 'isSubmitted' && field !== 'error') {
        (state.appointment as any)[field] = value;
      }
    },
    setAppointmentSubmitting: (state, action: PayloadAction<boolean>) => {
      state.appointment.isSubmitting = action.payload;
    },
    setAppointmentSubmitted: (state, action: PayloadAction<boolean>) => {
      state.appointment.isSubmitted = action.payload;
    },
    setAppointmentError: (state, action: PayloadAction<string | null>) => {
      state.appointment.error = action.payload;
    },
    resetAppointment: (state) => {
      state.appointment = initialState.appointment;
    },
  },
});

export const {
  setSubscriptionEmail,
  setSubscriptionSubmitting,
  setSubscriptionSubmitted,
  setSubscriptionError,
  resetSubscription,
  setAppointmentField,
  setAppointmentSubmitting,
  setAppointmentSubmitted,
  setAppointmentError,
  resetAppointment,
} = formSlice.actions;

export default formSlice.reducer;
