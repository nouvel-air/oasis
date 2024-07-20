import OfferAndNeedCreate from './OfferAndNeedCreate';
import OfferAndNeedEdit from './OfferAndNeedEdit';
import OfferAndNeedList from './OfferAndNeedList';
import BurstModeIcon from '@mui/icons-material/BurstMode';

export default {
  config: {
    list: OfferAndNeedList,
    create: OfferAndNeedCreate,
    edit: OfferAndNeedEdit,
    icon: BurstModeIcon,
    options: {
      label: 'Annonces'
    },
    recordRepresentation: 'pair:label'
  },
  dataModel: {
    types: ['cdlt:OfferAndNeed', 'pair:Event'],
    list: {
      servers: '@default'
    }
  },
  translations: {
    fr: {
      name: 'Annonce |||| Annonces',
      fields: {
        'pair:hasType': 'Catégorie',
        'cdlt:hasSubType': 'Sous-Catégorie',
        'pair:hasPostalAddress': 'Adresse postale',
        'pair:hasPostalAddress.pair:label': 'Adresse postale',
        'pair:label': 'Titre',
        'pair:description': 'Contenu',
        'pair:depictedBy': 'Images',
        'pair:offeredBy': 'Proposée par',
        'pair:startDate': 'Date de début',
        'pair:endDate': 'Date de fin',
        'pair:homePage': 'Lien',
        'pair:e-mail': 'Adresse mail',
        'pair:phone': 'Téléphone'
      }
    }
  }
};
