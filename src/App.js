import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let firstRendering = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const sendDataToFirebase = async () => {
      dispatch(
        uiActions.showNotification({
          status: "",
          title: "pending...",
          message: "the request is pending",
        })
      );
      const response = await fetch(
        "https://redux-advanced-8c5e4-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("response failed");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success",
          message: "request successfully sent",
        })
      );
    };

    if (firstRendering) {
      firstRendering = false;
      return
    }

    sendDataToFirebase().catch((error) =>
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error",
          message: "there was be an error",
        })
      )
    );
  }, [cart, dispatch]);

  return (
    <>
      {notification  && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
