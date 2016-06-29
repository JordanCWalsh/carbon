import React from 'react';
import Icon from './../icon';
import classNames from 'classnames';
import TooltipDecorator from './../../utils/decorators/tooltip-decorator';
/**
 * A Help widget.
 *
 * == How to use a Help in a component:
 *
 * In your file
 *
 *   import Help from 'carbon/lib/components/help';
 *
 * To render a help component:
 *
 *   <Help>{ this.props.helpMessage }</Help>
 *
 *  You can also pass additional props of tooltipPosition and tooltipAlign.
 *
 * @class Help
 * @constructor
 * @decorators {TooltipDecorator}
 */
const Help = TooltipDecorator(class Help extends React.Component{

  static propTypes = {
    /**
     * Message to display in tooltip
     *
     * @property children
     * @type {String}
     */
    children: React.PropTypes.string.isRequired,

    /**
     * Position of tooltip relative to target
     *
     * @property tooltipPosition
     * @type {String} Options: { top, bottom, right, left }
     * @default top
     */
    tooltipPosition: React.PropTypes.string,

    /**
     * Aligment of pointer
     *
     * @property tooltipAlign
     * @type {String} Options: { top, bottom, right, left, center }
     * @default center
     */
    tooltipAlign: React.PropTypes.string,

    /**
     * A path for the anchor
     *
     * @property href
     * @type {String}
     */
    href: React.PropTypes.string
  };

  static defaultProps = {
    tooltipPosition: 'top',
    tooltipAlign: 'center'
  }
  /**
   * Return component classes
   *
   * @method mainClasses
   * @return {String} classes
   */
  get mainClasses() {
    return classNames(
      'ui-help',
      {'ui-help__href': this.props.href },
      this.props.className
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <a className={ this.mainClasses } href={ this.props.href }>
        <Icon
          type='info'
          tooltipMessage={ this.props.children }
          tooltipPosition={ this.props.tooltipPosition }
          tooltipAlign={ this.props.tooltipAlign }
        />
      </a>
    );
  }
});

export default Help;