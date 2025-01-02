import { createContext, useEffect, useState } from "react";
//import { food_list } from "../assets/frontend_assets/assets.js";
import axios from 'axios';


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const deliveryFee = 80;
  const url= "https://food-backend-98vh.onrender.com";
  const [token,setToken]= useState("");
  const [food_list,setFoodList]= useState([])

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
    if(token) {
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
      
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0,
    }));
    if (token) {
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
      
    }

  };

  const calculateCartTotals = () => {
    const subtotal = food_list.reduce((acc, item) => {
      if (cartItems[item._id] > 0) {
        acc += item.price * cartItems[item._id];
      }
      return acc;
    }, 0);

    const total = subtotal === 0 ? 0 : subtotal + deliveryFee;
    return { subtotal, deliveryFee, total };
  };

  const fetchFoodList= async ()=>{
    const response= await axios.get(url+"/api/food/list");
    setFoodList(response.data.data);
  }
 const loadCartData= async(token)=>{
  const response= await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartItems);


  
 }
  useEffect(() => {
    console.log(cartItems);
    async function loadData() {
      await fetchFoodList()
      
    }
    loadData();
  }, [cartItems]);


  useEffect(()=>{
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"));
      //await loadCartData(localStorage.getItem("token"));

      
    }
  },[])

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    calculateCartTotals,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
