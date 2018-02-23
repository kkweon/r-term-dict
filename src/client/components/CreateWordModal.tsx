import * as React from "react";
import styled from "react-emotion";
import {
  reduxForm,
  InjectedFormProps,
  Field,
  WrappedFieldProps,
} from "redux-form";
import { connect } from "react-redux";
import { createWord } from "../actions";

const Modal = styled("div")`
  position: fixed;
  top: 0;
  left: 50%;
  height: 100%;
  width: 90%;
  background-color: #ddd;
  transform: translateX(-50%);
`;

interface IFormProps {
  en: string;
  ko: string;
}

interface IOwnProps {
  onClick: () => void;
}

interface IDispatchProps {
  createWord: (word: IWord) => void;
}

type Props = InjectedFormProps<IFormProps, IOwnProps> &
  IOwnProps &
  IDispatchProps;

const validate = (values: IFormProps) => {
  const errors: IFormProps = { en: "", ko: "" };

  if (!values.en) {
    errors.en = "필수 입력입니다.";
  }
  if (!values.ko) {
    errors.ko = "필수 입력입니다.";
  }
  return errors;
};

interface IFieldProps extends WrappedFieldProps {
  label: string;
  type: string;
  ref?: (elem: any) => void;
  autoFocus?: boolean;
}

const renderField = ({
  input,
  label,
  type,
  autoFocus,
  meta: { touched, error, warning },
}: IFieldProps) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} autoFocus={autoFocus} />
      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span className="text-danger">{warning}</span>))}
    </div>
  </div>
);

class CreateWordModal extends React.Component<Props> {
  handleSubmit(form: IFormProps) {
    this.props.createWord(form);
    this.props.onClick();
  }

  render() {
    return (
      <Modal>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
          <fieldset>
            <Field
              label="영어"
              name="en"
              type="text"
              component={renderField}
              autoFocus={true}
            />
          </fieldset>

          <fieldset>
            <Field label="한글" name="ko" type="text" component={renderField} />
          </fieldset>

          <button type="submit">Create</button>
          <button type="button" onClick={this.props.onClick}>
            Cancel
          </button>
        </form>
      </Modal>
    );
  }
}

const ModalForm = connect<{}, IDispatchProps>(null, { createWord })(
  CreateWordModal,
);

export default reduxForm<IFormProps, IOwnProps>({
  form: "create-word",
  validate,
})(ModalForm);
