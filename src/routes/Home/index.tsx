import { Button } from "@mui/material";
import { decrement, increment, selectCount } from "../../store/slice/Counter.Slice.tsx";
import { connect } from "react-redux";
import { RootState } from "../../store";
import LogtoButton from "../../components/LogtoButton.tsx";

interface HomeProps {
  count: number,
  increment: () => void,
  decrement: () => void,
}

const Home = ({ count, increment, decrement }: HomeProps) => {
  
  return (
    <div >
      <h1 className={ "underline text-red-500 text-4xl" } >Althea</h1 >
      <Button variant="outlined" color={ "error" } className={ "text-black" } >Hello World</Button >
      <div >
        <h2 className={ "text-2xl" } >Counter: { count }</h2 >
        <Button variant="outlined" onClick={ () => { increment();} } >Increment</Button >
        <Button variant="outlined" onClick={ () => { decrement();} } >Decrement</Button >
      </div >
      <div >
        <LogtoButton />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
