import PlaceCreate from './PlaceCreate';
import PlaceEdit from './PlaceEdit';
import PlaceList from './PlaceList';
import HomeIcon from '@mui/icons-material/Home';

export default {
  config: {
    list: PlaceList,
    create: PlaceCreate,
    edit: PlaceEdit,
    icon: HomeIcon,
    options: {
      label: 'Oasis'
    },
    recordRepresentation: 'pair:label'
  },
  dataModel: {
    types: ['pair:Place'],
    create: {
      container: {
        oasis: '/places'
      }
    },
    list: {
      containers: {
        oasis: ['/places']
      },
      explicitEmbedOnFraming: false, // Increase performance since explicit embed is not necessary
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Oasis |||| Oasis',
      fields: {
        'pair:label': 'Nom',
        'pair:description': 'Description',
        'pair:hasPostalAddress': 'Adresse postale',
        'pair:hasPostalAddress.pair:label': 'Adresse postale',
        'pair:depictedBy': 'Image',
        'cdlt:proposedBy': 'Référents',
        'pair:e-mail': 'Adresse e-mail',
        'pair:homePage': 'Site web',
        'cdlt:hasServiceType': 'Types de services',
        'cdlt:hasPublicationStatus': 'Statut de publication'
      },
    },
  },
};
