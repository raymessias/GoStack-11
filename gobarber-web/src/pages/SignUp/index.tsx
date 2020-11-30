import React, { useCallback, useRef } from 'react'
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web' // Unform previne render desnecessário
import * as Yup from 'yup'

import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'
import { useToast } from '../../hooks/toast'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.svg'
import { Container, Content, AnimationContainer, Background } from './styles'

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  // data: object -> porem gera erro
  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await api.post('/users', data)

        history.push('/')

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no GoBarber!',
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)

          return
        }
        addToast({
          type: 'error',
          title: 'Erro no Cadastro',
          description: 'Ocorreu um erro ao realizar seu cadastro.',
        })
      }
    },
    [addToast, history]
  )

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="Email" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logo
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}
export default SignUp
