import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router/Router";

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
