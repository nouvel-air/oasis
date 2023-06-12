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
      label: 'Personnes',
      parent: 'Actor'
    }
  },
  dataModel: {
    types: ['pair:Person'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Utilisateur |||| Utilisateurs',
      fields: {
        'pair:firstName': 'Prénom',
        'pair:lastName': 'Nom de famille',
        'pair:e-mail': 'Adresse mail',
        'pair:hasType': "Type d'utilisateur"
      }
    }
  }
};
