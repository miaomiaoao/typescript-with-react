import React from "react";
import fecthData from "../fetchData";

const data = fecthData('https://dog.ceo/api/breeds/image/random')

const DogShow: React.FC = () => {
  const dogData = data.read()
  return (
    <img src={dogData.message} alt="" ></img>
  )
}
export default DogShow