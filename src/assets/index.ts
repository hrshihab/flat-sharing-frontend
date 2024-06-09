import { flatApi } from "@/redux/api/flatApi";
import { request } from "http";

const assets = {
  images: {
    // images will go here
    hero: require("./Hero.png"),
    //flats: require("./landing_page/flats.png"),
    atm: require("./landing_page/atm-card.png"),
    videoCall: require("./landing_page/video_call.png"),
    report: require("./landing_page/diagnostic.png"),
    budge: require("./landing_page/badge.png"),
    folder: require("./landing_page/folder.png"),
    flat1: require("./images/flat1.jpg"),
    flat2: require("./images/flat2.jpg"),
    flat3: require("./images/flat3.jpg"),
    flat4: require("./images/bed.png"),
    logo: require("./logo.png"),
    avatar: require("./man_avatar.png"),

    stethoscope: require("./images/Stetoscope.png"),
    familyOnBeach: require("./images/familyOnBeach.png"),
  },
  svgs: {
    //logo: require("./svgs/Logo.svg"),
    search: require("./svgs/search.svg"),
    location: require("./svgs/location.svg"),
    profile: require("./svgs/profile.svg"),
    grid: require("./svgs/grid.svg"),
    arrow: require("./svgs/arrow.svg"),
    award: require("./svgs/award-icon.svg"),
    everyThree: require("./svgs/EveryThreeMins.svg"),
    keys: require("./svgs/Keys.svg"),
    welcome: require("./svgs/Welcome.svg"),
    why: require("./svgs/why.jpg"),
  },
};

export default assets;
