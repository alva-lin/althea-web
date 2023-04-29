import { Button } from "@mui/material";

const Home = () => {
  return (
    <div>
      <h1 className={ 'underline text-red-500 text-4xl' }>Althea</h1>
      <Button variant="outlined" color={ 'error' } className={ 'text-black' }>Hello World</Button>
    </div>
  );
};

export default Home;
