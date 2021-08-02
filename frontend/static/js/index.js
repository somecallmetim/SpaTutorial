import DashboardView from "./views/DashboardView.js";
import PostsView from "./views/PostsView.js";
import SettingsView from "./views/SettingsView.js";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        { path: "/", view: DashboardView },
        { path: "/posts", view: PostsView },
        { path: "/settings", view: SettingsView }
    ];

    const potentialMatches = routes.map( route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    });

    let match = potentialMatches.find(potentialMatches => potentialMatches.isMatch);

    if(!match){
        match = {
            route: routes[0],
            isMatch: true
        }
    }

    const view = new match.route.view();

    document.querySelector('#app').innerHTML = await view.getHtml();;
}

window.addEventListener('popstate', router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener('click', e => {
        if(e.target.matches("[data-link]")){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
})