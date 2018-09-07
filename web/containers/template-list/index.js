import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import muiThemeable from 'material-ui/styles/muiThemeable';

import TemplateList from '../../components/template-list';
import * as ACTIONS from '../../actions';

const TemplateListContainer = (props) => (
  <TemplateList
    user={props.user}
    templateId={props.templateId}
    changeTemplate={props.changeTemplate}
    muiTheme={props.muiTheme} />
);

const mapStateToProps = (state) => ({
  templateId: state.template.id,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  changeTemplate: (templateid, templatecolor) => dispatch(ACTIONS.changeTemplate(templateid, templatecolor))
});

export default muiThemeable()(connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateListContainer));

TemplateListContainer.propTypes = {
  muiTheme: PropTypes.object,
  user: PropTypes.object.isRequired,
  templateId: PropTypes.number.isRequired,
  changeTemplate: PropTypes.func.isRequired
};

TemplateListContainer.defaultProps = {};
