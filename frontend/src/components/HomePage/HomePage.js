import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSpotsThunk} from "../../store/spotsReducer";
import SpotItem from "../Spots/SpotItem";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(getSpotsThunk());
  }, [dispatch]);


  return (
    <div className="hailMary">
      <div className="mainContainer homePage">
        {spots.map((spot) => (
          <SpotItem spot={spot}/>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
