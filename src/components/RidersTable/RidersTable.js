import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import s from './RidersTable.scss';
import { Page, Card, Box, Table, Highlighter, TableActionCell, TableToolbar,
  Search, Dropdown, Checkbox, Breadcrumbs, PopoverMenu, Button,
  PopoverMenuItem, Container, Row, Tabs, Col } from 'wix-style-react';
import { Star, Download, Print, Duplicate } from 'wix-style-react/new-icons';

class RidersTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: allData,
      collectionId: 0,
      filterId: 0,
      searchTerm: '',
      inStock: false,
    };
  }

  render() {
    const tableData = this.getFilteredData();
    return (
      <Table
        withWrapper
        dataHook="riders-table"
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
        title: 'ID',
        render: row => row.ID,
        width: '20%',
        minWidth: '100px',
      },
      {
        title: 'Parent Name',
        render: row => row.parentName,
        width: '20%',
        minWidth: '100px',
      },
      {
        title: 'Parent Phone',
        render: row => row.parentPhone,
        width: '20%',
        minWidth: '100px',
      },
      {
        title: 'Parent Email',
        render: row => row.parentEmail,
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

  renderMainToolbar() {
    const collectionOptions = [
      { id: 0, value: 'All' },
      { id: 1, value: 'Towels' },
      { id: 2, value: 'Slippers' },
    ];

    const filterOptions = [
      { id: 0, value: 'All' },
      { id: 1, value: 'Red' },
      { id: 2, value: 'Cyan' },
    ];

    return (
      <Card>
        <TableToolbar>
          <TableToolbar.ItemGroup position="start">
            <TableToolbar.Item>
              <TableToolbar.Label>
                Product
                <span style={{ width: '150px' }}>
                  <Dropdown
                    options={collectionOptions}
                    selectedId={this.state.collectionId}
                    onSelect={selectedOption => {
                      this.setState({ collectionId: selectedOption.id });
                    }}
                    roundInput
                  />
                </span>
              </TableToolbar.Label>
            </TableToolbar.Item>
            <TableToolbar.Item>
              <TableToolbar.Label>
                Color
                <span style={{ width: '86px' }}>
                  <Dropdown
                    options={filterOptions}
                    selectedId={this.state.filterId}
                    onSelect={selectedOption =>
                      this.setState({ filterId: selectedOption.id })
                    }
                    roundInput
                  />
                </span>
              </TableToolbar.Label>
            </TableToolbar.Item>
            <TableToolbar.Item>
              <Checkbox
                checked={this.state.inStock}
                onChange={e => this.setState({ inStock: e.target.checked })}
              >
                In Stock only
              </Checkbox>
            </TableToolbar.Item>
          </TableToolbar.ItemGroup>
          <TableToolbar.ItemGroup position="end">
            <TableToolbar.Item>{this.renderSearch(false)}</TableToolbar.Item>
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

const createDataSet = () => [
  {
    id: 1,
    name: 'Benjamin Netanyahu',
    ID: '204787923',
    parentName: 'Yoni',
    parentPhone: '0547806318',
    parentEmail: 'yoni@gmail.com',
  },
  {
    id: 2,
    name: 'Benny Gantz',
    ID: '319835517',
    parentName: 'Emanuel',
    parentPhone: '0543989254',
    parentEmail: 'emanuel@gmail.com',
  },
  {
    id: 3,
    name: 'Josh Elgrably',
    ID: '315483923',
    parentName: 'Claudia',
    parentPhone: '0548332918',
    parentEmail: 'claudia@gmail.com',
  },
  {
    id: 4,
    name: 'Omer Perez',
    ID: '318819201',
    parentName: 'Lotem',
    parentPhone: '0523637687',
    parentEmail: 'locoloco@gmail.com',
  },
  {
    id: 5,
    name: 'Idan Koper',
    ID: '382724423',
    parentName: 'Daniel',
    parentPhone: '0544718732',
    parentEmail: 'daniel@gmail.com',
  },
  {
    id: 6,
    name: 'Liron Lillian',
    ID: '317628911',
    parentName: 'Roy',
    parentPhone: '0541112827',
    parentEmail: 'roy@gmail.com',
  },
  {
    id: 7,
    name: 'Shay Lasri',
    ID: '311888822',
    parentName: 'Eli',
    parentPhone: '0527362722',
    parentEmail: 'eli@gmail.com',
  },
];

const allData = createDataSet();

export default translate()(RidersTable);
