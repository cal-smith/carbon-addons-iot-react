import React from 'react';
import PropTypes from 'prop-types';

import { SimpleList } from '../../../index';
import { settings } from '../../../constants/Settings';
import { DASHBOARD_EDITOR_CARD_TYPES } from '../../../constants/LayoutConstants';
import {
  LineGraphIcon,
  SimpleBarGraphIcon,
  BarGroupedGraphIcon,
  BarStackGraphIcon,
  ValueKpiIcon,
  ImageIcon,
  DataTableIcon,
  AlertTableIcon,
  ListIcon,
  CustomCardIcon,
} from '../../../icons/components';

const { iotPrefix } = settings;

const propTypes = {
  supportedCardTypes: PropTypes.arrayOf(PropTypes.string),
  onAddCard: PropTypes.func.isRequired,
  icons: PropTypes.objectOf(PropTypes.node),
  i18n: PropTypes.shape({
    galleryHeader: PropTypes.string,
    searchPlaceHolderText: PropTypes.string,
    TIMESERIES: PropTypes.string,
    SIMPLE_BAR: PropTypes.string,
    GROUPED_BAR: PropTypes.string,
    STACKED_BAR: PropTypes.string,
    VALUE: PropTypes.string,
    IMAGE: PropTypes.string,
    TABLE: PropTypes.string,
    ALERT: PropTypes.string,
    LIST: PropTypes.string,
    CUSTOM: PropTypes.string,
  }),
};

const defaultProps = {
  supportedCardTypes: Object.keys(DASHBOARD_EDITOR_CARD_TYPES),
  i18n: {
    galleryHeader: 'Gallery',
    searchPlaceHolderText: 'Enter a search',
    TIMESERIES: 'Time series line',
    SIMPLE_BAR: 'Simple bar',
    GROUPED_BAR: 'Grouped bar',
    STACKED_BAR: 'Stacked bar',
    VALUE: 'Value / KPI',
    IMAGE: 'Image',
    TABLE: 'Data table',
    ALERT: 'Alert table',
    LIST: 'List',
    CUSTOM: 'Custom',
    // additional card type names can be provided using the convention of `TYPE` in supportedCardTypes
  },
  icons: {
    TIMESERIES: <LineGraphIcon />,
    SIMPLE_BAR: <SimpleBarGraphIcon />,
    GROUPED_BAR: <BarGroupedGraphIcon />,
    STACKED_BAR: <BarStackGraphIcon />,
    VALUE: <ValueKpiIcon />,
    IMAGE: <ImageIcon />,
    TABLE: <DataTableIcon />,
    ALERT: <AlertTableIcon />,
    LIST: <ListIcon />,
    CUSTOM: <CustomCardIcon />,
  },
};

const CardGalleryList = ({ supportedCardTypes, onAddCard, icons, i18n }) => {
  const mergedI18n = { ...defaultProps.i18n, ...i18n };
  const mergedIcons = { ...defaultProps.icons, ...icons };

  return (
    <SimpleList
      title=""
      isFullHeight
      hasSearch
      hasPagination={false}
      items={supportedCardTypes.map((cardType) => ({
        id: cardType,
        content: {
          value: mergedI18n[cardType] || cardType,
          icon: (
            <div className={`${iotPrefix}--card-gallery-list__icon`}>{mergedIcons[cardType]}</div>
          ),
        },
        isSelectable: true,
      }))}
      onSelect={(cardType) => {
        onAddCard(cardType);
      }}
      i18n={{
        searchPlaceHolderText: mergedI18n.searchPlaceHolderText,
      }}
    />
  );
};

CardGalleryList.defaultProps = defaultProps;
CardGalleryList.propTypes = propTypes;

export default CardGalleryList;
