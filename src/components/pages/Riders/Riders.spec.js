import React from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import Riders from './Riders';
import i18n from '../../__mocks__/i18n';

describe('Riders', () => {
  it('renders a title correctly', () => {
    const { getByTestId } = render(
      <I18nextProvider i18n={i18n}>
        <Riders />
      </I18nextProvider>,
    );

    expect(getByTestId('app-title').textContent).toBe('app.title');
  });
});
