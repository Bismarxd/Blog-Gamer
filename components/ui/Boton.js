import styled from "@emotion/styled";

const Boton = styled.a`
  display: block;
  background-color: ${props => props.bgColor ? '#007bff' : '#ffffff'};
  color: ${props => props.bgColor ? '#ffffff' : '#000000'};
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem 2.5rem;
  margin-right: 1.5rem;
  margin-left: 1.5rem;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${props => props.bgColor ? '#0069d9' : '#f2f2f2'};
    color: ${props => props.bgColor ? '#ffffff' : '#000000'};
  }

  &:focus {
    outline: none;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

export default Boton;