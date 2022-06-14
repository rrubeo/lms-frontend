import Router from "next/router";

export const forceReloadUtil = () => {
  Router.reload();
};

export const forceNavigateUtil = (route, filter) => {
  console.log("forceNavigateUtil");
  const buildRoute = `${route}/${filter.id}`;
  // console.log(route);
  // console.log(filter);
  // console.log(buildRoute);
  Router.push(buildRoute);  
};

export const forceSearchUtil = (buildRoute) => {
  console.log("forceSearchUtil"); 
  Router.push(buildRoute);  
};
