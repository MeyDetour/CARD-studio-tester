import { connectSocket } from "../websocket/connection.js";
import { homePage } from "../../pages/home/home.js";
import  {testConfigPage }  from "../../pages/testConfig/testConfig.js";
import { page401 } from "../../pages/page401/page401.js";

export async function loadRoute(params = {}) {
  const route = params.path;
  if (!route) {
    console.warn("No route provided, navigating to home page");
    navigateTo({ path: "/" });
    return;
  }

  let content = document.querySelector("#content");
  let html = "";
  console.log("Navigating to:", route, params);
 
 
  switch (route) {
    case "/test-config":
      html = testConfigPage(params);
      break; 
    case "/home":
      html = homePage(params);
      break;
    case "/page-401":
      html = page401(params);
      break;
    default:
      html = homePage(params);
      break;
  }
  content.innerHTML = html;
}

export function navigateTo(route, params = {}) {
  loadRoute(route, params);
}
window.navigateTo = navigateTo; 