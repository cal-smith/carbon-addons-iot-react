import { CARD_DIMENSIONS, CARD_SIZES } from '../../../constants/LayoutConstants';

import { getCardSizeText, handleSubmit, hideCardPropertiesForEditor } from './CardEditForm';

const mockSetError = jest.fn();
const mockOnChange = jest.fn();
const mockSetShowEditor = jest.fn();
const mockOnValidateCardJson = jest.fn().mockImplementation(() => []);
afterEach(() => {
  jest.clearAllMocks();
});
describe('CardEditForm', () => {
  describe('getCardSizeText', () => {
    const i18n = {
      cardSize_SMALL: 'Small',
      cardSize_SMALLWIDE: 'Small wide',
      cardSize_MEDIUM: 'Medium',
      cardSize_MEDIUMTHIN: 'Medium thin',
      cardSize_MEDIUMWIDE: 'Medium wide',
      cardSize_LARGE: 'Large',
      cardSize_LARGETHIN: 'Large thin',
      cardSize_LARGEWIDE: 'Large wide',
    };
    it('should return correct size and dimensions', () => {
      expect(getCardSizeText(CARD_SIZES.SMALL, i18n)).toEqual(
        `${i18n.cardSize_SMALL} (${CARD_DIMENSIONS.SMALL.lg.w}x${CARD_DIMENSIONS.SMALL.lg.h})`
      );
      expect(getCardSizeText(CARD_SIZES.SMALLWIDE, i18n)).toEqual(
        `${i18n.cardSize_SMALLWIDE} (${CARD_DIMENSIONS.SMALLWIDE.lg.w}x${CARD_DIMENSIONS.SMALLWIDE.lg.h})`
      );
      expect(getCardSizeText(CARD_SIZES.MEDIUM, i18n)).toEqual(
        `${i18n.cardSize_MEDIUM} (${CARD_DIMENSIONS.MEDIUM.lg.w}x${CARD_DIMENSIONS.MEDIUM.lg.h})`
      );
      expect(getCardSizeText(CARD_SIZES.MEDIUMTHIN, i18n)).toEqual(
        `${i18n.cardSize_MEDIUMTHIN} (${CARD_DIMENSIONS.MEDIUMTHIN.lg.w}x${CARD_DIMENSIONS.MEDIUMTHIN.lg.h})`
      );
      expect(getCardSizeText(CARD_SIZES.MEDIUMWIDE, i18n)).toEqual(
        `${i18n.cardSize_MEDIUMWIDE} (${CARD_DIMENSIONS.MEDIUMWIDE.lg.w}x${CARD_DIMENSIONS.MEDIUMWIDE.lg.h})`
      );
      expect(getCardSizeText(CARD_SIZES.LARGE, i18n)).toEqual(
        `${i18n.cardSize_LARGE} (${CARD_DIMENSIONS.LARGE.lg.w}x${CARD_DIMENSIONS.LARGE.lg.h})`
      );
      expect(getCardSizeText(CARD_SIZES.LARGETHIN, i18n)).toEqual(
        `${i18n.cardSize_LARGETHIN} (${CARD_DIMENSIONS.LARGETHIN.lg.w}x${CARD_DIMENSIONS.LARGETHIN.lg.h})`
      );
      expect(getCardSizeText(CARD_SIZES.LARGEWIDE, i18n)).toEqual(
        `${i18n.cardSize_LARGEWIDE} (${CARD_DIMENSIONS.LARGEWIDE.lg.w}x${CARD_DIMENSIONS.LARGEWIDE.lg.h})`
      );
    });
  });

  // would like to do react-testing-library tests with this, but we're unable to render the actual editor,
  // meaning we can't fire user events on the form
  describe('handleSubmit', () => {
    it('should throw error if JSON is empty', () => {
      handleSubmit(
        '',
        '',
        '',
        mockSetError,
        mockOnValidateCardJson,
        mockOnChange,
        mockSetShowEditor
      );
      expect(mockSetError).toBeCalledWith('Unexpected end of JSON input');
    });
    it('should call onChange and setShowEditor if JSON is valid', () => {
      handleSubmit(
        '{}',
        '',
        '',
        mockSetError,
        mockOnValidateCardJson,
        mockOnChange,
        mockSetShowEditor
      );
      expect(mockOnChange).toBeCalled();
      expect(mockSetShowEditor).toBeCalledWith(false);
    });
    it('should throw error if JSON is not valid', () => {
      handleSubmit(
        '1234',
        '',
        '',
        mockSetError,
        mockOnValidateCardJson,
        mockOnChange,
        mockSetShowEditor
      );
      expect(mockSetError).toBeCalledWith('1234 is not valid JSON');
    });
  });
  describe('hideCardPropertiesForEditor', () => {
    it('should hide properties in the attributes section of a card', () => {
      const sanitizedCard = hideCardPropertiesForEditor({
        content: {
          attributes: [
            {
              aggregationMethods: [],
              aggregationMethod: '',
              grain: '',
              uuid: '',
              dataSourceId: 'torque',
              label: 'Torque',
            },
          ],
        },
      });
      expect(sanitizedCard).toEqual({
        content: {
          attributes: [
            {
              dataSourceId: 'torque',
              label: 'Torque',
            },
          ],
        },
      });
    });
    it('should hide properties in the series section of a card', () => {
      const sanitizedCard = hideCardPropertiesForEditor({
        content: {
          series: [
            {
              aggregationMethods: [],
              aggregationMethod: '',
              grain: '',
              uuid: '',
              dataSourceId: 'torque',
              label: 'Torque',
            },
          ],
        },
      });
      expect(sanitizedCard).toEqual({
        content: {
          series: [
            {
              dataSourceId: 'torque',
              label: 'Torque',
            },
          ],
        },
      });
    });
  });
});
