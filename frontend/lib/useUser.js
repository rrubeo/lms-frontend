import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { fetchJson } from "../lib";
import { PAGE_HOME, PAGE_HOME_STUDENT } from "../lib/redirect";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  // console.log("useUser");
  const { data: user, mutate: mutateUser } = useSWR("/api/user", fetchJson);
  useEffect(() => {
    // console.log("useEffect");
    // console.log(redirectTo);
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      if (redirectTo == PAGE_HOME && user?.isStudent == 1) {
        // console.log("STUDENTE");
        Router.push(PAGE_HOME_STUDENT);
      } else {
        // console.log("ALTRO");
        Router.push(redirectTo);
      }
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
