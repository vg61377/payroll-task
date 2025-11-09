import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/index";
import theme from "./Theme";
import { ThemeProvider } from "@emotion/react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
