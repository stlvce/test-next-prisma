import { default as UIAlert, AlertProps } from "react-bootstrap/Alert";

type Props = AlertProps & {
  message: string;
};

const Alert = ({ message, ...props }: Props) => {
  return (
    <UIAlert {...props}>
      <UIAlert.Heading>{message}</UIAlert.Heading>
    </UIAlert>
  );
};

export default Alert;
