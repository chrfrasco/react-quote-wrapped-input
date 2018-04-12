import React from "react";
import { wrapInQuotemarks, stripQuotationMarks, noop } from "./utils";

let previousQuote = null;
export default class QuotationWrappedInput extends React.Component {
  static defaultProps = {
    InputComponent: ({ handleRef, ...props }) => (
      <textarea ref={handleRef} {...props} />
    ),
    handleRef: noop,
    maxLength: 320,
    placeholder: "Type here",
    style: {},
    open: "‘", // &lsquo;
    close: "’" // &rsquo;
  };

  constructor(props) {
    super(props);
    this.textArea = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.textArea.current.focus();

    if (this.props.inputValue.length > 0) {
      // The quote marks add +2 to the length, so +1 is -1 from the end of the input
      const oneFromTheEnd = this.props.inputValue.length + 1;
      this.textArea.current.selectionStart = this.textArea.current.selectionEnd = oneFromTheEnd;
    }
  }

  render() {
    const {
      InputComponent,
      placeholder,
      handleInputChange,
      handleRef,
      style,
      maxLength,
      inputValue,
      open,
      close
    } = this.props;

    const quotedValue = wrapInQuotemarks(inputValue, open, close);

    return (
      <InputComponent
        handleRef={this.textArea}
        placeholder={placeholder}
        value={quotedValue}
        onChange={this.handleInputChange}
        style={style}
        maxLength={maxLength}
      />
    );
  }

  /**
   * Modify the value of the event target, then pass it
   * up to the parent. This preserves encapsulation as the
   * parent should have no knowledge of the quote marks.
   *
   * @param {React.KeyboardEvent} ev
   * @returns {React.KeyboardEvent}
   */
  handleInputChange(ev) {
    let s = stripQuotationMarks(
      ev.target.value,
      this.props.open,
      this.props.close
    );

    /* 
     * If the previous input is the same as the current input
     * after stripping quotation marks, then the user must have
     * hit the backspace key & removed the trailing quotation
     * mark
     */
    if (previousQuote != null && previousQuote === s) {
      s = s.slice(0, -1);
    }

    previousQuote = s;
    ev.target.value = s;

    this.props.handleInputChange(ev);
  }
}
