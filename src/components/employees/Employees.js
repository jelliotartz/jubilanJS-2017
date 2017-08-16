import React, { Component } from 'react';
import EmployeeTable from './EmployeeTable';
import {PageHeader, Grid, Row, Button} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import {LinkContainer} from 'react-router-bootstrap';
import { connect } from 'react-redux';
import * as EmployeeActions from '../../actions/EmployeeActionCreator';

class Employees extends Component {

  constructor(props) {
    super(props);
    props.actions.listEmployees();
  }

  render() {
    return (
      <Grid>
        <Row>
          <PageHeader>Employees</PageHeader>
        </Row>
        <Row>
          <div className="pull-right">
            <LinkContainer to="/employees/create">
              <Button bsStyle="primary">Create Employee</Button>
            </LinkContainer>
          </div>
        </Row>
        <Row>
          <EmployeeTable employees={this.props.employees} actions={this.props.actions}/>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    employees: state.employees.employees
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(EmployeeActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Employees);
