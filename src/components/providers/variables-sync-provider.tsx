'use client';

import { useTranslations } from 'next-intl';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

import { STORAGE_PREFIX } from '@/constants/app';
import { useAppDispatch } from '@/hooks/redux';
import { useUserName } from '@/hooks/use-user-name';
import store from '@/store';
import { restoreVariables } from '@/store/slicers/variables-slice';
import { getHashFromString } from '@/utils/get-hash-from-string';
import { VariablesStorageSchema } from '@/zod/variables-schema';

export default function VariablesSyncProvider({ children }: PropsWithChildren) {
  const t = useTranslations('variables');
  const dispatch = useAppDispatch();
  const userName = useUserName();
  const [userNameHash, setUserNameHash] = useState<string | null>(null);

  useEffect(() => {
    if (!userName) {
      return;
    }

    async function getUserNameHash(string: string) {
      const hash = await getHashFromString(string);
      setUserNameHash(hash);
    }
    void getUserNameHash(userName);
  }, [userName]);

  useEffect(() => {
    if (!userNameHash) {
      return;
    }

    const key = `${STORAGE_PREFIX}_${userNameHash}`;
    const storedBase64Data = localStorage.getItem(key);

    let storedData = '{}';
    if (storedBase64Data) {
      storedData = atob(storedBase64Data);
    }

    const parsedData = VariablesStorageSchema.safeParse(JSON.parse(storedData));

    if (!parsedData.success) {
      localStorage.removeItem(key);
      throw new Error(t('data_format_error'));
    }

    const unsubscribe = store.subscribe(() => {
      const data = store.getState().variables.variables;
      const base64Data = btoa(JSON.stringify(data));
      localStorage.setItem(key, base64Data);
    });

    dispatch(restoreVariables(parsedData.data));

    return () => {
      unsubscribe();
    };
  }, [userNameHash, t, dispatch]);

  return children;
}
