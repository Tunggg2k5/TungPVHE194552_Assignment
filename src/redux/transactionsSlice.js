import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/transactionService';

// ===== Async Thunks (gọi API bất đồng bộ) =====

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async () => {
    return await api.getAllTransactions();
  }
);

export const fetchTransactionById = createAsyncThunk(
  'transactions/fetchById',
  async (id) => {
    return await api.getTransactionById(id);
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/add',
  async (data) => {
    return await api.createTransaction(data);
  }
);

export const editTransaction = createAsyncThunk(
  'transactions/edit',
  async ({ id, data }) => {
    return await api.updateTransaction(id, data);
  }
);

export const removeTransaction = createAsyncThunk(
  'transactions/remove',
  async (id) => {
    await api.deleteTransaction(id);
    return id;
  }
);

// ===== Slice =====

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- Fetch all ---
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // --- Fetch by id ---
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index >= 0) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })

      // --- Add ---
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      // --- Edit ---
      .addCase(editTransaction.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index >= 0) {
          state.items[index] = action.payload;
        }
      })

      // --- Remove ---
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export default transactionsSlice.reducer;
