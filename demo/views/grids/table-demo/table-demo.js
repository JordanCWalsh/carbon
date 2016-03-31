import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import { Table, TableHeader, TableRow, TableCell } from 'components/table';

import Row from 'components/row';
import Checkbox from 'components/checkbox';
import Message from 'components/message';
import Filter from 'components/filter';
import Textbox from 'components/textbox';
import Button from 'components/button';

class TableDemo extends React.Component {
  /**
   * @method componentWillMount
   */
  componentWillMount() {
    AppActions.appTableManuallyUpdated('table', 'data', {
      filter: this.value('filter').toJS()
    });
  }

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['table', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'table');
  }

  /**
   * @method demo
   */
  get demo() {
    let filter, filterHtml;

    if (this.value('enable_filter')) {
      let align = this.value('filter_align_right') ? "right" : "left";
      filter = this.value('filter');
      filterHtml = (
        <Filter align={ align }>
          <Textbox
            value={ filter.get('name') }
            onChange={ this.action.bind(this, ['filter', 'name']) }
            label="Country"
            labelInline={ true }
          />
        </Filter>
      );
    }

    return (
      <div>
        { filterHtml }

        <Table
          filter={ filter }
          currentPage={ this.value('current_page') }
          onChange={ AppActions.appTableManuallyUpdated.bind(this, 'table') }
          pageSize={ this.value('page_size') }
          paginate={ this.value('paginate') }
          showPageSizeSelection={ this.value('show_page_size_selection') }
          totalRecords={ this.value('total_records') }
        >
          { this.tableRows }
        </Table>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let additionalProps = false,
        html = "import { Table, TableHeader, TableRow, TableCell } from 'carbon/lib/components/table';\n\n";

    html += "let tableRows = [],\n";
    html += "    countries = this.state.store.get('countries');\n\n";

    html += "tableRows.push(\n";
    html += "  <TableRow>\n";
    html += "    <TableHeader>Code</TableHeader>\n";
    html += "    <TableHeader>Country</TableHeader>\n";
    html += "  </TableRow>\n";
    html += ");\n\n";

    html += "tableRows = tableRows.concat(countries.map((country) => {\n";
    html += "  <TableRow>\n";
    html += "    <TableCell>{ country.get('code') }</TableCell>\n";
    html += "    <TableCell>{ country.get('name') }</TableCell>\n";
    html += "  </TableRow>\n";
    html += "}));\n\n";

    if (this.value('enable_filter')) {
      html += "<Filter";

      if (this.value('filter_align_right')) {
        html += " align='right'";
      }

      html += ">\n";
      html += "  <Textbox\n";
      html += "    value={this.state.store.getIn(['filter', 'name'])}\n";
      html += "    onChange={Actions.filterUpdated}\n";
      html += "    label='Country'\n";
      html += "    labelInline={true}\n";
      html += "  />\n";
      html += "</Filter>\n\n";
    }

    html += "<Table\n";

    if (this.value('enable_filter')) {
      additionalProps = true;
      html += "  filter={this.state.store.get('filter')}\n";
    }

    if (this.value('paginate')) {
      additionalProps = true;
      html += "  paginate={true}\n";
      html += `  currentPage='${this.value('current_page')}'\n`;
      html += "  onChange={Actions.tableUpdated}\n";
      html += `  pageSize='${this.value('page_size')}'\n`;
      html += `  showPageSizeSelection={${this.value('show_page_size_selection')}}\n`;
      html += `  totalRecords='${this.value('total_records')}'\n`;
    }

    if (!additionalProps) {
      html = html.substring(0, html.length - 1);
    }

    html += ">\n";
    html += "  { tableRows }\n";
    html += "</Table>";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    let warning = null;

    if (this.value('paginate') || this.value('enable_filter')) {
      warning = (
        <Row>
          <Message as="warning">If you want to use data controls, we recommend you use TableAjax instead as it will do a lot of the work for you.</Message>
        </Row>
      );
    }

    return (
      <div>
        <Row>
          <Checkbox
            label="Filter"
            value={ this.value('enable_filter') }
            onChange={ this.action.bind(this, 'enable_filter') }
          />
          <Checkbox
            label="Filter Align Right"
            value={ this.value('filter_align_right') }
            onChange={ this.action.bind(this, 'filter_align_right') }
            disabled={ !this.value('enable_filter') }
          />
        </Row>
        <Row>
          <Checkbox
            label="Paginate"
            value={ this.value('paginate') }
            onChange={ this.action.bind(this, 'paginate') }
          />
          <Checkbox
            label="Show Page Size Selection"
            value={ this.value('show_page_size_selection') }
            onChange={ this.action.bind(this, 'show_page_size_selection') }
            disabled={ !this.value('paginate') }
          />
        </Row>
        { warning }
      </div>
    );
  }

  /**
   * @method tableRows
   */
  get tableRows() {
    let data = this.state.appStore.getIn(['table', 'data']),
        rows = [];

    rows.push(
      <TableRow key="header">
        <TableHeader style={{ width: "75px" }}>
          Code
        </TableHeader>
        <TableHeader>
          Country
        </TableHeader>
      </TableRow>
    );

    return rows.concat(data.map((row, index) => {
      return (
        <TableRow key={ index }>
          <TableCell>{ row.get('value') }</TableCell>
          <TableCell>{ row.get('name') }</TableCell>
        </TableRow>
      );
    }));
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title="Table"
        readme="components/table"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(TableDemo, AppStore);
