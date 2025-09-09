'use client';

import { useEffect } from 'react';

import { useAppDispatch } from '@/hooks/redux';

import { initAuthSubscriber } from '../firebase/initAuthSubscriber';

const AuthHandler = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = initAuthSubscriber(dispatch);
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return null;
};

export default AuthHandler;
