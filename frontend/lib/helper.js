import Router from "next/router";
import { getLogger } from "../logging/log-util";

const logger = getLogger("helper");

export const forceReloadUtil = () => {
  Router.reload();
};

export const forceNavigateUtil = (route, filter, subIndex) => {
  // console.log("forceNavigateUtil");
  // console.log(route);
  // console.log(filter);
  // console.log(subIndex);
  if (!filter) logger.error(`Parametri di navigazione mancanti`);
  if (filter.id.toString().search("_") != -1) {
    const myArray = filter.id.split("_");
    filter.id = myArray[0];
  }

  let buildRoute = `${route}/${filter.id}`;

  if (subIndex.length > 0) {
    // console.log("INSIDE");
    // console.log(subIndex);
    // console.log("JOIN", subIndex.join("/"));
    // buildRoute = `${buildRoute}/${subIndex[0]}`;
    buildRoute = `${buildRoute}/${subIndex.join("/")}`;
  }

  logger.debug(`Navigazione: ${buildRoute}`);
  Router.push(buildRoute);
};

export const forceSearchUtil = (buildRoute) => {
  // console.log("forceSearchUtil");
  Router.push(buildRoute);
};
