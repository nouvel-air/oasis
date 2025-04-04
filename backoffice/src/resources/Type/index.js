import TypeCreate from './TypeCreate';
import TypeEdit from './TypeEdit';
import TypeList from './TypeList';
import StyleIcon from '@mui/icons-material/Style';

export default {
  config: {
    list: TypeList,
    create: TypeCreate,
    edit: TypeEdit,
    icon: StyleIcon,
    options: {
      label: 'Types'
    }
  },
  dataModel: {
    types: ['cdlt:ServiceType', 'cdlt:OfferAndNeedType', 'pair:PersonType'],
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Type |||| Types',
      fields: {
        '@type': 'Classe',
        'pair:label': 'Nom'
      }
    }
  }
};
