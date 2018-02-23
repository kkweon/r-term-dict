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

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 5rem;
  min-height: 100%;
`;

const FieldSet = styled("fieldset")`
  border: 0;
  width: 100%;
`;

const Input = styled("input")`
  width: 100%;
  padding: 0.5rem;
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
  } else if (! /[A-z]+/.test(values.en))  {
    errors.en = "영어가 필요합니다."
  }

  if (!values.ko) {
    errors.ko = "필수 입력입니다.";
  } else if (! /[가-힣]+/.test(values.ko)) {
    errors.ko = "한글이 필요합니다."
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
  autoFocus = false,
  meta: { touched, error, warning },
}: IFieldProps) => (
  <div>
    <label>{label}</label>
    <div>
      <Input {...input} placeholder={label} type={type} autoFocus={autoFocus} />
      {touched &&
        ((error && <p className="text-danger">{error}</p>) ||
          (warning && <p className="text-danger">{warning}</p>))}
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
        <Form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
          <FieldSet>
            <Field
              label="영어"
              name="en"
              type="text"
              component={renderField}
            />
          </FieldSet>

          <FieldSet>
            <Field label="한글" name="ko" type="text" component={renderField} />
          </FieldSet>

          <div>
            <button type="submit" disabled={this.props.pristine || this.props.invalid }>생성</button>
            <button type="button" onClick={this.props.onClick}>
              취소
            </button>
          </div>
        </Form>
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
