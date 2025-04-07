import PageCreate from './PageCreate';
import PageEdit from './PageEdit';
import PageList from './PageList';
import DescriptionIcon from '@mui/icons-material/Description';

export default {
  config: {
    list: PageList,
    create: PageCreate,
    edit: PageEdit,
    icon: DescriptionIcon,
    options: {
      label: 'Pages'
    },
    recordRepresentation: 'semapps:title'
  },
  dataModel: {
    types: ['semapps:Page'],
    fieldsMapping: {
      title: 'semapps:title'
    }
  },
  translations: {
    fr: {
      name: 'Page |||| Pages',
      fields: {
        'semapps:title': 'Titre',
        'semapps:content': 'Contenu'
      }
    }
  }
};
