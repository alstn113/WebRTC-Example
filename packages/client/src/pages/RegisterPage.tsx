import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useRegister from '~/hooks/queries/user/useRegister';
import { Button, ErrorMessage, TextInput } from '~/components/common';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required('필수항목입니다'),
  password: yup.string().required('필수항목입니다'),
});

const RegisterPage = () => {
  const navigate = useNavigate();

  const { mutate } = useRegister({
    onSuccess: async () => {
      navigate('/login');
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const onSubmit = ({ email, password }: IFormInput) => {
    mutate({ email, password });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextInput {...register('email')} type="text" placeholder="email" variant="underlined" />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <TextInput
          {...register('password')}
          type="password"
          placeholder="password"
          variant="underlined"
        />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        <Button shadow size="auto" type="submit" color="success">
          REGISTER
        </Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  width: 250px;
  flex-direction: column;
  button {
    margin-top: 1rem;
  }
`;

export default RegisterPage;
