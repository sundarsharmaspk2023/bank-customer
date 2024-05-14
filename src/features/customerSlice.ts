import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface FormData {
  id: number;
  fullName: string;
  address: string;
  country: string;
  pincode: string;
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
  {id: 1, fullName: 'Sunder', address: 'jogeswai', country: 'India', pincode: '201301' },
  {id:2, fullName: 'Jay ', address: 'Malad', country: 'India', pincode: '400022' },
];



export const getUserList = createAsyncThunk("userlist", async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockApiData;
});

const addUserToAPI = async (newUser: FormData): Promise<FormData> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newUserId = Math.floor(Math.random() * 1000) + 1;
  const userWithId: FormData = { ...newUser, id: newUserId };
  return userWithId;
};


export const addUser = createAsyncThunk(
  'users/addUser',
  async (newUser: FormData) => {
    const response = await addUserToAPI(newUser);
    return response;
  }
);


const userReducer = createSlice({
  name: "userlists",
  initialState,
  reducers: {
    clear: (state: any) => {
      state.loading = false;
      state.check = 0;
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserList.pending, (state: any, action: any)  => {
      state.loading = true;
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.loading = false;
      state.data =action.payload;
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      state.loading = true;
    });

    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);

    });

    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
    });

  
  },
});
export const { clear } = userReducer.actions;

export default userReducer.reducer;
