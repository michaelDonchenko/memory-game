import styled from "@emotion/styled";

interface ButtonProps {
  variant: "primary" | "secondary";
  children: string;
}

const Button: React.FC<ButtonProps> = ({variant, children}) => {
  return (
    <StyledButton type="button" variant={variant}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<Pick<ButtonProps, "variant">>`
  color: ${(props) => (props.variant === "primary" ? "white" : "black")};
  background-color: ${(props) => (props.variant === "primary" ? "orange" : "#dfe6ec")};
  border: none;
  border-radius: 24px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
`;
