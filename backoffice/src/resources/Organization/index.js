import OrganizationCreate from './OrganizationCreate';
import OrganizationEdit from './OrganizationEdit';
import OrganizationList from './OrganizationList';
import GroupIcon from '@mui/icons-material/Group';

export default {
  config: {
    list: OrganizationList,
    create: OrganizationCreate,
    edit: OrganizationEdit,
    icon: GroupIcon,
    options: {
      label: 'Organisations'
    },
    recordRepresentation: 'pair:label'
  },
  dataModel: {
    types: ['pair:Organization'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Organisation |||| Organisations',
      fields: {
        'pair:label': 'Nom',
        'pair:e-mail': 'Adresse mail',
        'pair:partOf': 'Collège',
        'pair:affiliates': 'Référents'
      }
    }
  }
};
