import { Button } from "@mui/material";
import { connect } from "react-redux";
import Logo from "../components/Logo.tsx";
import LogtoButton from "../components/LogtoButton.tsx";
import { RootState } from "../store";
import { decrement, increment, selectCount } from "../store/slice/Counter.Slice.tsx";

interface HomeProps {
  count: number,
  increment: () => void,
  decrement: () => void,
}

const HomeComponent = ({ count, increment, decrement }: HomeProps) => {
  
  return (
    <div >
      <h1 className={ "underline text-red-500 text-4xl" } >Althea</h1 >
      <Button variant="outlined" color={ "error" } className={ "text-black" } >Hello World</Button >
      <div >
        <h2 className={ "text-2xl text-teal-600" } >Counter: { count }</h2 >
        <Button variant="outlined" onClick={ () => { increment();} } >Increment</Button >
        <Button variant="outlined" onClick={ () => { decrement();} } >Decrement</Button >
      </div >
      <div >
        <LogtoButton />
      </div >
      <div >
        <Logo />
      </div >
    </div >
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

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default Home;
