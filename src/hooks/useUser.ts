import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error("Not authenticated");
    return res.json();
  });

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR("/api/auth/me", fetcher);

  return {
    user: data?.user || null,
    isLoggedIn: !!data?.user,
    isLoading,
    error,
    mutate,
  };
}
