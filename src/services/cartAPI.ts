export const addProductToCart = async (product: {
  id: string;
  name: string;
  price: number;
  image: string;
}) => {
  const res = await fetch("/api/user/cart/add", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({product}),
  });

  if (!res.ok) throw new Error("Błąd przy dodawaniu produktu");
};

export const incrementProductQuantity = async (productId: string) => {
  const res = await fetch("/api/user/cart/increment", {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({productId}),
  });
  if (!res.ok) throw new Error("Błąd przy zwiększaniu ilości");
};

export const decrementProductQuantity = async (productId: string) => {
  const res = await fetch("/api/user/cart/decrement", {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({productId}),
  });
  if (!res.ok) throw new Error("Błąd przy zmniejszaniu ilości");
};

export const removeProductFromCart = async (productId: string) => {
  const res = await fetch("/api/user/cart/remove", {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({productId}),
  });
  if (!res.ok) throw new Error("Błąd przy usuwaniu produktu");
};

export const clearCartAPI = async () => {
  const res = await fetch("/api/user/cart/clear", {method: "DELETE"});
  if (!res.ok) throw new Error("Błąd przy czyszczeniu koszyka");
};
