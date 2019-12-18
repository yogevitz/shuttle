import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import s from './ShuttlesTable.scss';
import {
  Page,
  Card,
  Box,
  Table,
  Highlighter,
  TableActionCell,
  TableToolbar,
  Search,
  Dropdown,
  Checkbox,
  Breadcrumbs,
  PopoverMenu,
  PopoverMenuItem,
  Container,
  Row,
  Tabs,
  Col,
} from 'wix-style-react';
import {
  Star,
  Download,
  Print,
  Duplicate,
  Add,
} from 'wix-style-react/new-icons';
import Button from 'wix-style-react/Button';
import FormField from 'wix-style-react/FormField';
import Input from 'wix-style-react/Input';
import Modal from 'wix-style-react/Modal';
import { Layout, Cell } from 'wix-style-react/Layout';
import InputArea from 'wix-style-react/InputArea';
import Text from 'wix-style-react/Text';
import CreateShuttleModal from './CreateShuttleModal';

class ShuttlesTable extends React.Component {
  constructor(props) {
    super(props);
    this.onCreateShuttle = this.onCreateShuttle.bind(this);

    this.state = {
      data: shuttles,
      collectionId: 0,
      filterId: 0,
      searchTerm: '',
      inStock: false,
      addShuttle: false,
    };
  }

  render() {
    const tableData = this.getFilteredData();
    return (
      <Table
        withWrapper
        dataHook="supervisors-table"
        data={tableData}
        itemsPerPage={20}
        columns={this.getColumns()}
        onSelectionChange={selectedIds =>
          console.log('Table.onSelectionChange(): selectedIds=', selectedIds)
        }
        showSelection
        showLastRowDivider
      >
        <Page.Sticky>
          <Card>
            <Table.ToolbarContainer>
              {() => this.renderMainToolbar()}
            </Table.ToolbarContainer>
            <Table.Titlebar />
          </Card>
        </Page.Sticky>
        <Card>
          <Table.Content titleBarVisible={false} />
        </Card>
      </Table>
    );
  }

  getColumns() {
    return [
      {
        title: 'Name',
        render: row => (
          <Highlighter match={this.state.searchTerm}>{row.name}</Highlighter>
        ),
        width: '30%',
        minWidth: '150px',
      },
      {
        title: 'Contact Name',
        render: row => row.contactName,
        width: '20%',
        minWidth: '100px',
      },
      {
        title: 'Contact Phone',
        render: row => row.contactPhone,
        width: '20%',
        minWidth: '100px',
      },
      {
        title: 'Destination',
        render: row => row.destination,
        width: '20%',
        minWidth: '100px',
      },
      {
        title: '',
        width: '40%',
        render: rowData => (
          <TableActionCell
            dataHook="action-cell-component-secondary"
            primaryAction={{
              text: 'Edit',
              theme: 'fullblue',
              onClick: () => {},
              // onActionTrigger: () => primaryAction(rowData),
            }}
            secondaryActions={[
              {
                text: 'Star',
                icon: <Star />,
                onClick: () => window.alert(`Starring ${rowData.name}`),
              },
              {
                text: 'Download',
                icon: <Download />,
                onClick: () => window.alert(`Downloading ${rowData.name}`),
              },
              {
                text: 'Duplicate',
                icon: <Duplicate />,
                onClick: () => window.alert(`Duplicating ${rowData.name}`),
              },
              {
                text: 'Print',
                icon: <Print />,
                onClick: () => window.alert(`Printing ${rowData.name}`),
              },
            ]}
            numOfVisibleSecondaryActions={2}
            alwaysShowSecondaryActions={false}
          />
        ),
      },
    ];
  }

  clearSearch() {
    this.setState({
      collectionId: 0,
      filterId: 0,
      searchTerm: '',
      inStock: false,
    });
  }

  onCreateShuttle = shuttle => {
    const tmpData = this.state.data;
    tmpData.push(shuttle);
    this.setState({
      data: tmpData,
    });
  };

  renderMainToolbar() {
    return (
      <Card>
        <TableToolbar>
          <TableToolbar.ItemGroup position="start">
            <TableToolbar.Item>{this.renderSearch(false)}</TableToolbar.Item>
            <TableToolbar.Item layout="button">
              <CreateShuttleModal onCreateShuttle={this.onCreateShuttle} />
            </TableToolbar.Item>
          </TableToolbar.ItemGroup>
        </TableToolbar>
      </Card>
    );
  }

  renderSearch(expandable) {
    return (
      <Search
        expandable={expandable}
        onChange={e => {
          this.setState({ searchTerm: e.target.value });
        }}
        value={this.state.searchTerm}
      />
    );
  }

  getFilteredData() {
    let data = this.state.data;
    if (this.state.collectionId > 0) {
      data = data.filter(row => row.collectionId === this.state.collectionId);
    }
    if (this.state.filterId > 0) {
      data = data.filter(row => row.filterId === this.state.filterId);
    }
    if (this.state.inStock) {
      data = data.filter(row => row.inventory === 'In stock');
    }
    if (this.state.searchTerm !== '') {
      data = data.filter(row =>
        row.name.toUpperCase().includes(this.state.searchTerm.toUpperCase()),
      );
    }
    return data;
  }
}

export const DESTINATIONS = {
  BEER_SHEVA: 'Beer Sheva',
  RAHAT: 'Rahat',
  BEIT_KAMA: 'Beit Kama',
  LEHAVIM: 'Lehavim',
  MISHMAR_HANEGEV: 'Mishmar Hanegev',
};

export const shuttles = [
  {
    id: 1,
    name: 'Beer Sheva Yellow Bus',
    contactName: 'Yosi Cohen',
    contactPhone: '0528108333',
    destination: DESTINATIONS.BEER_SHEVA,
  },
  {
    id: 2,
    name: 'Beit Kama Mini Bus',
    contactName: 'Ben Levi',
    contactPhone: '0523712321',
    destination: DESTINATIONS.BEIT_KAMA,
  },
  {
    id: 3,
    name: 'BK Large Bus',
    contactName: 'Goni Levin Haimi',
    contactPhone: '0548332918',
    destination: DESTINATIONS.BEIT_KAMA,
  },
  {
    id: 4,
    name: 'Rahat 10',
    contactName: 'Hassan Abudugush',
    contactPhone: '0546478899',
    destination: DESTINATIONS.RAHAT,
  },
  {
    id: 5,
    name: 'Lehavim School Bus',
    contactName: 'Yaniv Gabot',
    contactPhone: '0544718732',
    destination: DESTINATIONS.LEHAVIM,
  },
  {
    id: 6,
    name: 'Mishmar 2',
    contactName: 'Dani Duenias',
    contactPhone: '0541112827',
    destination: DESTINATIONS.MISHMAR_HANEGEV,
  },
];

export default translate()(ShuttlesTable);
