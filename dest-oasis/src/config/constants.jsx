import { ReactComponent as CampingIcon } from '../assets/camping.svg';
import { ReactComponent as InsoliteIcon } from '../assets/insolite.svg';
import { ReactComponent as GiteIcon } from '../assets/gite.svg';
import { ReactComponent as HoteIcon } from '../assets/hote.svg';
import { ReactComponent as SalleIcon } from '../assets/salle.svg';

export const iconsMapping = {
  [import.meta.env.VITE_APP_MIDDLEWARE_URL + 'types/chambres-d-hotes-tables-d-hotes']: HoteIcon,
  [import.meta.env.VITE_APP_MIDDLEWARE_URL + 'types/hebergements-insolites']: InsoliteIcon,
  [import.meta.env.VITE_APP_MIDDLEWARE_URL + 'types/gites']: GiteIcon,
  [import.meta.env.VITE_APP_MIDDLEWARE_URL + 'types/camping']: CampingIcon,
  [import.meta.env.VITE_APP_MIDDLEWARE_URL + 'types/accueil-de-stages-salles']: SalleIcon,
};

export const services = [
  {
    id: import.meta.env.VITE_APP_MIDDLEWARE_URL + 'types/chambres-d-hotes-tables-d-hotes',
    icon: HoteIcon,
    label: <span>Chambres d'hôtes<br />Tables d'hôtes</span>
  },
  {
    id: import.meta.env.VITE_APP_MIDDLEWARE_URL + 'types/gites',
    icon: GiteIcon,
    label: "Gîtes"
  },
  {
    id: import.meta.env.VITE_APP_MIDDLEWARE_URL + 'types/camping',
    icon: CampingIcon,
    label: "Camping"
  },
  {
    id: import.meta.env.VITE_APP_MIDDLEWARE_URL + 'types/accueil-de-stages-salles',
    icon: SalleIcon,
    label: <span>Accueil de stages<br />salles</span>
  },
  {
    id: import.meta.env.VITE_APP_MIDDLEWARE_URL + 'types/hebergements-insolites',
    icon: InsoliteIcon,
    label: <span>Hébergements<br />insolites</span>
  },
];
