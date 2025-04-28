import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Not authenticated");
    return res.json();
  });

export function useUser() {
  const {data, error, isLoading, mutate} = useSWR("/api/auth/me", fetcher, {
    refreshInterval: 0, // nie odświeżaj co jakiś czas
    revalidateOnFocus: false, // nie re-fetchuj po powrocie do zakładki
    revalidateOnReconnect: false, // nie re-fetchuj po reconnect
    revalidateIfStale: false, // nie re-fetchuj jak dane są stare
  });

  //  Dodajemy funkcję logout
  const logout = async () => {
    await fetch("/api/auth/logout");
    mutate(null); // Reset danych użytkownika
  };

  return {
    user: data?.user || null,
    isLoggedIn: !!data?.user,
    isLoading,
    error,
    mutate,
    logout,
  };
}
