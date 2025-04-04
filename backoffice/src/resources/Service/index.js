import ServiceCreate from './ServiceCreate';
import ServiceEdit from './ServiceEdit';
import ServiceList from './ServiceList';
import HotelIcon from '@mui/icons-material/Hotel';

export default {
  config: {
    list: ServiceList,
    create: ServiceCreate,
    edit: ServiceEdit,
    icon: HotelIcon,
    options: {
      label: 'Service'
    },
    recordRepresentation: 'pair:label'
  },
  dataModel: {
    types: ['cdlt:HostingService']
  },
  translations: {
    fr: {
      name: 'Service |||| Services',
      fields: {
        'pair:offeredBy': 'Oasis',
        'cdlt:hasServiceType': 'Catégorie',
        'pair:label': 'Nom',
        'cdlt:price': 'Prix',
        'cdlt:capacity': 'Capacité',
        'pair:description': 'Description',
        'pair:depictedBy': 'Image',
        'cdlt:registrationLink': "Lien d'inscription"
      }
    }
  }
};
