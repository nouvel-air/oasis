import PersonCreate from './PersonCreate';
import PersonEdit from './PersonEdit';
import PersonList from './PersonList';
import PersonIcon from '@mui/icons-material/Person';

export default {
  config: {
    list: PersonList,
    create: PersonCreate,
    edit: PersonEdit,
    icon: PersonIcon,
    options: {
      label: 'Individus'
    },
    recordRepresentation: 'pair:label'
  },
  dataModel: {
    types: ['pair:Person', 'foaf:Person'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Individu |||| Individus',
      fields: {
        'pair:firstName': 'Prénom',
        'pair:lastName': 'Nom de famille',
        'pair:e-mail': 'Adresse mail',
        'pair:hasType': "Type d'utilisateur",
        'pair:affiliatedBy': 'Organisation',
        'pair:partOf': 'Collège',
        'pair:hasStatus': 'Statut'
      }
    }
  }
};
