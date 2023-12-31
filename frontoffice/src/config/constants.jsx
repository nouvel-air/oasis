import { ReactComponent as CampingIcon } from '../assets/camping.svg';
import { ReactComponent as InsoliteIcon } from '../assets/insolite.svg';
import { ReactComponent as GiteIcon } from '../assets/gite.svg';
import { ReactComponent as HoteIcon } from '../assets/hote.svg';
import { ReactComponent as SalleIcon } from '../assets/salle.svg';

export const iconsMapping = {
  [process.env.REACT_APP_MIDDLEWARE_URL + 'types/chambres-d-hotes-tables-d-hotes']: HoteIcon,
  [process.env.REACT_APP_MIDDLEWARE_URL + 'types/hebergements-insolites']: InsoliteIcon,
  [process.env.REACT_APP_MIDDLEWARE_URL + 'types/gites']: GiteIcon,
  [process.env.REACT_APP_MIDDLEWARE_URL + 'types/camping']: CampingIcon,
  [process.env.REACT_APP_MIDDLEWARE_URL + 'types/accueil-de-stages-salles']: SalleIcon,
};

export const services = [
  {
    id: process.env.REACT_APP_MIDDLEWARE_URL + 'types/chambres-d-hotes-tables-d-hotes',
    icon: HoteIcon,
    label: 'Chambres d\'hôtes\nTables d\'hôtes'
  },
  {
    id: process.env.REACT_APP_MIDDLEWARE_URL + 'types/gites',
    icon: GiteIcon,
    label: "Gîtes"
  },
  {
    id: process.env.REACT_APP_MIDDLEWARE_URL + 'types/camping',
    icon: CampingIcon,
    label: "Camping"
  },
  {
    id: process.env.REACT_APP_MIDDLEWARE_URL + 'types/accueil-de-stages-salles',
    icon: SalleIcon,
    label: 'Accueil de stages\nsalles'
  },
  {
    id: process.env.REACT_APP_MIDDLEWARE_URL + 'types/hebergements-insolites',
    icon: InsoliteIcon,
    label: 'Hébergements insolites'
  },
];
