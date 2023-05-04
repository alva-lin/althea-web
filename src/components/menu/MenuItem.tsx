import LoadingButton from "@mui/lab/LoadingButton";
import { ReactNode } from "react";

export interface MenuItemProps {
  icon?: ReactNode,
  disabled?: boolean,
  loading?: boolean,
  children?: ReactNode,
  onClick?: () => void;
}

const MenuItem = ({ onClick, children, icon, disabled, loading }: MenuItemProps) => {
  
  return (
    <LoadingButton className={ "my-menu-item my-no-select" }
                   startIcon={ icon }
                   disabled={ disabled }
                   loading={ loading || false } loadingPosition={ "start" }
                   onClick={ onClick } >
      { children }
    </LoadingButton >
  );
};

export default MenuItem;
