import { IconButtonProps } from "../components/IconButton";
import { mdiGithub, mdiSpotify, mdiMusicCircle, mdiSoundcloud } from "@mdi/js";

const links: IconButtonProps[] = [
    {
        "href": "https://github.com/jy1263/",
        "icon": mdiGithub,
        "text": "Github"
    },
    {
        "href": "https://github.com/jy1263/jy1263.github.io",
        "icon": mdiGithub,
        "text": "This Repository"
    },
    {
        "href": "https://open.spotify.com/artist/15HdoPMP89EsIfIvN1coko?si=pyuDsYIpRcu2AHDYVYIn-Q",
        "icon": mdiSpotify,
        "text": "Spotify"
    },
    {
        "href": "https://ayanamy.bandcamp.com/",
        "icon": mdiMusicCircle,
        "text": "Bandcamp"
    },
    {
        "href": "https://soundcloud.com/owotter",
        "icon": mdiSoundcloud,
        "text": "Soundcloud"
    }
];

export default links;