/** @jsxImportSource @emotion/react */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Banner, TextBox } from '../../emotion/component';
import { Inner, Header2, Section } from '../../emotion/GlobalStyle';
import { ChallengersLogo, ClubAcceptBox, NavigateButton } from './component';
import {
  useGetClubDetailQuery,
  useGetPendingUsersQuery,
} from '../../../store/controller/clubController';
import { selectUser } from '../../../store/slice/userSlice';
import { ApiFetcher } from '../../../util/util';

const Index = () => {
  const { clubId } = useParams();
  const { accessToken } = useSelector(selectUser);

  return (
    <Inner>
      <Banner />
      <Section gap="3.2">
        <ApiFetcher
          query={useGetClubDetailQuery({ clubId, accessToken })}
          loading={<div>로딩중...</div>}
        >
          {(data) => {
            if (!data) return null;
            return (
              <>
                <TextBox>
                  <Header2>클럽 : {data.clubName} </Header2>
                  <NavigateButton />
                </TextBox>

                <ChallengersLogo src={data.logoUrl} alt={data.clubName} />
              </>
            );
          }}
        </ApiFetcher>

        <ApiFetcher
          query={useGetPendingUsersQuery({ clubId, accessToken })}
          loading={<div>로딩중...</div>}
        >
          {(data) => {
            if (!data) return null;
            return data.map((user) => (
              <ClubAcceptBox
                email={user.email}
                key={user.id}
                name={user.name}
                id={clubId}
                comment={user.comment}
              />
            ));
          }}
        </ApiFetcher>
      </Section>
    </Inner>
  );
};

export default Index;
