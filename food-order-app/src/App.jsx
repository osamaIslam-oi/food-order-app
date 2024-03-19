import Meals from "./components/Meals";
import Header from "./components/Header";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressProvider } from "./store/UserProgressContext";
import Cart from "./components/UI/Cart";
import Checkout from "./components/Checkout";

function App() {
  return (
    <UserProgressProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressProvider>
  );
}

export default App;
