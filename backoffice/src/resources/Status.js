import VisibilityIcon from '@mui/icons-material/Visibility';

export default {
  config: {
    icon: VisibilityIcon,
    options: {
      label: 'Statuts'
    }
  },
  dataModel: {
    types: ['cdlt:PublicationStatus', 'pair:ActorStatus'],
    list: {
      servers: ['@default']
    }
  }
};
