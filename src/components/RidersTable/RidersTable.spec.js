import React from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import RidersTable from './RidersTable';
import i18n from '../__mocks__/i18n';

describe('RidersTable', () => {
  it('renders a title correctly', () => {
    const { getByTestId } = render(
      <I18nextProvider i18n={i18n}>
        <RidersTable />
      </I18nextProvider>,
    );

    expect(getByTestId('app-title').textContent).toBe('app.title');
  });
});
