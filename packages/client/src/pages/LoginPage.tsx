import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useLogin from '~/hooks/queries/auth/useLogin';
import { Button, ErrorMessage, TextInput } from '~/components/common';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import useGetMe from '~/hooks/queries/user/useGetMe';

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required('필수항목입니다'),
  password: yup.string().required('필수항목입니다'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const next = params.get('next') || '/';

  const queryClient = useQueryClient();

  const { mutate } = useLogin({
    onSuccess: async () => {
      await queryClient.refetchQueries(useGetMe.getKey());
      navigate(next);
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
        <Title>LOGIN</Title>
        <TextInput {...register('email')} type="text" placeholder="email" variant="underlined" />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <TextInput
          {...register('password')}
          type="password"
          placeholder="password"
          variant="underlined"
        />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        <Button shadow size="auto" type="submit">
          LOGIN
        </Button>
        <Button
          shadow
          size="auto"
          type="button"
          color="success"
          onClick={() => navigate('/register')}
        >
          Aren&apos;t you a member yet?
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

const Title = styled.span`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

export default LoginPage;
