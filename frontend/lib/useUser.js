import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { fetchJson } from "../lib";
import { PAGE_HOME, PAGE_HOME_STUDENT } from "../lib/redirect";
import { getLogger } from "../logging/log-util";
const logger = getLogger("useUser");

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  logger.info(`CHIAMATA useUser`);
  const { data: user, mutate: mutateUser } = useSWR("/api/user", fetchJson);
  logger.info(user);
  useEffect(() => {
    // console.log("useEffect");
    // console.log(redirectTo);
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet

    if (!redirectTo) {
      logger.info(`useUser 1 NO REDIRECT`);
    } else {
      logger.info(`useUser 1 redirectTo [${redirectTo}]`);
    }
    if (!user) {
      logger.info(`useUser 1 NO USER`);
    } else {
      logger.info(user);
    }

    if (!redirectTo || !user) {
      logger.info(`useUser 1 ESCO`);
      return;
    }

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      // logger.info(`useUser 2`);
      if (user != undefined) {
        logger.info(`useUser 2 is present`);
        if (user.isLoggedIn) {
          logger.info(`useUser 2 is LOGGED`);
        } else {
          logger.info(`useUser 2 NOT LOGGED`);
        }
      } else {
        logger.info(`useUser 2 is Undefined`);
      }

      if (redirectTo == PAGE_HOME && user?.isStudent == 1) {
        logger.info(`useUser 3 STUDENTE`);
        logger.info(`VAI => [${PAGE_HOME_STUDENT}]`);
        Router.push(PAGE_HOME_STUDENT);
      } else {
        logger.info(`useUser 4 USER`);
        logger.info(`useUser 4 redirectTo [${redirectTo}]`);
        logger.info(`VAI => [${redirectTo}]`);
        Router.push(redirectTo);
      }
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
