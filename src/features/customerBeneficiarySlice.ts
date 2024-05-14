import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface FormData {
  id: number;
  name: string;
  account: string;
  bank: string;
  type: string;
}

interface DataObject{
  data: FormData[];
  check: number;
  loading: boolean;
  error: string;
}

const initialState: DataObject = {
  data: [],
  loading: false,
  error: "",
  check: 0,
};

const mockApiData: FormData[] = [
  {id:1, name: 'Sunder', account: '1234567894', bank: 'SBI', type: 'saving' },
  {id: 2, name: 'Rohan', account: '1234567892', bank: 'HDFC', type: 'saving' },
  {id: 3, name: 'Raj', account: '12345678910', bank: 'ICICI', type: 'current' },

];



export const getBeneficiaryList = createAsyncThunk("beneficiarylist", async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockApiData;
});

// export const updateBeneficiaryList = createAsyncThunk("updatebeneficiarylist", async (updatedItem: FormData) => {
//   await new Promise(resolve => setTimeout(resolve, 1000));
//   return updatedItem;
// });


const updateBeneficiaryInAPI = async (updatedBeneficiary: FormData): Promise<FormData> => {
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return updatedBeneficiary;
};

// Define async thunk action to update a user
export const updateBeneficiary = createAsyncThunk(
  'beneficiary/updatedBeneficiary',
  async (updatedBeneficiary: FormData) => {
    const response = await updateBeneficiaryInAPI(updatedBeneficiary);
    return response;
  }
);

const addBeneficiaryToAPI = async (newBeneficiary: FormData): Promise<FormData> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newBeneficiaryId = Math.floor(Math.random() * 1000) + 1;
  const userWithId: FormData = { ...newBeneficiary, id: newBeneficiaryId };
  return userWithId;
};


export const addBeneficiary = createAsyncThunk(
  'users/addUser',
  async (newBeneficiary: FormData) => {
    const response = await addBeneficiaryToAPI(newBeneficiary);
    return response;
  }
);


const deleteBeneficiaryFromAPI = async (beneficiaryId: number): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`Deleting beneficiary with ID: ${beneficiaryId}`);
};

export const deleteBeneficiary = createAsyncThunk(
  'beneficiary/deleteBeneficiary',
  async (beneficiaryId: number) => {
    await deleteBeneficiaryFromAPI(beneficiaryId);
    return beneficiaryId;
  }
);



const customerBeneficiaryReducer = createSlice({
  name: "beneficiarylists",
  initialState,
  reducers: {
    clear: (state: any) => {
      state.loading = false;
      state.check = 0;
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBeneficiaryList.pending, (state: any, action: any)  => {
      state.loading = true;
    });
    builder.addCase(getBeneficiaryList.fulfilled, (state, action) => {
      state.loading = false;
      state.data =action.payload;
    });
    builder.addCase(getBeneficiaryList.rejected, (state, action) => {
      state.loading = true;
    });

     //update parent product
    //  builder.addCase(updateBeneficiaryList.pending, (state, action) => {
    //   state.loading = true;
    // });

    // builder.addCase(updateBeneficiaryList.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const updatedItem = action.payload;
    //   const index = state.data.findIndex(item => item.id === updatedItem.id);
    //   if (index !== -1) {
    //     state.data[index] = updatedItem;
    //   }
    //  ;
    // });

    // builder.addCase(updateBeneficiaryList.rejected, (state, action) => {
    //   state.loading = false;
    // });


    builder.addCase(addBeneficiary.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addBeneficiary.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);

    });

    builder.addCase(addBeneficiary.rejected, (state, action) => {
      state.loading = false;
    });



    builder.addCase(deleteBeneficiary.pending, (state) => {
      state.loading = true;
    });

    // Handle deleteUser.fulfilled
    builder.addCase(deleteBeneficiary.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter(data => data.id !== action.payload);
    });

    // Handle deleteUser.rejected
    builder.addCase(deleteBeneficiary.rejected, (state, action) => {
      state.loading = false;
    });


    builder.addCase(updateBeneficiary.pending, (state) => {
      state.loading = true;
    });

    // Handle updateUser.fulfilled
    builder.addCase(updateBeneficiary.fulfilled, (state, action) => {
      state.loading = false;
      const updatedBeneficiary = action.payload;
      const index = state.data.findIndex(user => user.id === updatedBeneficiary.id);
      if (index !== -1) {
        state.data[index] = updatedBeneficiary;
      }
    });


    // Handle updateUser.rejected
    builder.addCase(updateBeneficiary.rejected, (state, action) => {
      state.loading = false;
    });
  
  },
});
export const { clear } = customerBeneficiaryReducer.actions;
export default customerBeneficiaryReducer.reducer;
