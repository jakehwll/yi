'use client';

import { api } from "~/utils/api";
import Form from "../../components/Auth";

const Page = () => {
  const utils = api.useContext();
  const { data: user } = api.auth.get.useQuery();
  const signInMutation = api.auth.signin.useMutation()
  const signOutMutation = api.auth.signout.useMutation()

  return (
    <>
      {user?.user.id}
      <button 
        type="button" 
        onClick={() => {
          signInMutation.mutateAsync({ username: 'jake', password: 'password' })
            .then(() => utils.auth.get.invalidate())
        }}
      >
        Sign In
      </button>
      <button type="button" onClick={() => {
        signOutMutation.mutateAsync()
          .then(() => utils.auth.get.invalidate())
      }}>
        Sign Out
      </button>
    </>
  );
};

export default Page;
