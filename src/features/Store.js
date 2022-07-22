import {configureStore} from "@reduxjs/toolkit";
import reducer from "./Slice";

export default configureStore({
  reducer: {
    reducer: reducer,
  },
});
