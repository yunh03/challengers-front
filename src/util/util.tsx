import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Body1 } from '../component/emotion/GlobalStyle';
import { FetcherProps } from '../types/globalType';
import { useRefreshUserMutation } from '../store/controller/signUpController';
import { getCookie } from '../store/cookie';
import { setUser } from '../store/slice/userSlice';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const RefreshTokenUtil = () => {
  const dispatch = useDispatch();
  const [refreshApi] = useRefreshUserMutation();

  useEffect(() => {
    const refreshToken = getCookie('refreshToken');
    if (refreshToken) {
      const fetchData = async () => {
        try {
          const { accessToken } = await refreshApi({ refreshToken }).unwrap('data');
          dispatch(setUser({ accessToken }));
        } catch (error) {
          console.error('Error refreshing token:', error);
        }
      };

      fetchData();
      const interval = setInterval(fetchData, 29 * 60 * 1000);
      return () => {
        clearInterval(interval);
      };
    }
    return () => {};
  }, []);
};

export const ApiFetcher = ({ query, children, loading }: FetcherProps) => {
  const { isLoading, isError, error, data } = query;

  if (isLoading) return loading;
  if (isError) {
    console.error(error);
    return <Body1>Api 통신 에러!</Body1>;
  }

  return <>{children(data)}</>;
};
