import React from "react";
import AccountSettings from "../profile/AccountSettings";
import Gallery from "../gallery/Gallery";
import { Route } from "react-router-dom";
import ProfilePage from "../profile/ProfilePage";
import HomePage from "../homepage/Homepage";
import Locator from "../locator/Locator";
const ContentRouter = () => {
    return (
        <div>
            <Route path="/homepage" component={HomePage} />
            <Route path="/accountsettings" component={AccountSettings} />
            <Route path="/profilepage" component={ProfilePage} />
            <Route path="/gallery" component={Gallery} />
            <div className="mt-3">
                <Route path="/locator" component={Locator} />
            </div>
        </div>
    )
}

export default ContentRouter;