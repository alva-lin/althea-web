import { Button } from "@mui/material";
import { decrement, increment, selectCount } from "../../store/slice/Counter.Slice.tsx";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { useLogto } from '@logto/react';

interface HomeProps {
  count: number,
  increment: () => void,
  decrement: () => void,
}

const Home = ({ count, increment, decrement }: HomeProps) => {
  const { signIn, signOut, isAuthenticated } = useLogto();
  
  return (
    <div>
      <h1 className={ 'underline text-red-500 text-4xl' }>Althea</h1>
      <Button variant="outlined" color={ 'error' } className={ 'text-black' }>Hello World</Button>
      <div>
        <h2 className={ 'text-2xl' }>Counter: { count }</h2>
        <Button variant="outlined" onClick={ () => { increment();} }>Increment</Button>
        <Button variant="outlined" onClick={ () => { decrement();} }>Decrement</Button>
      </div>
      <div>
        { isAuthenticated
          ? <>
            <Button onClick={ () => {
              signOut(import.meta.env.VITE_LOGTO_LOGOUT_REDIRECT_URL || '').then();
            } }>
              注销
            </Button>
          </>
          : <>
            <Button onClick={ () => {
              signIn(import.meta.env.VITE_LOGTO_LOGIN_REDIRECT_URL || '').then();
            } }>
              登录
            </Button>
          </>
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    count: selectCount(state),
  };
};

const mapDispatchToProps = {
  increment: increment,
  decrement: decrement,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
