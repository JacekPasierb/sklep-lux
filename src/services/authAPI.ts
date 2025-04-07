
export const loginUser = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) throw new Error(data.message || "Błąd logowania");
  
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || "Błąd logowania");
      } else {
        throw new Error("Błąd logowania");
      }
    }
  };
  