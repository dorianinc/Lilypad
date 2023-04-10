import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { previewSpotThunk } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux";
import "./SpotPage.css";

function SpotPage() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const data = dispatch(previewSpotThunk(spotId));
  }, [dispatch]);
  const spotsObj = useSelector((state) => state.spots);
  const spots = Object.values(spotsObj);
  const spot = spots.find((spot) => spot.id === Number(spotId));
  console.log("spot =>", spot)
  if(!spot) return null;
  const previewImage = spot.SpotImages(image => image.preview === true)
  return (
    <div className="mainContainer spot">
      <div class="boxes box-1" id="orange">
        {/* <img src={spot.SpotImages[0].url} /> */}
      </div>
      <div class="boxes box-2" id="purple">
        {/* <img src={spot.SpotImages[1].url} /> */}
      </div>
      <div class="boxes box-3" id="blue">
        {/* <img src={spot.SpotImages[2].url} /> */}
      </div>
      <div class="boxes box-4" id="green">
        {/* <img src={spot.SpotImages[3].url} /> */}
      </div>
      <div class="boxes box-5 span-col" id="red">
        {/* <img src={spot.SpotImages[4].url} /> */}
      </div>
    </div>
  );
}

export default SpotPage;
