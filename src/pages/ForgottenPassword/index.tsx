import React, { useState } from 'react';

import { getNewPassword } from '../../api/user';
import Background from '../../components/Modal/Background';
import useInput from '../../hooks/useInput';
import { Button, Container, StyledForm, Message, Modal, Title, StyledInput } from './style';

export default function ForgottenPassword() {
  const [value, handler] = useInput('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await getNewPassword(value);
      const isValid = response.data.result;

      // 존재하는 계정이면 새 비밀번호 발급
      if (isValid) {
        setNewPassword(response.data.result.password);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const closeModal = () => {
    setNewPassword('');
  };

  return (
    <Container>
      <Title>새 비밀번호를 발급해드릴게요</Title>
      <StyledForm onSubmit={onSubmit}>
        <StyledInput type="email" placeholder="가입한 이메일을 입력하세요" value={value} onChange={handler} />
        <Button>확인</Button>
      </StyledForm>
      <Message>{message}</Message>
      {newPassword !== '' && (
        <>
          <Background />
          <Modal>
            <span>아래 비밀번호로 다시 로그인해주세요</span>
            <span>{newPassword}</span>
            <Button onClick={closeModal}>확인</Button>
          </Modal>
        </>
      )}
    </Container>
  );
}
