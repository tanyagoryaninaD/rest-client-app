import { Collections } from '@/constants';
import { appDB, auth } from '@/lib/firebase';
import { SingInSingUpValues } from '@/types/userData/singUpData';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const userRegistr = async (data: SingInSingUpValues) => {
  const { name, age, email, password } = data;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    await setDoc(doc(appDB, Collections.Users, user.uid), {
      name,
      age,
      email,
    });

    console.log('User was created', user.uid);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Registration error:', err.message);
    }
  }
};
