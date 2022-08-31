import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./index.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
console.log("app not mounted: ", document.getElementById("cp-agency-crew-profile-button"));
const targetNode: any = document;

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Create an observer instance linked to the callback function
const observer = new MutationObserver(observerCallback);
let ids: any[] = [];
const createDOMMap = function (element: any) {
    let nodes = [];
    console.log("id: ", element.id)
    if (element.id) ids.push(element.id);
    for (let i = 0; i < element.childNodes.length; i++) {
        let details: any = {
            id: element.childNodes[i].id,
        };
        details.children = createDOMMap(element.childNodes[i]);
        nodes.push(details);
        continue;
    }
    return nodes;
};
// Callback function to execute when mutations are observed
function observerCallback(mutationList: any, observer: any) {
    mutationList.map(function (mutation: any) {
        createDOMMap(mutation.target);
        console.log(
            "ids: ",
            ids.some((i) => i === "cp-agency-crew-profile-button")
        );
        if (ids.some((i) => i === "cp-agency-crew-profile-button")) {
            observer.disconnect();
            console.log("loaded")
            return mutation;
        }
    });
}

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

app.mount("#app");
