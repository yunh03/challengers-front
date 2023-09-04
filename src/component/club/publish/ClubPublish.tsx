/** @jsxImportSource @emotion/react */
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Banner,
  ButtonBox,
  ContainerComponent,
  GridBox,
  TextInputBox,
} from '../../emotion/component';
import { Inner, Body1, Header1, Section, Header2 } from '../../emotion/GlobalStyle';
import { ClubLogoPreView, ClubTypeBox } from './component';
import { openModal } from '../../../store/slice/modalSlice';

const Publish = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openModal({ modalType: 'CreateClubModal' }));
  };

  return (
    <Inner>
      <Banner />
      <Section gap="2">
        <Header1>프로젝트 등록을 위해 클럽을 개설하고 싶으신가요?</Header1>
        <Body1>
          챌린저스 서비스에서 프로젝트 등록을 위해 클럽을 개설해야해요
          <br />
          한번 클럽을 등록만 한다면 추후 프로젝트는 손쉽게 등록할 수 있어요.
        </Body1>
      </Section>

      <Section>
        <ClubLogoPreView />
      </Section>

      <ContainerComponent>
        <Header1>클럽신청서</Header1>
        <GridBox>
          <Header2>클럽 이름</Header2>
          <TextInputBox type="body1" text="소속 클럽을 입력해주세요" />

          <Header2>클럽 형태</Header2>
          <ClubTypeBox text="클럽 형태를 입력해주세요" />

          <Header2>클럽 소개</Header2>
          <TextInputBox type="body1" text="클럽에 대한 간단한 소개 메세지를 입력해주세요" />
        </GridBox>
      </ContainerComponent>

      <ButtonBox text="클럽을 등록하고 싶어요" type="large" onClick={handleClick} />
    </Inner>
  );
};

export default Publish;
