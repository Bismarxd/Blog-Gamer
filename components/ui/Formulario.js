import styled from "@emotion/styled";

export const Formulario = styled.form`
  max-width: 60rem;
  width: 95%;
  margin: 5rem auto 0 auto;

  fieldset {
    margin: 2rem 0;
    border: 1rem solid var(--celeste3);
    font-size: 2rem;
    padding: 2rem;
  }
`;

export const Campo = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;

  label {
    flex: 0 0 150px;
    font-size: 1.8rem;
  }

  input, textarea {
    flex: 1;
    padding: 1rem;
  }
  textarea{
    height: 40rem;
  }
`


export const InputSubmit = styled.input`
  background-color: var(--lila);
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  color: #fff;
  font-size: 1.8rem;
  text-transform: uppercase;
  font-font-family: "Kanit", sans-serif;
  font-weight: 800;

  &:hover {
    cursor: pointer;
    background-color: #8939f5;
  }
`;

export const Error = styled.div`
  background-color: red;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin: 2rem 0;
`;

export const H1 = styled.div`
  text-align: center;
  margin-top: 4rem;
`;