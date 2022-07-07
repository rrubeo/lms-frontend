import Router from "next/router";

export const forceReloadUtil = () => {
  Router.reload();
};

export const forceNavigateUtil = (route, filter, subIndex) => {
  // console.log("forceNavigateUtil");
  // console.log(route);
  if (!filter) console.log("MANCANO PARAMETRI");
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
    // console.log("Route next:", buildRoute);
  }

  Router.push(buildRoute);
};

export const forceSearchUtil = (buildRoute) => {
  console.log("forceSearchUtil");
  Router.push(buildRoute);
};
